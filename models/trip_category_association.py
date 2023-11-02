from .base import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

# Define TripCategoryAssociation model class
class TripCategoryAssociation(Base):
    __tablename__ = 'trip_category_associations'
    id = Column(Integer, primary_key=True, autoincrement=True)
    trip_id = Column(Integer, ForeignKey('trips.id'), nullable=False)
    category_id = Column(Integer, ForeignKey('trip_categories.id'), nullable=False)
    trip = relationship('Trips', back_populates='categories_association')
    category = relationship('TripCategory', back_populates='categories_association')

    def __repr__(self):
            return f"<TripCategoryAssociation(id={self.id}, trip_id={self.trip_id}, category_id={self.category_id})>"    
