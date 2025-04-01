from flask import Blueprint, render_template, request, session, flash, redirect, url_for, g, jsonify
from . import db
from sqlalchemy import exists, and_
from flask_mailman import EmailMessage
import mjml

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
    session.clear()
    return redirect(url_for('base.Home'))

ticket_node_history = {}
current_node_history = {}
first_cart_item = -1
num_cart_items = sum(current_node_history.values()) + sum(ticket_node_history.values())
@base.route('/get_vars', methods=['GET'])
def get_vars():
    global ticket_node_history
    global current_node_history
    global first_cart_item
    global num_cart_items

    data = {
        'ticket_node_history': ticket_node_history,
        'current_node_history': current_node_history,
        'first_cart_item': first_cart_item,
        'num_cart_items': num_cart_items
    }

    return jsonify(data)

@base.route('/update_vars', methods=['POST'])
def update_vars():
    global ticket_node_history
    global current_node_history
    global first_cart_item
    global num_cart_items

    serverData = request.get_json()
    ticket_node_history = serverData.get('ticket_node_history')
    current_node_history = serverData.get('current_node_history')
    first_cart_item = serverData.get('first_cart_item')
    num_cart_items = sum(current_node_history.values()) + sum(ticket_node_history.values())
    data = {
        'ticket_node_history': ticket_node_history,
        'current_node_history': current_node_history,
        'first_cart_item': first_cart_item,
        'num_cart_items': num_cart_items
    }
    return jsonify(data)

@base.route('/home', methods=['POST', 'GET'])
def Home():
    if 'logged_in?' in session:
        if session['logged_in?'] == True:
            name = session['name']
            print('home (logged in)')
            return render_template('index.html')
        else:
            return render_template('index.html')
    else:
        return render_template('index.html')

@base.route('/tours', methods=['POST', 'GET'])
def Tours():

    return render_template('tours.html')

@base.route('/about', methods=['POST', 'GET'])
def About():

    return render_template('about.html')

# Defines a route '/contact' that accepts both GET and POST requests
@base.route('/contact', methods=["GET", "POST"])
def form():
    # Checks if the request method is POST (form submission)
    if request.method == 'POST':
        print('contact: inside if')  # Debugging print statement
        
        # Retrieves form data submitted by the user
        name = request.form.get("contact-name")
        email = request.form.get("contact-email")
        message = request.form.get("contact-message")
        subject = request.form.get("contact-subject")
        
        # Logs the form data into a formatted string
        log = f'{subject}  {name}  {email}  {message}'
        print(log)  # Debugging: prints the log information
        print(subject)  # Debugging: prints the subject
        
        mjml_content = render_template('mjml/contact.mjml', name=name, email=email, message=message, subject=subject)
        html_content = mjml.mjml2html(mjml_content)
        
        
        # Creates an email message with the collected form data
        msg = EmailMessage(
                subject="Welcome to Our Newsletter!",
                body=html_content,
                to=["stagefrightbandokc@gmail.com"]
            )
        
        msg.content_subtype = 'html'
        msg.html = html_content
        msg.send()
        
        
        # Attempts to send the email and handles any errors
        try:
            print("Email sent successfully!")  # Confirmation message
        except Exception as e:
            print(f"Error sending email: {e}")  # Error handling
        
        # Renders the contact.html template after form submission
        return render_template("contact.html")
    else:
        # If the request method is GET, simply render the contact form
        print('contact: outside if')  # Debugging: indicates GET request
        return render_template("contact.html")

@base.route('/bpa', methods=['POST', 'GET'])
def BPA():

    return render_template('bpa.html')

@base.route('/swag', methods=['POST', 'GET'])
def Swag():

    return render_template('swag.html')

