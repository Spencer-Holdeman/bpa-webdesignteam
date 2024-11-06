from flask import Blueprint, render_template

base = Blueprint('views', __name__)

@base.route('/')
def Home():
    
    return render_template("index.html")

@base.route('/members')
def Members():
    
    return render_template("members.html")

@base.route('/swag')
def Swag():
    
    return render_template("swag.html")

@base.route('/login')
def Login():
    
    return render_template("login.html")

@base.route('/signup')
def SignUp():
    
    return render_template("signup.html")