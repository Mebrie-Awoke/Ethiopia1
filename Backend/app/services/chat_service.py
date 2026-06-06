from app.ai.chat_service import EthiopiaAIChatService
from app.schemas.chat import ChatRequest, ChatResponse


class ChatService:
    def __init__(self, ai_service: EthiopiaAIChatService) -> None:
        self.ai_service = ai_service

    async def ask(self, data: ChatRequest) -> ChatResponse:
        answer = self.ai_service.ask(data.question)
        return ChatResponse(question=data.question, answer=answer)
