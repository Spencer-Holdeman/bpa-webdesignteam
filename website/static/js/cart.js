// Landon
// ----------------- Shopping Bag -----------------
const shoppingBag = document.getElementById("shopping-bag");
const cartBlur = document.getElementById("cart-blur");
/**
 * Toggles the visibility of the shopping bag and cart blur elements.
 * Applies an animation to the shopping bag element for 0.3 seconds.
 * After the animation completes, pauses the animation.
 */
function openShoppingBag() {
    shoppingBag.classList.remove("hidden");
    cartBlur.classList.remove("hidden");
    shoppingBag.style.animation = "openCart 0.3s alternate infinite ease-in-out";
    setTimeout(() => {
        shoppingBag.style.animationPlayState = "paused";
    }, 300);
}
function closeShoppingBag() {
    shoppingBag.style.animationPlayState = "running";
    setTimeout(() => {
        shoppingBag.classList.add("hidden");
        cartBlur.classList.add("hidden");
    }, 300);
}

// Spencer
/**
 * Fetches variables from the server.
 *
 * This function sends a request to the 'get_vars' endpoint and returns the
 * parsed JSON response. If an error occurs during the fetch operation, it
 * logs the error to the console.
 */
// Asynchronous function to fetch variables from the server
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

function increment(current_node) {
    // Disable the button to prevent multiple clicks
    current_node.disabled = true;

    // show a loading message
    current_node.innerText = '#';

    // Get the ID of the next sibling element of the current node
    var node_id = current_node.nextElementSibling.id;
    var merch_price = current_node.dataset.price;

    // Fetch variables from the server
    fetchVars().then(data => {
        // Check if the item quantity has reached the maximum limit of 99
        if (data.current_node_history[node_id] == 99) {
            // Re-enable the button and reset the text if the limit is reached
            current_node.disabled = false;
            current_node.innerText = '+';
            return; // Exit the function if the limit is reached
        } else {
            // Increment the quantity of the current item in the data object
            data.current_node_history[node_id] += 1;

            var total_price = parseFloat(merch_price) * data.current_node_history[node_id];
            console.log(`${merch_price} * ${data.current_node_history[node_id]} = ${total_price}`);

            // Send the updated data to the server
            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticket_node_history: data.ticket_node_history,
                    current_node_history: data.current_node_history,
                    first_cart_item: data.first_cart_item,
                    num_cart_items: data.num_cart_items
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // Update the UI with the new number of items in the cart
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have ${data.num_cart_items} items in your cart`;

                    // Update the displayed quantity of the current item
                    document.getElementById(node_id).innerText = data.current_node_history[node_id];
                    document.getElementById(`total-price-item-${node_id}`).innerText = 'Item Total: $' + total_price.toFixed(2);

                    // Re-enable the button after the update is complete
                    current_node.disabled = false;
                    current_node.innerText = '+'; // Reset button text
                    calculatePrice();
                })
                .catch(error => {
                    // Handle any errors during the update process
                    console.error('Error updating num:', error);

                    // Re-enable the button and reset the text if there's an error
                    current_node.disabled = false;
                    current_node.innerText = '+';
                });
        }
    }).catch(error => {
        // Handle any errors during data fetching
        console.error('Error fetching vars:', error);

        // Re-enable the button and reset the text if there's an error
        current_node.disabled = false;
        current_node.innerText = '+';
    });
}


function ticketIncrement(current_node) {
    // Disable the button to prevent multiple clicks
    current_node.disabled = true;

    // show a loading message
    current_node.innerText = 'Loading...';

    // Get the ID of the next sibling element of the current node
    var node_id = current_node.nextElementSibling.id;
    var merch_price = current_node.dataset.price;

    // Fetch variables from the server
    fetchVars().then(data => {
        // Check if the item quantity has reached the maximum limit of 99
        if (data.ticket_node_history[node_id] == 99) {
            // Re-enable the button and reset the text if the limit is reached
            current_node.disabled = false;
            current_node.innerText = '+';
            return; // Exit the function if the limit is reached
        } else {
            // Increment the quantity of the current item in the data object
            data.ticket_node_history[node_id] += 1;

            var total_price = parseFloat(merch_price) * data.ticket_node_history[node_id];
            console.log(`${merch_price} * ${data.ticket_node_history[node_id]} = ${total_price}`);

            // Send the updated data to the server
            fetch('/update_vars', {
                method: 'POST', // Specify HTTP POST method
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                // Send updated data including current item quantities and cart information
                body: JSON.stringify({
                    ticket_node_history: data.ticket_node_history,
                    current_node_history: data.current_node_history,
                    first_cart_item: data.first_cart_item,
                    num_cart_items: data.num_cart_items
                }),
            })
                .then(response => response.json()) // Parse the server response as JSON
                .then(data => {
                    // Update the UI with the new number of items in the cart
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have ${data.num_cart_items} items in your cart`;

                    // Update the displayed quantity of the current item
                    document.getElementById(node_id).innerText = data.ticket_node_history[node_id];
                    document.getElementById(`total-price-item-${node_id}`).innerText = 'Item Total: $' + total_price.toFixed(2);

                    // Re-enable the button after the update is complete
                    current_node.disabled = false;
                    current_node.innerText = '+'; // Reset button text
                    calculatePrice();
                })
                .catch(error => {
                    console.error('Error updating num:', error)

                    // Re-enable the button and reset the text if there's an error
                    current_node.disabled = false;
                    current_node.innerText = '+';
                }); // Log any errors during the update process
        }
    }).catch(error => {
        console.error('Error fetching vars:', error)

        // Re-enable the button and reset the text if there's an error
        current_node.disabled = false;
        current_node.innerText = '+';
    }); // Log any errors during data fetching
}

