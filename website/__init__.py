from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Skibidi'
    
    from .home import home
    
    app.register_blueprint(home, url_prefix='/')
    
    return app