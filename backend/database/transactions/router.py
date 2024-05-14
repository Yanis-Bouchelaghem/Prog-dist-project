from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from .models import TransactionDB, TransactionIn, TransactionOut

from database.dependencies import get_db_session


router = APIRouter(
    prefix="/transaction",
    tags=["transaction"]
)

@router.get("/")
async def get_all_transactions(db_session: Session = Depends(get_db_session)) -> list[TransactionOut]:
    select_transaction_query = select(TransactionDB)
    

