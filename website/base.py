from flask import Blueprint, render_template, request, session, flash
from . import db

base = Blueprint('base', __name__)

class User(db.Model):
    _id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(50))
    
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

@base.route('/', methods=['POST', 'GET'])
def Home():
    print('Home')
    return render_template('index.html')

@base.route('/members', methods=['POST', 'GET'])
def Members():
    print('Members')
    return render_template('members.html')

@base.route('/swag', methods=['POST', 'GET'])
def Swag():
    print('Swag')
    return render_template('swag.html')

@base.route('/login', methods=['POST', 'GET'])
def Login():
    print('Login')
    return render_template('login.html')

@base.route('/signup', methods=['POST', 'GET'])
def SignUp():
    if request.method == 'POST':
        print('Sign-up: inside if')
        name = request.form['signup-name']
        email = request.form['signup-email']
        password = request.form['signup-password']
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        # redirects to login 
    else:
        print('Sign-up: outside if')
        return render_template('signup.html')
    
    #this is how you log a user in
    #     session['name'] = name
    #     session['email'] = email
    #     session['password'] = password
    #     is_logged_in = True