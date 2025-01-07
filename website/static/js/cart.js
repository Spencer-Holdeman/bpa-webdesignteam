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
current_node_history = {};
var num_cart_items = () => {
    var var_value = 0;
    for (var i = 0; i < Object.keys(current_node_history).length; i++) {
        var_value += current_node_history[Object.keys(current_node_history)[i]];
    }
    return var_value;
};
function increment(current_node) {
    var node_id = current_node.nextElementSibling.id;
    current_node_history[node_id] += 1;
    document.getElementById(node_id).innerText = current_node_history[node_id];
    document.getElementById('nums-value').innerText = num_cart_items();
    document.getElementById('cart-message').innerText = `you have ${num_cart_items()} items in your cart`;
}

function decrement(current_node) {
    var node_id = current_node.previousElementSibling.id;
    current_node_history[node_id] -= 1;
    if (current_node_history[node_id] == 0) {
        var parent_element = current_node.parentElement.parentElement;
        delete current_node_history[node_id];
        parent_element.remove();
    }
    document.getElementById('nums-value').innerText = num_cart_items();
    document.getElementById('cart-message').innerText = `you have ${num_cart_items()} items in your cart`;
}


first_cart_item = -1;
function incrementCartItems(current_node) {
    var div_element = document.createElement('div'); // this div contains the entire general cart item 
    var button_div = document.createElement('div'); // this div contains the buttons 
    var add_button = document.createElement('button'); // this button adds the item to the cart
    var item_count = document.createElement('p'); // this p contains the number of items in the cart
    var remove_button = document.createElement('button'); // this button removes the item from the cart
    var merch_item = current_node.previousElementSibling.previousElementSibling.innerText;
    var merch_price = current_node.previousElementSibling.innerText;
    var node_id = current_node.id;

    if (!(node_id in current_node_history)) {
        current_node_history[node_id] = 1;
        console.log(current_node_history);

        if (first_cart_item < 1) {
            first_cart_item = 1;
            openShoppingBag();
        }
    
        div_element.setAttribute('class', 'cart-item');
        button_div.setAttribute('class', 'cart-item-buttons');
        button_div.setAttribute('style', 'display: flex; align-items: center;');
        add_button.setAttribute('onclick', 'increment(this)');
        add_button.setAttribute('class', 'cart-button');
        item_count.setAttribute('class', 'cart-item-count');
        item_count.setAttribute('id', node_id)
        remove_button.setAttribute('onclick', 'decrement(this)');
        remove_button.setAttribute('class', 'cart-button');
    
        add_button.innerText = '+';
        item_count.innerText = current_node_history[node_id]
        remove_button.innerText = '-';
    
        button_div.appendChild(add_button);
        button_div.appendChild(item_count);
        button_div.appendChild(remove_button);
    
        div_element.innerText = merch_item + ' - ' + merch_price;
        document.getElementById('nums-value').innerText = num_cart_items();
        document.getElementById('cart-message').innerText = `you have ${num_cart_items()} items in your cart`;
        div_element.appendChild(button_div);
        document.getElementById('cart-items').appendChild(div_element);
    
    } else {
        current_node_history[node_id] += 1;
        console.log(current_node_history[node_id]);
        document.getElementById(node_id).innerText = current_node_history[node_id];
        document.getElementById('nums-value').innerText = num_cart_items();
        document.getElementById('cart-message').innerText = `you have ${num_cart_items()} items in your cart`;
    }
    // data = {
    //     num_cart_items: num_cart_items(),
    //     // first_cart_item: first_cart_item,
    //     current_node_history: current_node_history
    // };
    // console.log(data);
}

function removeCartItems() {
    var cart_element = document.getElementsByClassName('cart-item');
    while (cart_element.length > 0) {
        cart_element[0].remove();
    }
    current_node_history = {};
    document.getElementById('nums-value').innerText = num_cart_items();
    document.getElementById('cart-message').innerText = `you have ${num_cart_items()} items in your cart`;
}

function sendData() {
    fetch('/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(current_node_history),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
}