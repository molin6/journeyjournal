from flask import Flask, jsonify, request
from models.expenses import Expenses
from models.trip_category_association import TripCategoryAssociation
from models.trip_category import TripCategory
from models.trips import Trips
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from sqlalchemy import or_
from sqlalchemy import and_
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


DATABASE_URL = 'sqlite:///journeyjournal.db'
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def serialize(model_instance):
    """Transforms a model instance into a dictionary which can be rendered into JSON."""
    serialized_data = {c.name: getattr(model_instance, c.name) for c in model_instance.__table__.columns}
    return serialized_data

@app.route('/trips', methods=['GET'])
def list_trips():
    traveler_name = request.args.get('traveler_name')
    limit = request.args.get('limit', type=int)  # No default value
    offset = request.args.get('offset', default=0, type=int)  # Default to 0 if not provided

    query = session.query(Trips)

    # check for traveler_name
    if traveler_name:
        query = query.filter(Trips.traveler_name == traveler_name)

    # Apply offset
    if offset:
        query = query.offset(offset)

    # Apply the limit to the query if a limit is provided
    if limit is not None:
        query = query.limit(limit)

    trips = query.all()
    
    return jsonify([serialize(trip) for trip in trips])




#Get a specific trip by ID
@app.route('/trips/<int:trip_id>', methods=['GET'])
def get_trip_by_id(trip_id):
    trip = session.query(Trips).filter_by(id=trip_id).first()
    if trip:
        return jsonify(serialize(trip))
    else:
        return jsonify({"error": "Trip not found"}), 404

#Add a new trip
@app.route('/trips', methods=['POST'])
def add_trip():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Convert string dates to date objects
    try:
        data['start_date'] = datetime.strptime(data['start_date'], '%m/%d/%Y').date()
        data['end_date'] = datetime.strptime(data['end_date'], '%m/%d/%Y').date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Expected MM/DD/YYYY"}), 400

    new_trip = Trips(**data)

    # Add the new trip
    session.add(new_trip)
    session.commit()

    return jsonify(serialize(new_trip)), 201