/**
 * Decrements the quantity of a cart item.
 *
 * This function fetches the current variables from the server, decrements the
 * quantity of the specified cart item, updates the server with the new quantity,
 * and updates the UI to reflect the new quantity. If the quantity reaches zero,
 * the item is removed from the cart.
 *
 * current_node - The button element that was clicked to trigger this function.
 */
function decrement(current_node) {
    // Disable the button to prevent multiple clicks
    current_node.disabled = true;

    // show a loading message
    current_node.innerText = 'Loading...';

    // Get the ID of the previous sibling element of the current node
    var node_id = current_node.previousElementSibling.id;
    var merch_price = current_node.dataset.price;

    // Fetch variables from the server
    fetchVars().then(data => {

        // Decrement the quantity of the current item in the data object
        data.current_node_history[node_id] -= 1;

        var total_price = parseFloat(merch_price) * data.current_node_history[node_id];
        console.log(`${merch_price} * ${data.current_node_history[node_id]} = ${total_price}`);

        // Send the updated data to the server
        fetch('/update_vars', {
            method: 'POST', // Specify HTTP POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            // Send updated data including current item quantities and cart information
            body: JSON.stringify({
                ticket_node_history: data.ticket_node_history,
                current_node_history: data.current_node_history,
                first_cart_item: data.first_cart_item,
                num_cart_items: data.num_cart_items
            }),
        })
            .then(response => response.json()) // Parse the server response as JSON
            .then(data => {
                // Check if the item quantity has reached zero
                if (data.current_node_history[node_id] <= 0) {
                    // Get the parent element of the current node
                    var parent_element = current_node.parentElement.parentElement.parentElement;

                    // Remove the item from the data object
                    delete data.current_node_history[node_id];

                    // Send the updated data to the server
                    fetch('/update_vars', {
                        method: 'POST', // Specify HTTP POST method
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        // Send updated data including current item quantities and cart information
                        body: JSON.stringify({
                            ticket_node_history: data.ticket_node_history,
                            current_node_history: data.current_node_history,
                            first_cart_item: data.first_cart_item,
                            num_cart_items: data.num_cart_items
                        }),
                    })
                        .then(response => response.json()) // Parse the server response as JSON
                        .then(data => {
                            // Update the UI with the new number of items in the cart
                            document.getElementById('nums-value').innerText = data.num_cart_items;
                            document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;
                            // Remove the item from the UI
                            parent_element.remove();
                            calculatePrice();
                        })
                        .catch(error => {
                            // Re-enable the button and reset the text if the limit is reached
                            current_node.disabled = false;
                            current_node.innerText = '-';

                            console.error('Error updating num:', error)
                        }); // Log any errors during the update process
                } else {
                    // Update the displayed quantity of the current item
                    document.getElementById(node_id).innerText = data.current_node_history[node_id];
                    document.getElementById(`total-price-item-${node_id}`).innerText = 'Item Total: $' + total_price.toFixed(2);

                    // Update the UI with the new number of items in the cart
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have ${data.num_cart_items} items in your cart`;

                    // Re-enable the button and reset the text if the limit is reached
                    current_node.disabled = false;
                    current_node.innerText = '-';
                    calculatePrice();
                }
            })
            .catch(error => {
                // Re-enable the button and reset the text if the limit is reached
                current_node.disabled = false;
                current_node.innerText = '-';

                console.error('Error updating num:', error)
            }); // Log any errors during the update process
    }).catch(error => {
        // Re-enable the button and reset the text if the limit is reached
        current_node.disabled = false;
        current_node.innerText = '-';

        console.error('Error fetching vars:', error)
    }); // Log any errors during data fetching
}

function ticketDecrement(current_node) {
    // Disable the button to prevent multiple clicks
    current_node.disabled = true;

    // show a loading message
    current_node.innerText = 'Loading...';

    // Get the ID of the previous sibling element of the current node
    var node_id = current_node.previousElementSibling.id;
    var merch_price = current_node.dataset.price;

    // Fetch variables from the server
    fetchVars().then(data => {

        // Decrement the quantity of the current item in the data object
        data.ticket_node_history[node_id] -= 1;

        var total_price = parseFloat(merch_price) * data.ticket_node_history[node_id];
        console.log(`${merch_price} * ${data.ticket_node_history[node_id]} = ${total_price}`);

        // Send the updated data to the server
        fetch('/update_vars', {
            method: 'POST', // Specify HTTP POST method
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            // Send updated data including current item quantities and cart information
            body: JSON.stringify({
                ticket_node_history: data.ticket_node_history,
                current_node_history: data.current_node_history,
                first_cart_item: data.first_cart_item,
                num_cart_items: data.num_cart_items
            }),
        })
            .then(response => response.json()) // Parse the server response as JSON
            .then(data => {
                // Check if the item quantity has reached zero
                if (data.ticket_node_history[node_id] == 0) {
                    // Get the parent element of the current node
                    var parent_element = current_node.parentElement.parentElement.parentElement;

                    // Remove the item from the data object
                    delete data.ticket_node_history[node_id];

                    // Send the updated data to the server
                    fetch('/update_vars', {
                        method: 'POST', // Specify HTTP POST method
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        // Send updated data including current item quantities and cart information
                        body: JSON.stringify({
                            ticket_node_history: data.ticket_node_history,
                            current_node_history: data.current_node_history,
                            first_cart_item: data.first_cart_item,
                            num_cart_items: data.num_cart_items
                        }),
                    })
                        .then(response => response.json()) // Parse the server response as JSON
                        .then(data => {
                            // Update the UI with the new number of items in the cart
                            document.getElementById('nums-value').innerText = data.num_cart_items;
                            document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;
                            // Remove the item from the UI
                            parent_element.remove();
                            calculatePrice();
                        })
                        .catch(error => {
                            // Re-enable the button and reset the text if the limit is reached
                            current_node.disabled = false;
                            current_node.innerText = '-';
            
                            console.error('Error updating num:', error)
                        }); // Log any errors during the update process
                } else {
                    // Update the displayed quantity of the current item
                    document.getElementById(node_id).innerText = data.ticket_node_history[node_id];
                    document.getElementById(`total-price-item-${node_id}`).innerText = 'Item Total: $' + total_price.toFixed(2);

                    // Update the UI with the new number of items in the cart
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have ${data.num_cart_items} items in your cart`;
    
                    // Re-enable the button and reset the text if the limit is reached
                    current_node.disabled = false;
                    current_node.innerText = '-';
                    calculatePrice();
                }
            })
            .catch(error => {
                // Re-enable the button and reset the text if the limit is reached
                current_node.disabled = false;
                current_node.innerText = '-';

                console.error('Error updating num:', error)
            }); // Log any errors during the update process
    }).catch(error => {
        // Re-enable the button and reset the text if the limit is reached
        current_node.disabled = false;
        current_node.innerText = '-';

        console.error('Error fetching vars:', error)
    }); // Log any errors during data fetching
}

