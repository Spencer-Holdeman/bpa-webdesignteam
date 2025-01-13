// ----------------- Shopping Bag -----------------
const shoppingBag = document.getElementById("shopping-bag");
const cartBlur = document.getElementById("cart-blur");
function openShoppingBag() {
    shoppingBag.classList.toggle("hidden");
    cartBlur.classList.toggle("hidden");
    shoppingBag.style.animation = "openCart 0.3s alternate infinite ease-in-out";
    setTimeout(() => {
        shoppingBag.style.animationPlayState = "paused";
    }, 300);
}
function closeShoppingBag() {
    shoppingBag.style.animationPlayState = "running";
    setTimeout(() => {
        shoppingBag.classList.toggle("hidden");
        cartBlur.classList.toggle("hidden");
    }, 300);
}

// Spencer
async function fetchVars() {
    try {
        const response = await fetch('get_vars');
        const data = await response.json();
        return data;
    } catch (error) {
        return console.error('Error fetching vars:', error);
    }
}

function increment(current_node) {
    var node_id = current_node.nextElementSibling.id;
    fetchVars().then(data => {
        if (data.current_node_history[node_id] == 99) {
            return;
        } else {
            data.current_node_history[node_id] += 1;

            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
                })
                .catch(error => console.error('Error updating num:', error));
            // end fetch

            document.getElementById(node_id).innerText = data.current_node_history[node_id];
        }
    }).catch(error => console.error('Error fetching vars:', error));
}

function decrement(current_node) {
    fetchVars().then(data => {
        var node_id = current_node.previousElementSibling.id;
        data.current_node_history[node_id] -= 1;

        fetch('/update_vars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('nums-value').innerText = data.num_cart_items;
                document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
            })
            .catch(error => console.error('Error updating num:', error));
        // end fetch

        if (data.current_node_history[node_id] == 0) {
            var parent_element = current_node.parentElement.parentElement;
            delete data.current_node_history[node_id];

            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
                })
                .catch(error => console.error('Error updating num:', error));
            // end fetch

            parent_element.remove();
        } else {
            document.getElementById(node_id).innerText = data.current_node_history[node_id];
        }
    }).catch(error => console.error('Error fetching vars:', error));
}

function incrementCartItems(current_node) {
    var div_element = document.createElement('div'); // this div contains the entire general cart item 
    var button_div = document.createElement('div'); // this div contains the buttons 
    var add_button = document.createElement('button'); // this button adds the item to the cart
    var item_count = document.createElement('p'); // this p contains the number of items in the cart
    var remove_button = document.createElement('button'); // this button removes the item from the cart
    var merch_item = current_node.previousElementSibling.previousElementSibling.innerText;
    var merch_price = current_node.previousElementSibling.innerText;
    var node_id = current_node.id;
    fetchVars().then(data => {
        if (!(node_id in data.current_node_history)) {
            data.current_node_history[node_id] = 1;
            console.log(data.current_node_history);

            if (data.first_cart_item < 1) {
                openShoppingBag();
                data.first_cart_item = 1;
                fetch('/update_vars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.first_cart_item);
                    })
                    .catch(error => console.error('Error updating num:', error));
            }

            // Update the num in Python
            fetch('/update_vars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('nums-value').innerText = data.num_cart_items;
                    document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
                })
                .catch(error => console.error('Error updating num:', error));
            // end fetch

            div_element.setAttribute('class', 'cart-item');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            add_button.setAttribute('onclick', 'increment(this)');
            add_button.setAttribute('class', 'cart-button');
            item_count.setAttribute('class', 'cart-item-count');
            item_count.setAttribute('id', node_id);
            remove_button.setAttribute('onclick', 'decrement(this)');
            remove_button.setAttribute('class', 'cart-button');

            add_button.innerText = '+';
            item_count.innerText = data.current_node_history[node_id]
            remove_button.innerText = '-';

            button_div.appendChild(add_button);
            button_div.appendChild(item_count);
            button_div.appendChild(remove_button);

            div_element.innerText = merch_item + ' - ' + merch_price;
            div_element.appendChild(button_div);
            document.getElementById('cart-items').appendChild(div_element);
        } else {
            if (data.current_node_history[node_id] == 99) {
                return;
            } else {
                data.current_node_history[node_id] += 1;

                // Update the num in Python
                fetch('/update_vars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('nums-value').innerText = data.num_cart_items;
                        document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
                    })
                    .catch(error => console.error('Error updating num:', error));
                // end fetch

                console.log(data.current_node_history[node_id]);
                document.getElementById(node_id).innerText = data.current_node_history[node_id];
            }
        }


        console.log(data);
    }).catch(error => console.error('Error fetching vars:', error));
}

function removeCartItems() {
    fetchVars().then(data => {
        var cart_element = document.getElementsByClassName('cart-item');
        while (cart_element.length > 0) {
            cart_element[0].remove();
        }
        data.current_node_history = {};

        fetch('/update_vars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ current_node_history: data.current_node_history, first_cart_item: data.first_cart_item, num_cart_items: data.num_cart_items }),  // Send the updated num value
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('nums-value').innerText = data.num_cart_items;
                document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
            })
            .catch(error => console.error('Error updating num:', error));
        // end fetch
    })
}

window.onload = function () {
    fetchVars().then(data => {
        document.getElementById('nums-value').innerText = data.num_cart_items;
        document.getElementById('cart-message').innerText = `you have ${data.num_cart_items} items in your cart`;
        for (var i = 0; i < Object.keys(data.current_node_history).length; i++) {
            var div_element = document.createElement('div'); // this div contains the entire general cart item 
            var button_div = document.createElement('div'); // this div contains the buttons 
            var add_button = document.createElement('button'); // this button adds the item to the cart
            var item_count = document.createElement('p'); // this p contains the number of items in the cart
            var remove_button = document.createElement('button'); // this button removes the item from the cart
            console.log(`data.current_node_history = ${data.current_node_history}`);
            var current_node = document.getElementById(Object.keys(data.current_node_history)[i]);
            console.log(`current_node = ${current_node}`);
            var merch_item = current_node.previousElementSibling.previousElementSibling.innerText;
            var merch_price = current_node.previousElementSibling.innerText;
            var node_id = current_node.id;

            div_element.setAttribute('class', 'cart-item');
            button_div.setAttribute('class', 'cart-item-buttons');
            button_div.setAttribute('style', 'display: flex; align-items: center;');
            add_button.setAttribute('onclick', 'increment(this)');
            add_button.setAttribute('class', 'cart-button');
            item_count.setAttribute('class', 'cart-item-count');
            item_count.setAttribute('id', node_id);
            remove_button.setAttribute('onclick', 'decrement(this)');
            remove_button.setAttribute('class', 'cart-button');

            add_button.innerText = '+';
            item_count.innerText = data.current_node_history[node_id]
            remove_button.innerText = '-';

            button_div.appendChild(add_button);
            button_div.appendChild(item_count);
            button_div.appendChild(remove_button);

            div_element.innerText = merch_item + ' - ' + merch_price;
            div_element.appendChild(button_div);
            document.getElementById('cart-items').appendChild(div_element);
        }
    }).catch(error => console.error('Error displaying num on load:', error));
}