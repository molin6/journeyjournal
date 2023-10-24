## Journey Journal API Documentation

---

### **Trips**

#### List all trips

- **Endpoint**: `GET /trips`
- **Description**: Retrieve a list of all trips stored in the system.
- **Returns**:
    ```json
    [
        {
            "TripID": 1,
            "destination": "Paris",
            ...
        },
        ...
    ]
    ```

#### Get a specific trip by ID

- **Endpoint**: `GET /trips/<trip_id>`
- **Description**: Obtain detailed information about a specific trip based on its ID.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    {
        "TripID": 1,
        "destination": "Paris",
        ...
    }
    ```

#### List all trips by a specific traveler

- **Endpoint**: `GET /trips?traveler_name=<traveler_name>`
- **Description**: Display all trips associated with a particular traveler.
- **Parameters**: 
  - `traveler_name: string`
- **Returns**:
    ```json
    [
        {
            "TripID": 2,
            "destination": "London",
            ...
        },
        ...
    ]
    ```

#### Add a new trip

- **Endpoint**: `POST /trips`
- **Description**: Add a new trip entry.
- **Body**:
    ```json
    {
        "destination": "Berlin",
        ...
    }
    ```
- **Returns**:
    ```json
    {
        "TripID": 3,
        "destination": "Berlin",
        ...
    }
    ```

#### Update a trip

- **Endpoint**: `PUT /trips/<trip_id>`
- **Description**: Modify details of an existing trip.
- **Parameters**: 
  - `trip_id: int`
- **Body**:
    ```json
    {
        "destination": "Berlin Updated",
        ...
    }
    ```

#### Delete a trip

- **Endpoint**: `DELETE /trips/<trip_id>`
- **Description**: Remove a specific trip from the database.
- **Parameters**: 
  - `trip_id: int`

### **Expenses**

#### List all expenses for a specific trip

- **Endpoint**: `GET /trips/<trip_id>/expenses`
- **Description**: Retrieve all expenses related to a specific trip.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    [
        {
            "ExpenseID": 1,
            "AccommodationType": "Hotel",
            ...
        },
        ...
    ]
    ```

#### Add a new expense for a trip

- **Endpoint**: `POST /trips/<trip_id>/expenses`
- **Description**: Record a new expense for a specific trip.
- **Parameters**: 
  - `trip_id: int`
- **Body**:
    ```json
    {
        "AccommodationType": "Hostel",
        ...
    }
    ```
- **Returns**:
    ```json
    {
        "ExpenseID": 2,
        "AccommodationType": "Hostel",
        ...
    }
    ```

#### Update an expense

- **Endpoint**: `PUT /expenses/<expense_id>`
- **Description**: Edit details of an existing expense.
- **Parameters**: 
  - `expense_id: int`
- **Body**:
    ```json
    {
        "AccommodationType": "Motel",
        ...
    }
    ```

#### Delete an expense

- **Endpoint**: `DELETE /expenses/<expense_id>`
- **Description**: Eliminate a specific expense record.
- **Parameters**: 
  - `expense_id: int`

### **Categories**

#### List all trip categories

- **Endpoint**: `GET /categories`
- **Description**: Display all trip categories.
- **Returns**:
    ```json
    [
        {
            "CategoryID": 1,
            "CategoryName": "Beach",
            ...
        },
        ...
    ]
    ```

#### Add a new category

- **Endpoint**: `POST /categories`
- **Description**: Introduce a new trip category.
- **Body**:
    ```json
    {
        "CategoryName": "Hiking"
    }
    ```
- **Returns**:
    ```json
    {
        "CategoryID": 2,
        "CategoryName": "Hiking"
    }
    ```

#### Update a category

- **Endpoint**: `PUT /categories/<category_id>`
- **Description**: Modify an existing trip category.
- **Parameters**: 
  - `category_id: int`
- **Body**:
    ```json
    {
        "CategoryName": "Trekking"
    }
    ```

#### Delete a category

- **Endpoint**: `DELETE /categories/<category_id>`
- **Description**: Remove a category from the system.
- **Parameters**: 
  - `category_id: int`

### **Statistics and Extended Queries**

#### Get average accommodation cost

- **Endpoint**: `GET /expenses/accommodation/average`
- **Description**: Calculate the average cost of accommodations.
- **Returns**:
    ```json
    {
        "average_cost": 150.5
    }
    ```

#### Get trips with their categories

- **Endpoint**: `GET /trips/with-categories`
- **Description**: List trips with their associated categories.
- **Returns**:
    ```json
    [
        {
            "TripID": 1,
            "destination": "Paris",
            "categories": ["Beach", "Hiking"],
            ...
        },
        ...
    ]
    ```

#### Get full details for a specific trip

- **Endpoint**: `GET /trips/<trip_id>/details`
- **Description**: Retrieve a comprehensive breakdown of a trip.
- **Parameters**: 
  - `trip_id: int`
- **Returns**:
    ```json
    {
        "TripID": 1,
        "destination": "Paris",
        "expenses": [...],
        "categories": [...],
        ...
    }
    ```

### **Search**

#### Search for trips based on date range

- **Endpoint**: `GET /trips/search?start_date=<start_date>&end_date=<end_date>`
- **Description**: Find trips within a date range.
- **Parameters**: 
  - `start_date: date`
  - `end_date: date`
- **Returns**:
    ```json
    [
        {
            "TripID": 1,
            "destination": "Paris",
            ...
        },
        ...
    ]
    ```

#### Search trips based on a keyword

- **Endpoint**: `GET /trips/search?query=<keyword>`
- **Description**: Locate trips with a specific keyword.
- **Parameters**: 
  - `query: string`
- **Returns**:
    ```json
    [
        {
            "TripID": 3,
            "destination": "Berlin",
            ...
        },
        ...
    ]
    ```

#### Search expenses within a certain amount range

- **Endpoint**: `GET /expenses/search?amount_min=<x>&amount_max=<y>`
- **Description**: Identify expenses within a specific cost range.
- **Parameters**: 
  - `amount_min: float`
  - `amount_max: float`
- **Returns**:
    ```json
    [
        {
            "ExpenseID": 1,
            "AccommodationType": "Hotel",
            "amount": 150.0,
            ...
        },
        ...
    ]
    ```
