from datetime import datetime

from sqlalchemy import delete, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.article import Article


class ArticleRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_articles(self, skip: int = 0, limit: int = 10) -> list[Article]:
        result = await self.session.execute(
            select(Article).order_by(Article.created_at.desc()).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def get_article(self, article_id: int) -> Article | None:
        result = await self.session.execute(select(Article).where(Article.id == article_id))
        return result.scalars().first()

    async def list_by_category(self, category_id: int, skip: int = 0, limit: int = 10) -> list[Article]:
        result = await self.session.execute(
            select(Article)
            .where(Article.category_id == category_id)
            .order_by(Article.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def search_articles(self, query: str, skip: int = 0, limit: int = 10) -> list[Article]:
        result = await self.session.execute(
            select(Article)
            .where(
                or_(
                    Article.title.ilike(f"%{query}%"),
                    Article.summary.ilike(f"%{query}%"),
                    Article.content.ilike(f"%{query}%"),
                )
            )
            .order_by(Article.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all()

    async def create_article(
        self,
        category_id: int,
        title: str,
        summary: str,
        content: str,
        image_url: str | None = None,
    ) -> Article:
        article = Article(
            category_id=category_id,
            title=title,
            summary=summary,
            content=content,
            image_url=image_url,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        self.session.add(article)
        await self.session.commit()
        await self.session.refresh(article)
        return article

    async def update_article(
        self,
        article_id: int,
        category_id: int | None = None,
        title: str | None = None,
        summary: str | None = None,
        content: str | None = None,
        image_url: str | None = None,
    ) -> Article | None:
        article = await self.get_article(article_id)
        if article is None:
            return None
        if category_id is not None:
            article.category_id = category_id
        if title is not None:
            article.title = title
        if summary is not None:
            article.summary = summary
        if content is not None:
            article.content = content
        if image_url is not None:
            article.image_url = image_url
        article.updated_at = datetime.utcnow()
        await self.session.commit()
        await self.session.refresh(article)
        return article

    async def delete_article(self, article_id: int) -> None:
        await self.session.execute(delete(Article).where(Article.id == article_id))
        await self.session.commit()
