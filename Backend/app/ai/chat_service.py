from pathlib import Path
from typing import NamedTuple

from app.ai.groq_client import GroqClientWrapper


class Document(NamedTuple):
    title: str
    content: str
    source: str


class DocumentRetriever:
    def __init__(self, base_path: Path) -> None:
        self.base_path = base_path
        self.documents: list[Document] = []

    def load_documents(self) -> None:
        self.documents = []
        for file_path in self.base_path.glob("*.md"):
            title = file_path.stem.replace("_", " ").title()
            content = file_path.read_text(encoding="utf-8")
            self.documents.append(Document(title=title, content=content, source=str(file_path.name)))

    def search_documents(self, query: str, top_k: int = 3) -> list[Document]:
        query_lower = query.lower()
        keywords = [word for word in query_lower.split() if word]
        scored = []
        for document in self.documents:
            content_lower = document.content.lower()
            title_lower = document.title.lower()
            score = sum(content_lower.count(keyword) + title_lower.count(keyword) * 2 for keyword in keywords)
            if query_lower in content_lower or query_lower in title_lower:
                score += 10
            scored.append((score, document))
        scored.sort(key=lambda item: item[0], reverse=True)
        best = [doc for score, doc in scored[:top_k] if score > 0]
        return best or self.documents[:top_k]

    def build_context(self, query: str) -> str:
        matched = self.search_documents(query)
        context_fragments = []
        for document in matched:
            excerpt = document.content[:1800]
            context_fragments.append(f"# {document.title}\n{excerpt}")
        return "\n\n".join(context_fragments)


class EthiopiaAIChatService:
    def __init__(self, document_retriever: DocumentRetriever, groq_client: GroqClientWrapper) -> None:
        self.document_retriever = document_retriever
        self.groq_client = groq_client

    def ask(self, query: str) -> str:
        context = self.document_retriever.build_context(query)
        prompt = (
            "You are an expert guide for Ethiopian culture, history, geography, cuisine, religion, and tourism. "
            "Answer only using the context provided below and your knowledge about Ethiopia. "
            "If the answer cannot be found in the documents, answer conservatively and clearly.\n\n"
            "CONTEXT:\n"
            f"{context}\n\n"
            "QUESTION:\n"
            f"{query}\n\n"
            "Provide a concise, accurate response for an Ethiopia-focused audience."
        )
        return self.groq_client.generate(prompt=prompt)
