from .base import Base
from sqlalchemy import Column, Integer, String

# Define the TripCategory model class
class TripCategory(Base):
    __tablename__ = 'trip_categories'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String, nullable=False)

    def __repr__(self):
            return f"<TripCategory(id={self.id}, category_name={self.category_name})>"
