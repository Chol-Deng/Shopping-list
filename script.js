const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Display items from local storage
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => {
        addItemToDOM(item);
    });
}

// Load all event listeners
function onAddItemSubmit(e) {
    e.preventDefault();

    newitem = itemInput.value;
    // Validate input
    if (newitem === '') {
        alert('Please enter an item');
        return;
    }
    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        // Update item
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    } else { 
        if (checkIfItemExists(newitem)) {
            alert('Item already exists');
            return;
        }
    }

    // Create item DOM element
    addItemToDOM(newitem);

    // Add item to local storage
    addItemToStorage(newitem);

    checkUI();

    itemList.value = '';
}

// Add item to DOM
function addItemToDOM(item) {
     // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add item to DOM
    itemList.appendChild(li);
}

// Create button
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    icon = createItem('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// Create item
function createItem(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// Add item to local storage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new items to the array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Get items from local storage
function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Click on item
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

// Check if item exists
function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

// Set item to edit
function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = "<i class='fa-solid fa-pen' ></i> Update Item";
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

// Remove item
function removeItem(item) {
  // items from DOM
    if (confirm('Are you sure?')) {
        item.remove();
        // Remove from local storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

// Remove item from local storage
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    // filter out the item that's being removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    // re-set local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    // Clear from local storage
    localStorage.removeItem('items');

    checkUI();
}

// Filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            console.log(false);
            item.style.display = 'none';
        }
    });
}
// Check UI
function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = "<i class='fa-solid fa-plus' ></i> Add Item";
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}

// Initialize app
function init(){
// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);


checkUI();
}

init();