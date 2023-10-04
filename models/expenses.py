from .base import Base
from sqlalchemy import Column, Integer, Float, ForeignKey, String

# Define Expense model class
class Expenses(Base):
    __tablename__ = 'expenses'
    id = Column(Integer, primary_key=True, autoincrement=True)
    trip_id = Column(Integer, ForeignKey('trips.id'), nullable=False)
    main_accommodation_type = Column(String)
    accommodation_cost = Column(Float)
    main_transportation_type = Column(String)
    transportation_cost = Column(Float)
