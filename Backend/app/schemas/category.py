from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str
    description: str


class CategoryRead(CategoryBase):
    id: int

    model_config = {"from_attributes": True}


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
