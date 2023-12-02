# 🌐 JourneyJournal

JourneyJournal is a community-driven platform where users can share and explore travel experiences from around the globe! 🌍 Share details of your adventures, learn about exciting destinations, and connect with fellow travelers!

## 🚀 Features

- **Post Trips**: Share details of your travel experiences, from destinations and duration to travel costs.
- **Explore**: Browse trips shared by other users.
- **Filter & Search**: Easily find specific trips or destinations.
- **Community Driven**: Engage with other travelers and learn from their experiences.
- **Categories**: Classify trips into various categories for easier navigation and exploration.

## Documentation
![Data Dictionary](./docs/DataDictionary.md)
![Queries](./docs/Queries.md)
![API Endpoint Documentation](./docs/APIEndPoints.md)

## Getting Started

### Prerequisites

Before running the API or the Django project, ensure you have the following installed:
- Python 3
- pip (Python package manager)

### Setting Up and Running the API

1. **Clone the Repository**

   Start by cloning the JourneyJournal repository to your local machine.

   ```bash
   git clone https://github.com/molin6/journeyjournal.git
   cd journeyjournal
   ```

2. **Install Dependencies**

   Install the required Python packages using pip:

   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize the Database**

   Run the `db_init.py` script to initialize the database:

   ```bash
   python db_init.py
   ```

4. **Populate the Database**

   Optionally, you can populate the database with initial data:

   ```bash
   python populate_db.py
   ```

5. **Run the Flask API**

   Start the Flask server:

   ```bash
   python main.py
   ```

   The API should now be running on `http://localhost:5000`.

### Setting Up and Running the Django Project

1. **Navigate to the Django Project Directory**

   Change to the Django project directory:

   ```bash
   cd web/
   ```

2. **Install Django Dependencies**

   Install the required packages for the Django project:

   ```bash
   pip install -r requirements.txt
   ```
3. **Navigate to the Django Project Directory**

   Change to the Django project directory:

   ```bash
   cd journeyjournalweb/
   ```
4. **Start the Django Server**

   Run the Django development server:

   ```bash
   python manage.py runserver
   ```

   The Django project should now be accessible at `http://127.0.0.1:8000`.

### Running Both API and Django Project

To fully utilize the functionality of JourneyJournal, you need to have both the Flask API and the Django project running simultaneously. Start the Flask API as described in the above steps and then open a new terminal window or tab to start the Django project. This way, both services will be running concurrently, allowing the Django project to interact with the API.
