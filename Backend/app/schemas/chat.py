from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    question: str
    answer: str


class KnowledgeStatus(BaseModel):
    document_count: int
    sources: list[str]
