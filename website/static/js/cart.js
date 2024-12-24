function incrementCartItems() {
    // Send a POST request to increment the nums variable
    fetch('/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Update the displayed value of nums
        document.getElementById('nums-value').innerText = data.num_cart_items;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}