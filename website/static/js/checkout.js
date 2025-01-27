async function fetchVars() {
    try {
        // Make a GET request to the 'get_vars' endpoint
        const response = await fetch('get_vars');

        // Parse the response JSON into a JavaScript object
        const data = await response.json();

        // Return the fetched data
        return data;
    } catch (error) {
        // Log any errors that occur during the fetch or JSON parsing
        console.error('Error fetching vars:', error);

        // Return the error (optional, depending on the error-handling strategy)
        return;
    }
}

function constCart() {
    console.log('checkout.js loaded');
    fetchVars().then(data => {
        console.log(data);
        console.log(Object.keys(data.current_node_history).length)
        for (var i = 0; i < Object.keys(data.current_node_history).length; i++) {
            console.log('here');
            // Create elements for the cart item
            var div_element = document.createElement('div'); // this div contains the entire general cart item 
            var button_div = document.createElement('div'); // this div contains the buttons 
            var item_count = document.createElement('p'); // this p contains the number of items in the cart
            var item_image = document.createElement('img'); // this img contains the image of the item
            var item_description = document.createElement('p'); // this p contains the description of the item
            var div_element2 = document.createElement('div'); // this div contains the item description and the buttons

            // Get the current node and its details
            var current_node = document.getElementById(Object.keys(data.current_node_history)[i]);
            var img_source = current_node.parentElement.parentElement.previousElementSibling.src;
            var merch_item = current_node.parentElement.previousElementSibling.innerText
            // var merch_price = current_node.previousElementSibling.previousElementSibling == null ? current_node.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerText : current_node.previousElementSibling.innerText;

            var node_id = current_node.id;
            console.log(`Current node: ${current_node.id}, img source: ${img_source}, merch item: ${merch_item}`);

            // Set attributes and inner text for the new cart item elements
            div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            item_count.setAttribute('class', 'cart-item-count');
            item_count.setAttribute('id', node_id);
            item_image.setAttribute('class', 'h-20 w-20 bg-white rounded-xl');
            item_image.setAttribute('src', img_source);

            item_count.innerText = `item count: ${data.current_node_history[node_id]}`;
            // remove_item_button.innerText = 'Remove';

            // Append the new elements to the cart item div
            button_div.appendChild(item_count);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('const-cart').appendChild(div_element);
        }
        for (var i = 0; i < Object.keys(data.ticket_node_history).length; i++) {
            // Create elements for the new cart item
            var div_element = document.createElement('div'); // this div contains the entire general cart item 
            var button_div = document.createElement('div'); // this div contains the buttons 
            var item_count = document.createElement('p'); // this p contains the number of items in the cart
            var item_image = document.createElement('img'); // this img contains the image of the item
            var item_description = document.createElement('p'); // this p contains the description of the item
            var div_element2 = document.createElement('div'); // this div contains the item description and the buttons

            // Get the current node and its details
            var current_node = document.getElementById(Object.keys(data.ticket_node_history)[i]);
            var img_source = '../static/img/misc/download.png'
            var merch_item = current_node.parentElement.previousElementSibling.innerText
            var node_id = current_node.id;

            // Set attributes and inner text for the new cart item elements
            div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            item_count.setAttribute('class', 'cart-item-count');
            item_count.setAttribute('id', node_id);
            item_image.setAttribute('class', 'h-20 w-20 bg-white rounded-xl');
            item_image.setAttribute('src', img_source);

            item_count.innerText = data.ticket_node_history[node_id];

            // Append the new elements to the cart item div
            button_div.appendChild(item_count);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('const-cart').appendChild(div_element);
        }
    });
}