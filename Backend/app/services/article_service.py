from app.repositories.article_repository import ArticleRepository
from app.schemas.article import ArticleCreate, ArticleRead, ArticleUpdate


class ArticleService:
    def __init__(self, repository: ArticleRepository) -> None:
        self.repository = repository

    async def list_articles(self, skip: int = 0, limit: int = 10) -> list[ArticleRead]:
        articles = await self.repository.list_articles(skip=skip, limit=limit)
        return [ArticleRead.from_orm(article) for article in articles]

    async def get_article(self, article_id: int) -> ArticleRead | None:
        article = await self.repository.get_article(article_id)
        if article is None:
            return None
        return ArticleRead.from_orm(article)

    async def list_by_category(self, category_id: int, skip: int = 0, limit: int = 10) -> list[ArticleRead]:
        articles = await self.repository.list_by_category(category_id, skip=skip, limit=limit)
        return [ArticleRead.from_orm(article) for article in articles]

    async def search_articles(self, query: str, skip: int = 0, limit: int = 10) -> list[ArticleRead]:
        articles = await self.repository.search_articles(query=query, skip=skip, limit=limit)
        return [ArticleRead.from_orm(article) for article in articles]

    async def create_article(self, data: ArticleCreate) -> ArticleRead:
        article = await self.repository.create_article(
            category_id=data.category_id,
            title=data.title,
            summary=data.summary,
            content=data.content,
            image_url=data.image_url,
        )
        return ArticleRead.from_orm(article)

    async def update_article(self, article_id: int, data: ArticleUpdate) -> ArticleRead | None:
        article = await self.repository.update_article(
            article_id=article_id,
            category_id=data.category_id,
            title=data.title,
            summary=data.summary,
            content=data.content,
            image_url=data.image_url,
        )
        if article is None:
            return None
        return ArticleRead.from_orm(article)

    async def delete_article(self, article_id: int) -> None:
        await self.repository.delete_article(article_id)
