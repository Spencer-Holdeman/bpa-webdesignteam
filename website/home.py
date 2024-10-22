from flask import Blueprint, render_template

home = Blueprint('views', __name__)

@home.route('/')
def Home():
    
    return '<h1>Hello World!</h1>'