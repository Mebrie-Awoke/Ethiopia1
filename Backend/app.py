from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from src.helper import download_hugging_face_embeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import *
import os
import uvicorn

load_dotenv()

GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

embeddings = download_hugging_face_embeddings()

persist_directory = "./chroma_db"
if os.path.exists(persist_directory):
    docsearch = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
    print("Loaded existing ChromaDB from", persist_directory)
else:
    print("No existing ChromaDB found. Please run ingestion script first.")
    docsearch = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )

retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

chatModel = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1,
    max_tokens=1000,
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(chatModel, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return JSONResponse({
        "status": "backend",
        "available_endpoints": ["/health", "/get (POST json/form)"],
        "note": "This backend is API-only. Send chat requests to /get with JSON {msg: '...'}.",
    })


@app.post("/get")
async def chat(request: Request):
    # Accept JSON or form data. Look for keys: msg, input, message
    msg = None
    # Try JSON body first (if any)
    try:
        body = await request.json()
        if isinstance(body, dict):
            msg = body.get("msg") or body.get("input") or body.get("message")
    except Exception:
        body = None

    # If no JSON or missing field, try form data
    if msg is None:
        try:
            form = await request.form()
            msg = form.get("msg") or form.get("input") or form.get("message")
        except Exception:
            msg = None

    if msg is None:
        return JSONResponse({"error": "Missing 'msg' parameter in JSON body or form data"}, status_code=400)

    if not isinstance(msg, str):
        return JSONResponse({"error": "'msg' must be a string"}, status_code=400)

    msg = msg.strip()
    if len(msg) == 0:
        return JSONResponse({"error": "'msg' is empty"}, status_code=400)

    # Input length limit to prevent abuse
    MAX_MSG_LENGTH = 2000
    if len(msg) > MAX_MSG_LENGTH:
        return JSONResponse({"error": f"'msg' too long (max {MAX_MSG_LENGTH} chars)"}, status_code=413)

    print("Incoming msg:", msg)

    try:
        response = rag_chain.invoke({"input": msg})
        # response may be a mapping-like object
        answer = None
        if isinstance(response, dict):
            answer = response.get("answer")
        else:
            try:
                answer = getattr(response, "answer", None)
            except Exception:
                answer = None

        if answer is None:
            answer = str(response)

        print("Response : ", answer)
        return JSONResponse({"answer": str(answer)})

    except Exception as e:
        # Log the error server-side and return a safe message to the client
        print("RAG chain invocation error:", repr(e))
        return JSONResponse({"error": "internal server error"}, status_code=500)


@app.get("/health")
async def health():
    return JSONResponse({"status": "ok"})

if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=8000, log_level="info")

 