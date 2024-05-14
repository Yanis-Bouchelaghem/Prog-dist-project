from sqlmodel import SQLModel, Field
from datetime import datetime

class TransactionBase(SQLModel):
    amount: float
    category: str
    description: str

class TransactionIn(TransactionBase):
    pass

class TransactionOut(TransactionBase):
    id: int
    timestamp: datetime = Field(default_factory=datetime.now)

class TransactionUpdate(SQLModel):
    amount: float | None = None
    category: str | None = None
    description: str | None = None


class TransactionDB(TransactionBase, table=True):
    __tablename__: str = "transactions"
    id: int | None = Field(primary_key=True, default=None)
    timestamp: datetime = Field(default_factory=datetime.now)
