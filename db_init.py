from sqlalchemy import create_engine
from models import Base

def init_db():
    engine = create_engine('sqlite:///journeyjournal.db', echo=True)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
