from website import create_app, db
from flask_migrate import init, migrate, upgrade, Migrate
import os

app = create_app()
Migrate(app,db)

path = "migrations"
if not os.path.exists(path):
    with app.app_context():
        print('running migrations\n\n')
        init()
        migrate()
        upgrade()

if __name__ == '__main__':
    app.run(debug=True)