// function removeCartItem(current_node) {
//     var node_id = current_node.previousElementSibling.previousElementSibling.id;
//     var num_cart_items = document.getElementById(node_id).innerText * 2;

//     while (num_cart_items > 0) {
//         console.log(num_cart_items)
//         decrement(current_node.previousElementSibling);
//         num_cart_items -= 1;
//     }
// }

/**
 * Increments the quantity of a cart item or adds a new item to the cart.
 *
 * This function fetches the current variables from the server, checks if the
 * specified cart item is already in the cart, and increments its quantity or
 * adds it as a new item. It updates the server with the new quantity and updates
 * the UI to reflect the new quantity.
 *
 * current_node - The button element that was clicked to trigger this function.
 */
function incrementCartItems(current_node) {
    // Create elements for the new cart item
    var div_element = document.createElement('div'); // this div contains the entire general cart item 
    var button_div = document.createElement('div'); // this div contains the buttons 
    var add_button = document.createElement('button'); // this button adds the item to the cart
    var item_count = document.createElement('p'); // this p contains the number of items in the cart
    var decrement_button = document.createElement('button'); // this button removes the item from the cart
    var item_image = document.createElement('img'); // this img contains the image of the item
    var item_description = document.createElement('p'); // this p contains the description of the item
    var div_element2 = document.createElement('div'); // this div contains the item description and the buttons
    var total_price_element = document.createElement('p'); // this p contains the total price of the item

    // Get the current node and its details
    var img_source = current_node.dataset.img_src;
    var merch_item = current_node.dataset.merch_item;
    var merch_price = current_node.dataset.merch_price;
    var node_id = current_node.id;

    // Fetch variables from the server
    fetchVars().then(data => {
        // Check if the item is already in the cart
        if (!(node_id in data.current_node_history)) {
            // Add the item to the cart with a quantity of 1
            data.current_node_history[node_id] = 1;

            var total_price = parseFloat(merch_price.split('$').join('')) * data.current_node_history[node_id];
            console.log(`${merch_price.split('$').join('')} * ${data.current_node_history[node_id]} = ${total_price}`);

            // Check if this is the first item in the cart
            if (data.first_cart_item < 1) {
                openShoppingBag();
                data.first_cart_item = 1;
            }

            // Update the server with the new cart data
            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;

                    // Set attributes and inner text for the new cart item elements
                    div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
                    button_div.setAttribute('class', 'cart-item-buttons');
                    button_div.setAttribute('style', 'display: flex; align-items: center;');
                    add_button.setAttribute('onclick', 'increment(this)');
                    add_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
                    add_button.setAttribute('data-price', merch_price.split('$').join(''));
                    item_count.setAttribute('class', 'cart-item-count w-[40px] text-center');
                    item_count.setAttribute('id', node_id);
                    item_count.setAttribute('data-price', merch_price.split('$').join(''));
                    decrement_button.setAttribute('onclick', 'decrement(this)');
                    decrement_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
                    decrement_button.setAttribute('data-price', merch_price.split('$').join(''));
                    item_image.setAttribute('class', 'h-20 w-20 mr-2 bg-white rounded-xl');
                    item_image.setAttribute('src', img_source);
                    total_price_element.setAttribute('id', `total-price-item-${node_id}`);
        
                    item_description.classList.add('font-bold');
        
                    add_button.innerText = '+';
                    item_count.innerText = data.current_node_history[node_id];
                    decrement_button.innerText = '-';
                    total_price_element.innerText = 'Item(s) Total: $' + total_price.toFixed(2);;
        
                    // Append the new elements to the cart item div
                    button_div.appendChild(add_button);
                    button_div.appendChild(item_count);
                    button_div.appendChild(decrement_button);
        
                    item_description.innerText = merch_item;
                    div_element.appendChild(item_image);
                    div_element2.appendChild(item_description);
                    div_element2.appendChild(total_price_element);
                    div_element2.appendChild(button_div);
                    div_element.appendChild(div_element2);
                    document.getElementById('cart-items').appendChild(div_element);
                    calculatePrice();
                })
                .catch(error => console.error('Error updating num:', error));
        } else {
            // Check if the item quantity has reached the maximum limit of 99
            if (data.current_node_history[node_id] == 99) {
                return;
            } else {
                // Increment the quantity of the current item in the data object
                data.current_node_history[node_id] += 1;

                var total_price = parseFloat(merch_price.split('$').join('')) * data.current_node_history[node_id];
                console.log(`${merch_price.split('$').join('')} * ${data.current_node_history[node_id]} = ${total_price}`);

                // Update the server with the new cart data
                fetch('/update_vars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('nums-value').innerText = data.num_cart_items;
                        document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;

                        // Update the displayed quantity of the current item
                        document.getElementById(node_id).innerText = data.current_node_history[node_id];
                        document.getElementById(`total-price-item-${node_id}`).innerText = 'Item(s) Total: $' + total_price.toFixed(2);
                        calculatePrice();
                    })
                    .catch(error => console.error('Error updating num:', error));
            }
        }
    }).catch(error => console.error('Error fetching vars:', error)); // Log any errors during data fetching
}

