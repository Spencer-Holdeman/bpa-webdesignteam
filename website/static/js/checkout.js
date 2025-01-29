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

            item_count.innerText = `Item count: ${data.ticket_node_history[node_id]}`;

            // Append the new elements to the cart item div
            button_div.appendChild(item_count);

            item_description.innerText = merch_item;
            div_element.appendChild(item_image);
            div_element2.appendChild(item_description);
            div_element2.appendChild(button_div);
            div_element.appendChild(div_element2);
            document.getElementById('const-cart').appendChild(div_element);
        }
        calculatePrice(true);
    });
}

// Landon
function moveOn() {
    const body = document.getElementsByTagName('body')[0];
    const fullCart = document.getElementById('fullCart');
    const info = document.getElementById('checkoutInfo');
    const summary = document.getElementById('checkoutSummary');
    body.classList.remove('overflow-y-hidden')
    fullCart.style.animation = "slideUpCheckout 500ms forwards ease-in-out";
    setTimeout(() => {
        if (document.documentElement.clientWidth > 1024) {
            summary.parentElement.style.opacity = '1';
        }
        else {
            summary.parentElement.classList.add('hidden');
        }
        fullCart.classList.toggle('hidden');
        info.style.width = '110%';
        info.children[0].classList.toggle('hidden');
        summary.classList.toggle('hidden');
        document.getElementById('total-price-cart').removeAttribute('id');
        constCart()
    }, 600);
    setTimeout(() => {
        info.children[0].style = 'opacity: 1;';
        summary.style = 'opacity: 1;';
    }, 1200);
}

function shipToBill() {
    const shipping = document.getElementById('shipping');
    const billing = document.getElementById('billing');
    billing.children[2].children[0].value = shipping.children[1].children[0].value;
    billing.children[2].children[1].value = shipping.children[1].children[1].value;
    billing.children[3].value = shipping.children[2].value;
    billing.children[4].value = shipping.children[3].value;
    billing.children[5].value = shipping.children[4].value;
    billing.children[6].children[0].value = shipping.children[5].children[0].value;
    billing.children[6].children[1].value = shipping.children[5].children[1].value;
    billing.children[7].value = shipping.children[6].value;
}

function openMobileCart() {
    const info = document.getElementById('checkoutInfo');
    const checkoutCart = document.getElementById('checkoutSummary').parentElement;
    info.classList.add('hidden');
    checkoutCart.classList.remove('hidden');
    setTimeout(() => {
        checkoutCart.style = 'opacity: 1;';
    }, 100);
}
function closeMobileCart() {
    const info = document.getElementById('checkoutInfo');
    const checkoutCart = document.getElementById('checkoutSummary').parentElement;
    info.classList.remove('hidden');
    checkoutCart.style = 'opacity: 0;';
    setTimeout(() => {
        checkoutCart.classList.add('hidden');
    }, 100);
}