from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select

from app.ai.chat_service import DocumentRetriever, EthiopiaAIChatService
from app.ai.groq_client import GroqClientWrapper
from app.core.config import get_settings
from app.database.base import Base
from app.database.session import async_engine, async_session
from app.models.category import Category
from app.repositories.article_repository import ArticleRepository
from app.repositories.category_repository import CategoryRepository
from app.routers import article_router, category_router, chat_router, health_router
from app.schemas.article import ArticleCreate
from app.schemas.category import CategoryCreate
from app.services.article_service import ArticleService
from app.services.category_service import CategoryService

settings = get_settings()

app = FastAPI(
    title="Ethiopia Knowledge Hub API",
    description="Public API for the Ethiopia Knowledge Hub educational app.",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, tags=["Health"])
app.include_router(category_router, prefix="/categories", tags=["Categories"])
app.include_router(article_router, prefix="/articles", tags=["Articles"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])


async def seed_sample_content() -> None:
    async with async_session() as session:
        result = await session.execute(select(Category).limit(1))
        if result.scalars().first() is not None:
            return

        category_service = CategoryService(CategoryRepository(session))
        article_service = ArticleService(ArticleRepository(session))

        categories = {
            "Culture": "Ethiopia's music, art, and traditions shaped by a rich heritage.",
            "History": "Historic events and leaders that made Ethiopia unique in Africa.",
            "Traditions": "Traditional ceremonies, dress, and rituals that define everyday life.",
            "Beliefs": "Religious and spiritual practices across Ethiopia's diverse communities.",
        }

        created_categories = {}
        for name, description in categories.items():
            category = await category_service.create_category(CategoryCreate(name=name, description=description))
            created_categories[name] = category.id

        sample_articles = [
            {
                "category": "Culture",
                "title": "Ethiopian Coffee Ceremony",
                "summary": "A traditional ritual that celebrates hospitality and community.",
                "content": "The Ethiopian coffee ceremony is a central social and cultural ritual in Ethiopia. Green coffee beans are roasted, ground by hand, and brewed in a clay pot called a jebena. The ceremony takes place in three rounds, each representing blessing, prosperity, and good luck.",
                "image_url": None,
            },
            {
                "category": "History",
                "title": "The Battle of Adwa",
                "summary": "A defining independence victory against colonial forces in 1896.",
                "content": "The Battle of Adwa took place on March 1, 1896, when Ethiopian forces led by Emperor Menelik II defeated Italian troops. This victory preserved Ethiopia's independence and became a powerful symbol of resistance across Africa.",
                "image_url": None,
            },
            {
                "category": "Traditions",
                "title": "Meskel Festival",
                "summary": "A bright celebration of faith with bonfires and flowers.",
                "content": "Meskel is an annual Ethiopian Orthodox celebration marking the discovery of the True Cross. The festival includes colorful processions, flower-decorated crosses, and large bonfires called demeras.",
                "image_url": None,
            },
            {
                "category": "Beliefs",
                "title": "The Ethiopian Orthodox Church",
                "summary": "One of the oldest Christian traditions, deeply rooted in Ethiopia.",
                "content": "The Ethiopian Orthodox Tewahedo Church is one of the world's oldest Christian churches. Its practices include ancient liturgies, vibrant religious art, and a spiritual calendar with unique feasts like Timkat and Meskel.",
                "image_url": None,
            },
        ]

        for article in sample_articles:
            await article_service.create_article(
                ArticleCreate(
                    category_id=created_categories[article["category"]],
                    title=article["title"],
                    summary=article["summary"],
                    content=article["content"],
                    image_url=article["image_url"],
                )
            )


@app.on_event("startup")
async def startup_event() -> None:
    app.state.document_retriever = DocumentRetriever(
        base_path=Path(__file__).resolve().parent / "Documents"
    )
    app.state.document_retriever.load_documents()
    app.state.ai_service = EthiopiaAIChatService(
        document_retriever=app.state.document_retriever,
        groq_client=GroqClientWrapper(settings.groq_api_key),
    )
    async with async_engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    await seed_sample_content()


@app.on_event("shutdown")
async def shutdown_event() -> None:
    await async_engine.dispose()
