from fastapi import FastAPI, Request
from fastapi.responses import PlainTextResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
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

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
frontend_templates = os.path.join(project_root, 'Frontend', 'templates')
frontend_static = os.path.join(project_root, 'Frontend', 'static')

app = FastAPI()
if os.path.isdir(frontend_static):
    app.mount("/static", StaticFiles(directory=frontend_static), name="static")

templates = Jinja2Templates(directory=frontend_templates)

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse('chat.html', {'request': request})

@app.api_route("/get", methods=["GET", "POST"])
async def chat(request: Request):
    form = await request.form()
    msg = form.get("msg")
    if msg is None:
        return PlainTextResponse("Missing msg", status_code=400)

    print(msg)
    response = rag_chain.invoke({"input": msg})
    print("Response : ", response["answer"])
    return PlainTextResponse(str(response["answer"]))

if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=8080, log_level="info")

 