function incrementTicketItems(current_node) {
    // Create elements for the new cart item
    var div_element = document.createElement('div'); // this div contains the entire general cart item 
    var button_div = document.createElement('div'); // this div contains the buttons 
    var add_button = document.createElement('button'); // this button adds the item to the cart
    var item_count = document.createElement('p'); // this p contains the number of items in the cart
    var decrement_button = document.createElement('button'); // this button removes the item from the cart
    var item_image = document.createElement('img'); // this img contains the image of the item
    var item_description = document.createElement('p'); // this p contains the description of the item
    var div_element2 = document.createElement('div'); // this div contains the item description and the buttons
    var total_price_element = document.createElement('p'); // this p contains the total price of the item

    // Get the current node and its details
    var img_source = '../static/img/swag/ticket.png'
    var venue = current_node.dataset.venue;
    var city = current_node.dataset.city;
    var date = current_node.dataset.date;
    var merch_price = current_node.dataset.merch_price;
    var merch_item = `Ticket - ${city}`;
    var node_id = current_node.id;

    // Fetch variables from the server
    fetchVars().then(data => {
        // Check if the item is already in the cart
        if (!(node_id in data.ticket_node_history)) {
            // Add the item to the cart with a quantity of 1
            data.ticket_node_history[node_id] = 1;

            var total_price = parseFloat(merch_price.split('$').join('')) * data.ticket_node_history[node_id];
            console.log(`${merch_price.split('$').join('')} * ${data.ticket_node_history[node_id]} = ${total_price}`);

            // Check if this is the first item in the cart
            if (data.first_cart_item < 1) {
                openShoppingBag();
                data.first_cart_item = 1;

                // Update the server with the new cart data
                fetch('/update_vars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
                })
                    .then(response => response.json())
                    .then(data => {
                    })
                    .catch(error => console.error('Error updating num:', error));
            }

            // Update the server with the new cart data
            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;
                })
                .catch(error => console.error('Error updating num:', error));

            // Set attributes and inner text for the new cart item elements
            div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            add_button.setAttribute('onclick', 'ticketIncrement(this)');
            add_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            add_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_count.setAttribute('class', 'cart-item-count w-[40px] text-center');
            item_count.setAttribute('id', node_id);
            item_count.setAttribute('data-price', merch_price.split('$').join(''));
            decrement_button.setAttribute('onclick', 'ticketDecrement(this)');
            decrement_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            decrement_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_image.setAttribute('class', 'h-20 w-20 mr-2 bg-white rounded-xl');
            item_image.setAttribute('src', img_source);
            total_price_element.setAttribute('id', `total-price-item-${node_id}`);

            item_description.classList.add('font-bold');

            add_button.innerText = '+';
            item_count.innerText = data.ticket_node_history[node_id];
            decrement_button.innerText = '-';
            total_price_element.innerText = 'Item(s) Total: $' + total_price.toFixed(2);
            // remove_item_button.innerText = 'Remove';

            // Append the new elements to the cart item div
            button_div.appendChild(add_button);
            button_div.appendChild(item_count);
            button_div.appendChild(decrement_button);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(total_price_element);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('cart-items').appendChild(div_element);
            calculatePrice();
        } else {
            // Check if the item quantity has reached the maximum limit of 99
            if (data.ticket_node_history[node_id] == 99) {
                return;
            } else {
                // Increment the quantity of the current item in the data object 
                data.ticket_node_history[node_id] += 1;

                var total_price = parseFloat(merch_price.split('$').join('')) * data.ticket_node_history[node_id];
                console.log(`${merch_price.split('$').join('')} * ${data.ticket_node_history[node_id]} = ${total_price}`);

                // Update the server with the new cart data
                fetch('/update_vars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('nums-value').innerText = data.num_cart_items;
                        document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;
                    })
                    .catch(error => console.error('Error updating num:', error));

                // Update the displayed quantity of the current item
                document.getElementById(node_id).innerText = data.ticket_node_history[node_id];
                document.getElementById(`total-price-item-${node_id}`).innerText = 'Item(s) Total: $' + total_price.toFixed(2);
                calculatePrice();
            }
        }
        console.log(data.ticket_node_history);
    }).catch(error => console.error('Error fetching vars:', error)); // Log any errors during data fetching
}

