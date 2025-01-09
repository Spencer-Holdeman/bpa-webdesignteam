// Fetch the current value of num from the Python backend
function fetchNum() {
    return fetch('get_num')
        .then(response => response.json())
        .then(data => data.num)
        .catch(error => console.error('Error fetching num:', error));
}

// Increment num and send the updated value back to Python
function incrementNum() {
    fetchNum().then(num => {
        num++;  // Increment the value

        // Update the num in Python
        fetch('http://127.0.0.1:5000/update_num', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num: num }),  // Send the updated num value
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('num').textContent = data.num;  // Update the display
        })
        .catch(error => console.error('Error updating num:', error));
    }).catch(error => console.error('Error fetching num:', error));
}

// On page load, display the initial value of num
window.onload = function() {
    fetchNum().then(num => {
        document.getElementById('num').textContent = num;
    }).catch(error => console.error('Error displaying num on load:', error));
};