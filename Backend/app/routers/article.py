from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_async_session
from app.repositories.article_repository import ArticleRepository
from app.schemas.article import ArticleRead
from app.services.article_service import ArticleService

router = APIRouter()


@router.get("/", response_model=list[ArticleRead])
async def list_articles(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    session: AsyncSession = Depends(get_async_session),
) -> list[ArticleRead]:
    skip = (page - 1) * size
    return await ArticleService(ArticleRepository(session)).list_articles(skip=skip, limit=size)


@router.get("/{article_id}", response_model=ArticleRead)
async def get_article(article_id: int, session: AsyncSession = Depends(get_async_session)) -> ArticleRead:
    article = await ArticleService(ArticleRepository(session)).get_article(article_id)
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    return article


@router.get("/category/{category_id}", response_model=list[ArticleRead])
async def get_articles_by_category(
    category_id: int,
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    session: AsyncSession = Depends(get_async_session),
) -> list[ArticleRead]:
    skip = (page - 1) * size
    return await ArticleService(ArticleRepository(session)).list_by_category(category_id, skip=skip, limit=size)


@router.get("/search", response_model=list[ArticleRead])
async def search_articles(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    session: AsyncSession = Depends(get_async_session),
) -> list[ArticleRead]:
    skip = (page - 1) * size
    return await ArticleService(ArticleRepository(session)).search_articles(q, skip=skip, limit=size)
