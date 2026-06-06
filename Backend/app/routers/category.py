from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_async_session
from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategoryRead
from app.services.category_service import CategoryService

router = APIRouter()


@router.get("/", response_model=list[CategoryRead])
async def get_categories(session: AsyncSession = Depends(get_async_session)) -> list[CategoryRead]:
    return await CategoryService(CategoryRepository(session)).list_categories()
