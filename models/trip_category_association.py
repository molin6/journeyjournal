from .base import Base
from sqlalchemy import Column, Integer, ForeignKey

# Define TripCategoryAssociation model class
class TripCategoryAssociation(Base):
    __tablename__ = 'trip_category_associations'
    id = Column(Integer, primary_key=True, autoincrement=True)
    trip_id = Column(Integer, ForeignKey('trips.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('trip_categories.id'), nullable=False)
