from flask import Blueprint, render_template, request, session, flash, redirect, url_for, g, jsonify
from . import db
from sqlalchemy import exists, and_
from flask_mailman import EmailMessage

base = Blueprint('base', __name__)

class User(db.Model):
    _id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(50))
    newsletter = db.Column(db.Boolean , default=False)
    
    def __init__(self, name, email, password, newsletter):
        self.name = name
        self.email = email
        self.password = password
        self.newsletter = newsletter
        
@base.route('/', methods=['POST', 'GET'])
def clear_session():
    print('clear session')
    db.session.query(User).delete()
    db.session.commit()
    session.clear()
    return redirect(url_for('base.Home'))

num_cart_items = 0
@base.context_processor
def inject_variables():
    return dict(num_cart_items=num_cart_items) # this will be available in all templates

@base.route('/increment', methods=['POST', 'GET'])
def increment():
    global num_cart_items  # Access the global nums variable
    num_cart_items += 1  # Increment nums
    return jsonify({'num_cart_items': num_cart_items})

@base.route('/home', methods=['POST', 'GET'])
def Home():
    print(session.items())
    
    if 'logged_in?' in session:
        if session['logged_in?'] == True:
            print('home (logged in)')
            name = session['name']
            flash(f'Hello {name}, you have logged in!', 'success')
            return render_template('index.html')
        else:
            print('Home (session[logged_in?] is false)')
        return render_template('index.html')
    else:
        print('Home (logged out)')
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
    if request.method == 'POST':
        print('login: inside if')
        email = request.form.get('email-login', False)
        password = request.form.get('password-login', False)
        emails_passwords = db.session.query(User.email, User.password).all()
        database_emails = [email[0] for email in emails_passwords]
        database_passwords = [password[1] for password in emails_passwords]
        
        print(database_emails)
        print(database_passwords)
        
        if email in database_emails and password in database_passwords:
            if db.session.query(exists().where(and_(User.email == email, User.password == password))).scalar() == True:
                user = User.query.filter_by(email=email).first()
                session['email'] = email
                session['password'] = password
                session['name'] = user.name
                session['logged_in?'] = True
                return redirect(url_for('base.Home'))
            else:
                flash('not logged in cuz you mix matched emails and passwords')
                return render_template('login.html')
        else:
            flash('not logged in cuz your email or password doesnt exist')
            return render_template('login.html')
    else:
        print('login: outside if')
        return render_template('login.html')

@base.route('/signup', methods=['POST', 'GET'])
def SignUp():
    if request.method == 'POST':
        print('Sign-up: inside if')
        
        name = request.form.get('signup-name', False)
        email = request.form.get('signup-email', False)
        password = request.form.get('signup-password', False)
        newsletter = True if request.form.get('signup-newsletter', False) == 'on' else False
        emails_passwords = db.session.query(User.email, User.password).all()
        database_emails = [email[0] for email in emails_passwords]
        
        if email in database_emails:
            flash('email already taken, did you spell it correctly?')
            return redirect(url_for('base.SignUp'))
        
        new_user = User(name=name, email=email, password=password, newsletter=newsletter)
        
        if new_user.newsletter == True:
            msg = EmailMessage(
            "Title",
            f"Hello {name}",
            "stagefrightbandokc@gmail.com",
            [f"{email}"]
            )
            msg.send()
        
        db.session.add(new_user)
        db.session.commit()
        session['logged_in?'] = False
        return redirect(url_for('base.Login'))
    else:
        print('Sign-up: outside if')
        return render_template('signup.html')
        