/**
 * Removes all items from the cart.
 *
 * This function fetches the current variables from the server, removes all cart items
 * from the UI, clears the cart data, updates the server with the new empty cart data,
 * and updates the UI to reflect the empty cart.
 */
function removeCartItems() {
    // Fetch variables from the server
    fetchVars().then(data => {
        // Get all elements with the class 'cart-item'
        var cart_element = document.getElementsByClassName('cart-item');

        // Remove each cart item element from the UI
        while (cart_element.length > 0) {
            cart_element[0].remove();
        }

        // Clear the cart data
        data.current_node_history = {};
        data.ticket_node_history = {};

        // Update the server with the new empty cart data
        fetch('/update_vars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticket_node_history: data.ticket_node_history, current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
        })
            .then(response => response.json())
            .then(data => {
                // Update the UI with the new number of items in the cart
                document.getElementById('nums-value').innerText = data.num_cart_items;
                document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
                calculatePrice('remove items');
            })
            .catch(error => console.error('Error updating num:', error)); // Log any errors during the update process
    }).catch(error => console.error('Error fetching vars:', error)); // Log any errors during data fetching
}


/**
 * loads all current cart items (if any) when the window loads
 */
window.addEventListener('load', function () {
    // Fetch variables from the server when the window loads
    fetchVars().then(data => {
        // Update the UI with the number of items in the cart
        try {
            document.getElementById('nums-value').innerText = data.num_cart_items;
            document.getElementById('cart-message').innerText = `You have (${data.num_cart_items}) Items in your cart.`;
        } catch (error) {
            console.error('this is a "good" error!', error);
        }

        // Loop through each item in the cart and create UI elements for them
        for (var i = 0; i < Object.keys(data.current_node_history).length; i++) {
            // Create elements for the cart item
            var div_element = document.createElement('div'); // this div contains the entire general cart item 
            var button_div = document.createElement('div'); // this div contains the buttons 
            var add_button = document.createElement('button'); // this button adds the item to the cart
            var item_count = document.createElement('p'); // this p contains the number of items in the cart
            var decrement_button = document.createElement('button'); // this button removes the item from the cart
            var item_image = document.createElement('img'); // this img contains the image of the item
            var item_description = document.createElement('p'); // this p contains the description of the item
            var div_element2 = document.createElement('div'); // this div contains the item description and the buttons
            var total_price_element = document.createElement('p'); // this p contains the total price of the item

            // Get the current node and its details
            var current_node = document.getElementById(Object.keys(data.current_node_history)[i]);
            var img_source = current_node.dataset.img_src;
            var merch_item = current_node.dataset.merch_item;
            var merch_price = current_node.dataset.merch_price;
            var node_id = current_node.id;

            console.log(`node_id = ${node_id}`)
            console.log(`merch_price = ${merch_price}`)
            var total_price = parseFloat(merch_price.split('$').join('')) * data.current_node_history[node_id];
            console.log(`${merch_price.split('$').join('')} * ${data.current_node_history[node_id]} = ${total_price}`);

            // Set attributes and inner text for the new cart item elements
            div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            add_button.setAttribute('onclick', 'increment(this)');
            add_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            add_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_count.setAttribute('class', 'cart-item-count w-[40px] text-center');
            item_count.setAttribute('id', node_id);
            item_count.setAttribute('data-price', merch_price.split('$').join(''));
            decrement_button.setAttribute('onclick', 'decrement(this)');
            decrement_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            decrement_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_image.setAttribute('class', 'h-20 w-20 mr-2 bg-white rounded-xl');
            item_image.setAttribute('src', img_source);
            total_price_element.setAttribute('id', `total-price-item-${node_id}`);

            item_description.classList.add('font-semibold');

            add_button.innerText = '+';
            item_count.innerText = data.current_node_history[node_id];
            decrement_button.innerText = '-';
            total_price_element.innerText = 'Item(s) Total: $' + (parseFloat(merch_price.split('$').join('')) * data.current_node_history[node_id]).toFixed(2);

            // Append the new elements to the cart item div
            button_div.appendChild(add_button);
            button_div.appendChild(item_count);
            button_div.appendChild(decrement_button);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(total_price_element);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('cart-items').appendChild(div_element);
            calculatePrice();
        }
        for (var i = 0; i < Object.keys(data.ticket_node_history).length; i++) {
            // Create elements for the new cart item
            var div_element = document.createElement('div'); // this div contains the entire general cart item 
            var button_div = document.createElement('div'); // this div contains the buttons 
            var add_button = document.createElement('button'); // this button adds the item to the cart
            var item_count = document.createElement('p'); // this p contains the number of items in the cart
            var decrement_button = document.createElement('button'); // this button removes the item from the cart
            var item_image = document.createElement('img'); // this img contains the image of the item
            var item_description = document.createElement('p'); // this p contains the description of the item
            var div_element2 = document.createElement('div'); // this div contains the item description and the buttons
            var total_price_element = document.createElement('p'); // this p contains the total price of the item

            // Get the current node and its details
            var current_node = document.getElementById(Object.keys(data.ticket_node_history)[i]);
            var img_source = '../static/img/swag/ticket.png'
            var venue = current_node.dataset.venue;
            var city = current_node.dataset.city;
            var date = current_node.dataset.date;
            var merch_price = current_node.dataset.merch_price;
            var merch_item = `Ticket - ${city}`;
            var node_id = current_node.id;

            var total_price = parseFloat(merch_price.split('$').join('')) * data.current_node_history[node_id];
            console.log(`${merch_price.split('$').join('')} * ${data.current_node_history[node_id]} = ${total_price}`);

            // Set attributes and inner text for the new cart item elements
            div_element.setAttribute('class', 'cart-item flex mb-2 mt-2');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            add_button.setAttribute('onclick', 'ticketIncrement(this)');
            add_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            add_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_count.setAttribute('class', 'cart-item-count w-[40px] text-center');
            item_count.setAttribute('id', node_id);
            item_count.setAttribute('data-price', merch_price.split('$').join(''));
            decrement_button.setAttribute('onclick', 'ticketDecrement(this)');
            decrement_button.setAttribute('class', 'cart-button h-[32px] w-[32px] flex justify-center items-center font-semibold bg-purple-500 hover:bg-purple-700 transition-all duration-200 rounded-lg');
            decrement_button.setAttribute('data-price', merch_price.split('$').join(''));
            item_image.setAttribute('class', 'h-20 w-20 mr-2 bg-white rounded-xl');
            item_image.setAttribute('src', img_source);
            total_price_element.setAttribute('id', `total-price-item-${node_id}`);

            item_description.classList.add('font-semibold');

            add_button.innerText = '+';
            item_count.innerText = data.ticket_node_history[node_id];
            decrement_button.innerText = '-';
            total_price_element.innerText = 'Item(s) Total: $' + (parseFloat(merch_price.split('$').join('')) * data.ticket_node_history[node_id]).toFixed(2);

            // Append the new elements to the cart item div
            button_div.appendChild(add_button);
            button_div.appendChild(item_count);
            button_div.appendChild(decrement_button);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(total_price_element);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('cart-items').appendChild(div_element);
            calculatePrice();
        }
    }).catch(error => console.error('Error displaying num on load:', error)); // Log any errors during data fetching
});

