const itemform = document.getElementById('item-form');
const iteminput = document.getElementById('item-input');
const itemlist = document.getElementById('item-list');

function addItem(e) {
    e.preventDefault();

    newitem = iteminput.value;
    // Validate input
    if (newitem === '') {
        alert('Please enter an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newitem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemlist.appendChild(li);
    itemlist.value = '';
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    icon = createItem('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createItem(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Event Listeners
itemform.addEventListener('submit', addItem);
    
