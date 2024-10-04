let total = 0; // Initialize total variable

// Load subscriptions from localStorage on page load
document.addEventListener('DOMContentLoaded', loadSubscriptions);

document.getElementById('subscription-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const subscriptionInput = document.getElementById('subscription-input');
    const subscriptionPrice = document.getElementById('subscription-price');
    const subscriptionName = subscriptionInput.value;
    const price = parseFloat(subscriptionPrice.value);

    addSubscription(subscriptionName, price);
    subscriptionInput.value = ''; // Clear the input
    subscriptionPrice.value = ''; // Clear the price input
});

function addSubscription(name, price) {
    const list = document.getElementById('subscription-list');
    const li = document.createElement('li');

    li.innerHTML = `${name} - $${price.toFixed(2)}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = function() {
        editSubscription(li, name, price);
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = function() {
        removeSubscription(li, price);
    };

    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);

    updateTotal(price); // Update total when adding a subscription
    saveSubscriptions(); // Save subscriptions to localStorage
}

function removeSubscription(li, price) {
    const list = document.getElementById('subscription-list');
    list.removeChild(li);
    updateTotal(-price); // Subtract price when removing a subscription
    saveSubscriptions(); // Save subscriptions to localStorage
}

function editSubscription(li, name, price) {
    const subscriptionInput = document.getElementById('subscription-input');
    const subscriptionPrice = document.getElementById('subscription-price');

    // Populate the inputs with current values
    subscriptionInput.value = name;
    subscriptionPrice.value = price;

    // Remove the item from the list to avoid duplicates
    removeSubscription(li, price);
}

function updateTotal(amount) {
    total += amount; // Update total with the amount added or subtracted
    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`; // Update total display
}

function saveSubscriptions() {
    const subscriptions = [];
    const listItems = document.querySelectorAll('#subscription-list li');

    listItems.forEach(item => {
        const text = item.innerText.split(' - $');
        subscriptions.push({
            name: text[0],
            price: parseFloat(text[1])
        });
    });

    localStorage.setItem('subscriptions', JSON.stringify(subscriptions)); // Save to localStorage
}

function loadSubscriptions() {
    const storedSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];

    storedSubscriptions.forEach(sub => {
        addSubscription(sub.name, sub.price);
    });
}
