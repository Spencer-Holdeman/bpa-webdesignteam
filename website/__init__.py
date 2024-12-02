from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
db_name = 'database.db'

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Skibidi'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_name}'
    db.init_app(app)
    
    from .base import base
    
    app.register_blueprint(base, url_prefix='/')
    
    with app.app_context():
        db.create_all()
    
    return app