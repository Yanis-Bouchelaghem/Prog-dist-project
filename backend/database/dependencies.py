from sqlmodel import SQLModel, Session
from .db_engine import database_engine

def create_db_and_tables():
    SQLModel.metadata.create_all(database_engine)

def get_db_session():
    with Session(database_engine) as session:
        yield session
