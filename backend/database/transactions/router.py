from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlmodel import Session, select

from .models import TransactionDB, TransactionIn, TransactionOut, TransactionUpdate

from database.dependencies import get_db_session


router = APIRouter(
    prefix="/transaction",
    tags=["transaction"]
)

@router.get("/")
async def get_all_transactions(db_session: Session = Depends(get_db_session)) -> list[TransactionOut]:
    select_transaction_query = select(TransactionDB)
    all_transactions_db = db_session.exec(select_transaction_query).all()
    return [TransactionOut.model_validate(transaction) for transaction in all_transactions_db]

@router.post("/")
async def create_transaction(transaction_in: TransactionIn,
                             db_session: Session = Depends(get_db_session)) -> TransactionOut:
    #Create the transaction
    transaction_db = TransactionDB.model_validate(transaction_in)
    db_session.add(transaction_db)
    db_session.commit()
    db_session.refresh(transaction_db)
    return TransactionOut.model_validate(transaction_db)

@router.put("/{transaction_id}/")
async def update_transaction(transaction_in: TransactionUpdate,
                             transaction_id: int,
                             db_session: Session = Depends(get_db_session)) -> TransactionOut:
    #Find if the transaction id exists
    select_transaction_query = select(TransactionDB).where(TransactionDB.id == transaction_id)
    transaction_db = db_session.exec(select_transaction_query).one_or_none()
    if transaction_db == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Given transaction id does not exist.")
    #Only update the provided values
    for key, value in transaction_in:
        if value != None:
            setattr(transaction_db, key, value)
    db_session.add(transaction_db)
    db_session.commit()
    db_session.refresh(transaction_db)
    return TransactionOut.model_validate(transaction_db)

@router.delete("/{transaction_id}/")
async def delete_transaction(transaction_id: int,
                             db_session: Session = Depends(get_db_session)) -> Response:
    #Find if the transaction id exists
    select_transaction_query = select(TransactionDB).where(TransactionDB.id == transaction_id)
    transaction_db = db_session.exec(select_transaction_query).one_or_none()
    if transaction_db == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Given transaction id does not exist.")
    #Delete the transaction
    db_session.delete(transaction_db)
    db_session.commit()
    return Response(status_code=status.HTTP_200_OK)