@base.route('/checkout', methods=['POST', 'GET'])
def Checkout():
    global ticket_node_history
    global current_node_history
    global first_cart_item
    global num_cart_items
    
    if 'logged_in?' in session:
        name = session['name']
        logged_in = session['logged_in?']
    else:
        name = None
        logged_in = False

    if request.method == 'POST':
        if 'logged_in?' not in session:
            popup = ('<div id="popup" class="h-full w-full flex justify-center items-center fixed top-0 left-0 bg-transparent backdrop-brightness-50 backdrop-blur-[4px] z-[1000]"><div class="w-[620px] p-5 flex flex-col justify-center items-center bg-gray-700 rounded-lg"><i class="fa-solid fa-circle-exclamation py-3 text-6xl font-semibold"></i><h1 class="py-3 text-4xl font-semibold">Sign In Required</h1><p class="py-3 text-gray-300">You must sign into an account to continue checking out your items.</p><div class="w-full py-3 flex flex-row"><button onclick="understand()" class="w-[50%] px-4 py-2 mr-2 bg-purple-500 hover:bg-purple-700 transition-all duration-200 font-medium rounded-lg">I understand.</button><a href="/signup" class="w-[50%] ml-2"><button class="w-full px-4 py-2 bg-purple-500 hover:bg-purple-700 transition-all duration-200 font-medium rounded-lg">I don\'t have an account.</button></a></div></div></div>')
            flash(popup, 'info')
            return redirect(url_for('base.Login'))
        else:
            popup = ('<div id="popup" class="h-full w-full flex justify-center items-center fixed top-0 left-0 bg-transparent backdrop-brightness-50 backdrop-blur-[4px] z-[1000]"><div class="w-[620px] p-5 flex flex-col justify-center items-center bg-gray-700 rounded-lg"><i class="fa-solid fa-truck-fast py-3 text-6xl font-semibold"></i><h1 class="py-3 text-4xl font-semibold">Your order has been sent!</h1><p class="py-3 text-gray-300">We have confirmed your order and it will be shipped soon. Thank you!</p><div class="w-full py-3 flex flex-row"><button onclick="understand()" class="w-full px-4 py-2 mr-2 bg-purple-500 hover:bg-purple-700 transition-all duration-200 font-medium rounded-lg">I understand.</button></div></div></div>')
            flash(popup, 'info')
            ticket_node_history = {}
            current_node_history = {}
            first_cart_item = -1
            num_cart_items = sum(current_node_history.values()) + sum(ticket_node_history.values())
            return redirect(url_for('base.Home'))
    else:
        return render_template('checkout.html', logged_in=logged_in, name=name)

@base.route('/login', methods=['POST', 'GET'])
def Login():
    if request.method == 'POST':
        email = request.form.get('email-login', False)
        password = request.form.get('password-login', False)
        emails_passwords = db.session.query(User.email, User.password).all()
        database_emails = [email[0] for email in emails_passwords]
        database_passwords = [password[1] for password in emails_passwords]
        
        if email in database_emails and password in database_passwords:
            if db.session.query(exists().where(and_(User.email == email, User.password == password))).scalar() == True:
                user = User.query.filter_by(email=email).first()
                session['email'] = email
                session['password'] = password
                session['name'] = user.name
                session['logged_in?'] = True
                name = session['name']
                popup = (f'<div id="popup" class="h-full w-full flex justify-center items-center fixed top-0 left-0 bg-transparent backdrop-brightness-50 backdrop-blur-[4px] z-[1000]"><div class="w-[620px] p-5 flex flex-col justify-center items-center bg-gray-700 rounded-lg"><i class="fa-solid fa-square-check py-3 text-6xl font-semibold"></i><h1 class="py-3 text-4xl font-semibold">Hello {name}!</h1><p class="py-3 text-gray-300 text-center">You have been succesfully logged in.<br>Feel free to to look around for some merch.</p><div class="w-full py-3 flex flex-row"><button onclick="understand()" class="w-[50%] px-4 py-2 mr-2 bg-purple-500 hover:bg-purple-700 transition-all duration-200 font-medium rounded-lg">Got it!</button><a href="/checkout" class="w-[50%] ml-2"><button class="w-full px-4 py-2 bg-purple-500 hover:bg-purple-700 transition-all duration-200 font-medium rounded-lg">Go to Checkout</button></a></div></div></div>')
                flash(popup, 'info')
                return redirect(url_for('base.Home'))
            else:
                flash('Incorrect Email or Password, Try again.', 'error')
                return render_template('login.html')
        else:
            flash('Incorrect Email or Password, Try again.', 'error')
            return render_template('login.html')
    else:
        return render_template('login.html')

@base.route('/signup', methods=['POST', 'GET'])
def SignUp():
    if request.method == 'POST':
        name = request.form.get('signup-name', False)
        email = request.form.get('signup-email', False)
        password = request.form.get('signup-password', False)
        newsletter = True if request.form.get('signup-newsletter', False) == 'on' else False
        emails_passwords = db.session.query(User.email, User.password).all()
        database_emails = [email[0] for email in emails_passwords]
        
        if email in database_emails:
            flash('Email is Already Taken.')
            return redirect(url_for('base.SignUp'))
        
        new_user = User(name=name, email=email, password=password, newsletter=newsletter)
        
        if new_user.newsletter == True:
            # Render MJML template and convert to HTML
            mjml_content = render_template('mjml/signup.mjml', name=name)
            html_content = mjml.mjml2html(mjml_content)  # Convert MJML to HTML

            # Create the email
            msg = EmailMessage(
                subject="Welcome to Our Newsletter!",
                body=html_content,
                to=[email]
            )

            # Send the email
            msg.content_subtype = 'html'
            msg.html = html_content
            msg.send()
        
        db.session.add(new_user)
        db.session.commit()
        session['logged_in?'] = False
        return redirect(url_for('base.Login'))
    else:
        print('Sign-up: outside if')
        return render_template('signup.html') 
