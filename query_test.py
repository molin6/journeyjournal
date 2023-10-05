from queries import (
    get_all_expenses_for_trip, 
    get_all_trips_by_traveler_name,
    get_average_accommodation_cost,
    get_trips_with_categories, 
    get_complete_trip_details
)

print("hello")
# Test the first query
trip_expenses = get_all_expenses_for_trip(1)
print(f"Expenses for Trip 1: {trip_expenses}")

# Test the second query
trips_for_john = get_all_trips_by_traveler_name('John Smith')
print(f"Trips for John Smith: {trips_for_john}")

# Test the third query
average_cost = get_average_accommodation_cost()
print(f"Average Accommodation Cost: {average_cost}")

# Test the fourth query
trips_categories = get_trips_with_categories()
print(f"Trips with Categories: {trips_categories}")

# Test the fifth query
complete_trip_detail = get_complete_trip_details(1)
print(f"Complete Details for Trip 1: {complete_trip_detail}")
