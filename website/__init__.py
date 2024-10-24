from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Skibidi'
    
    from .base import base
    
    app.register_blueprint(base, url_prefix='/')
    
    return app