#Update a trip
@app.route('/trips/<int:trip_id>', methods=['PUT'])
def update_trip(trip_id):

    trip = session.query(Trips).filter_by(id=trip_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Convert string dates to date objects if they are provided
    if 'start_date' in data:
        try:
            data['start_date'] = datetime.strptime(data['start_date'], '%m/%d/%Y').date()
        except ValueError:
            return jsonify({"error": "Invalid start_date format. Expected MM/DD/YYYY"}), 400

    if 'end_date' in data:
        try:
            data['end_date'] = datetime.strptime(data['end_date'], '%m/%d/%Y').date()
        except ValueError:
            return jsonify({"error": "Invalid end_date format. Expected MM/DD/YYYY"}), 400

    # Update the trip
    for key, value in data.items():
        setattr(trip, key, value)

    session.commit()

    return jsonify(serialize(trip))

#Delete a Trip
@app.route('/trips/<int:trip_id>', methods=['DELETE'])
def delete_trip(trip_id):

    trip = session.query(Trips).filter_by(id=trip_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    # Delete the trip 
    session.delete(trip)
    session.commit()

    return jsonify({"message": "Trip deleted successfully"})

#List all expenses for a specific trip
@app.route('/trips/<int:trip_id>/expenses', methods=['GET'])
def list_expenses_for_trip(trip_id):

    trip = session.query(Trips).filter_by(id=trip_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    # Get all expenses associated with the trip
    expenses = session.query(Expenses).filter_by(trip_id=trip_id).all()

    return jsonify([serialize(expense) for expense in expenses])

#Add Expenses to a trip
@app.route('/trips/<int:trip_id>/expenses', methods=['POST'])
def add_expense_for_trip(trip_id):

    trip = session.query(Trips).filter_by(id=trip_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    data = request.get_json()

    # Check if data is provided
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Create a new Expense instance
    new_expense = Expenses(trip_id=trip_id, **data)

    # Add the new expense
    session.add(new_expense)
    session.commit()

    return jsonify(serialize(new_expense)), 201

#Update an expense
@app.route('/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):

    expense = session.query(Expenses).filter_by(id=expense_id).first()
    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    data = request.get_json()

    # Check if data is provided
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Update the expense
    for key, value in data.items():
        setattr(expense, key, value)

    session.commit()

    return jsonify(serialize(expense))

#Delete an expense
@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):

    expense = session.query(Expenses).filter_by(id=expense_id).first()
    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    # Delete the expense
    session.delete(expense)
    session.commit()

    return jsonify({"message": "Expense deleted successfully"})

#List all trip categories
@app.route('/categories', methods=['GET'])
def list_all_categories():
    categories = session.query(TripCategory).all()

    return jsonify([serialize(category) for category in categories])

#Add a new category
@app.route('/categories', methods=['POST'])
def add_new_category():
    data = request.get_json()

    # Check if data is provided and contains 'category_name'
    if not data or 'category_name' not in data:
        return jsonify({"error": "category_name is required"}), 400

    # Create a new TripCategory instance
    new_category = TripCategory(category_name=data['category_name'])


    session.add(new_category)
    session.commit()

    return jsonify(serialize(new_category)), 201

#Update a category
@app.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):

    category = session.query(TripCategory).filter_by(id=category_id).first()
    if not category:
        return jsonify({"error": "Category not found"}), 404

    data = request.get_json()

    # Check if data is provided and contains 'category_name'
    if not data or 'category_name' not in data:
        return jsonify({"error": "category_name is required"}), 400

    # Update the category
    category.category_name = data['category_name']


    session.commit()

    return jsonify(serialize(category))

#Delete a category
@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):

    category = session.query(TripCategory).filter_by(id=category_id).first()
    if not category:
        return jsonify({"error": "Category not found"}), 404

    # Delete category
    session.delete(category)
    session.commit()

    return jsonify({"message": "Category deleted successfully"})

#Get average accomadation cost
@app.route('/expenses/accommodation/average', methods=['GET'])
def get_average_accommodation_cost():
    # average cost of accommodations
    avg_cost = session.query(func.avg(Expenses.accommodation_cost)).filter(Expenses.main_accommodation_type.isnot(None)).scalar()

    return jsonify({"average_cost": float(avg_cost) if avg_cost else 0})

#Get trips with categories
@app.route('/trips/with-categories', methods=['GET'])
def get_trips_with_categories():

    trips = session.query(Trips).all()

    # For each trip get associated categories
    trips_with_categories = []
    for trip in trips:
        categories = [assoc.category.category_name for assoc in trip.categories_association]
        trip_data = serialize(trip)
        trip_data['categories'] = categories
        trips_with_categories.append(trip_data)

    return jsonify(trips_with_categories)

#Get all trip details (trip, expenses categories)
@app.route('/trips/<int:trip_id>/details', methods=['GET'])
def get_trip_details(trip_id):
    # Get the trip by ID
    trip = session.query(Trips).filter_by(id=trip_id).first()
    if not trip:
        return jsonify({"error": "Trip not found"}), 404

    trip_data = serialize(trip)

    # Get expenses for the trip
    expenses = session.query(Expenses).filter_by(trip_id=trip_id).all()
    trip_data['expenses'] = [serialize(expense) for expense in expenses]

    # Get categories for the trip
    categories = [assoc.category.category_name for assoc in trip.categories_association]
    trip_data['categories'] = categories

    return jsonify(trip_data)

#Search for trips by date range or by keyword
@app.route('/trips/search', methods=['GET'])
def search_trips():
    #Date Range check
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    if start_date_str and end_date_str:
        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

        trips = session.query(Trips).filter(Trips.start_date >= start_date, Trips.end_date <= end_date).all()
        return jsonify([serialize(trip) for trip in trips])

    #keyword check
    keyword = request.args.get('query')
    if keyword:
        trips = session.query(Trips).filter(
            or_(
                Trips.destination.ilike(f"%{keyword}%"),
                Trips.traveler_name.ilike(f"%{keyword}%"),
                Trips.trip_comment.ilike(f"%{keyword}%")
            )
        ).all()
        return jsonify([serialize(trip) for trip in trips])

    return jsonify({"error": "Provide either start_date and end_date or query parameter."}), 400

#Search Expenses within a certain amount range (accomodation and transportation costs added)
@app.route('/expenses/search', methods=['GET'])
def search_expenses_by_total_amount():
    amount_min = request.args.get('amount_min', type=float)
    amount_max = request.args.get('amount_max', type=float)

    # Check for amount_min and amount_max
    if amount_min is None or amount_max is None:
        return jsonify({"error": "Both amount_min and amount_max parameters are required."}), 400

    # filter expenses based on the sum of accommodation_cost and transportation_cost
    expenses = session.query(Expenses).filter(
        and_(
            (Expenses.accommodation_cost + Expenses.transportation_cost) >= amount_min,
            (Expenses.accommodation_cost + Expenses.transportation_cost) <= amount_max
        )
    ).all()

    return jsonify([serialize(expense) for expense in expenses])


if __name__ == '__main__':
    app.run(debug=True)



