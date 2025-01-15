from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and all domains (you can customize this)

# Initialize 'num' with some value
num = 10

# Endpoint to render the home page
@app.route('/', methods=['GET', 'POST'])
def home():
        
    return render_template('index.html')

# API endpoint to get the current value of 'num'
@app.route('/get_num', methods=['GET'])
def get_num():
    global num
    return jsonify({"num": num})

# API endpoint to update the value of 'num'
@app.route('/update_num', methods=['POST'])
def update_num():
    global num
    data = request.get_json()  # Receive JSON data from the request
    num = data.get("num")  # Update 'num' with the received value
    return jsonify({"message": "num updated", "num": num})

if __name__ == '__main__':
    app.run(debug=True)

