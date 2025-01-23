# Importing necessary modules and functions from the project and external libraries
from website import create_app, db  # Importing the create_app function and db object from the 'website' module
from flask_migrate import init, migrate, upgrade, Migrate  # Importing migration-related functions from Flask-Migrate
import os  # Importing the os module for file and directory management

# Creating the Flask app instance by calling the factory function
app = create_app()

# Initializing Flask-Migrate with the app and database
Migrate(app, db)

# Defining the path for migration scripts
path = "migrations"

# Checking if the 'migrations' directory exists; if not, creating and running migrations
if not os.path.exists(path):
    with app.app_context():  # Ensures the app context is available for running Flask commands
        print('running migrations\n\n')  # Logging to indicate that migrations are being initialized
        init()  # Initializes a new migration repository
        migrate()  # Generates an initial migration script
        upgrade()  # Applies the migration to the database

# Running the app in debug mode if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True)  # Starts the Flask development server with debugging enabled
