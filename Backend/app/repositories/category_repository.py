from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category


class CategoryRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def list_categories(self) -> list[Category]:
        result = await self.session.execute(select(Category).order_by(Category.name))
        return result.scalars().all()

    async def get_category(self, category_id: int) -> Category | None:
        result = await self.session.execute(select(Category).where(Category.id == category_id))
        return result.scalars().first()

    async def create_category(self, name: str, description: str) -> Category:
        category = Category(name=name, description=description)
        self.session.add(category)
        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def update_category(self, category_id: int, name: str | None, description: str | None) -> Category | None:
        category = await self.get_category(category_id)
        if category is None:
            return None
        if name:
            category.name = name
        if description:
            category.description = description
        await self.session.commit()
        await self.session.refresh(category)
        return category

    async def delete_category(self, category_id: int) -> None:
        await self.session.execute(delete(Category).where(Category.id == category_id))
        await self.session.commit()
