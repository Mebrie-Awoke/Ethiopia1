from app.ai.chat_service import EthiopiaAIChatService


class AIService:
    def __init__(self, ai_service: EthiopiaAIChatService) -> None:
        self.ai_service = ai_service

    def ask_question(self, query: str) -> str:
        return self.ai_service.ask(query=query)
