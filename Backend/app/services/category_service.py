from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate


class CategoryService:
    def __init__(self, repository: CategoryRepository) -> None:
        self.repository = repository

    async def list_categories(self) -> list[CategoryRead]:
        categories = await self.repository.list_categories()
        return [CategoryRead.from_orm(category) for category in categories]

    async def create_category(self, data: CategoryCreate) -> CategoryRead:
        category = await self.repository.create_category(name=data.name, description=data.description)
        return CategoryRead.from_orm(category)

    async def update_category(self, category_id: int, data: CategoryUpdate) -> CategoryRead | None:
        category = await self.repository.update_category(category_id, name=data.name, description=data.description)
        if category is None:
            return None
        return CategoryRead.from_orm(category)

    async def delete_category(self, category_id: int) -> None:
        await self.repository.delete_category(category_id)
