from fastapi import APIRouter, HTTPException, Request, status

from app.schemas.chat import ChatRequest, ChatResponse, KnowledgeStatus
from app.services.chat_service import ChatService

router = APIRouter()


def get_chat_service(request: Request) -> ChatService:
    ai_service = request.app.state.ai_service
    return ChatService(ai_service)


@router.post("/message", response_model=ChatResponse)
async def send_message(request: Request, data: ChatRequest) -> ChatResponse:
    if data.question.strip() == "":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Chat question cannot be empty")
    return await get_chat_service(request).ask(data)


@router.get("/knowledge/status", response_model=KnowledgeStatus)
async def knowledge_status(request: Request) -> KnowledgeStatus:
    retriever = request.app.state.document_retriever
    documents = retriever.documents
    return KnowledgeStatus(
        document_count=len(documents),
        sources=[doc.source for doc in documents],
    )
