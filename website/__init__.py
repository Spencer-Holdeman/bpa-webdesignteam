from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mailman import Mail

db = SQLAlchemy()
DB_NAME = 'database.db'

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Skibidi'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = "465"
    app.config["MAIL_USERNAME"] = "stagefrightbandokc@gmail.com"
    app.config["MAIL_PASSWORD"] = "pddu mfsc zlyn fydq"
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True
    db.init_app(app)
    mail.init_app(app)
    
    
    from .base import base
    
    app.register_blueprint(base, url_prefix='/')
    
    # with app.app_context():
    #     db.create_all()
    
    return app