function calculatePrice(calculation_type) {
    fetchVars().then(data => {
        var totals = [];

        for (var i = 0; i < Object.keys(data.current_node_history).length; i++) {
            var current_node = document.getElementById(Object.keys(data.current_node_history)[i]);
            // console.log(current_node)
            var merch_price = current_node.dataset.price;
            var node_id = current_node.id;
            var total_price = parseFloat(merch_price) * data.current_node_history[node_id];
            totals.push(total_price);
        }
        for (var i = 0; i < Object.keys(data.ticket_node_history).length; i++) {
            var current_node = document.getElementById(Object.keys(data.ticket_node_history)[i]);
            var merch_price = current_node.dataset.price;
            var node_id = current_node.id;
            var total_price = parseFloat(merch_price) * data.ticket_node_history[node_id];
            totals.push(total_price);
        }

        var total_price = 0;
        for (var i = 0; i < totals.length; i++) {
            console.log(totals[i])
            total_price += totals[i];
        }
        if (calculation_type == 'checkout') {
            document.getElementById('total-price-cart').innerText = `$${total_price.toFixed(2)}`;
            document.getElementById('tax').innerText = `$${(total_price * 0.045).toFixed(2)}`;
            document.getElementById('total-price').innerText = `$${(total_price * 1.045).toFixed(2)}`;
        } else if (calculation_type == 'remove items') {
            document.getElementById('total-price-cart').innerText = 'Total Price: $0.00';
        } else {
            document.getElementById('total-price-cart').innerText = 'Total Price: $' + total_price.toFixed(2);
        }
    })
}