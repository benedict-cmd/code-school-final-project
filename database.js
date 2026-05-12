const dateInput = document.getElementById('input-date');
const descriptionInput = document.getElementById('input-description');
const categoryInput = document.getElementById('input-category');
const reasonInput = document.getElementById('input-reason');
const amountInput = document.getElementById('input-amount');
const addButton = document.getElementById('add-to');

const datesDiv = document.getElementById('dates');
const descriptionsDiv = document.getElementById('add-description');
const categoriesDiv = document.getElementById('add-category');
const reasonsDiv = document.getElementById('add-reason');
const amountsDiv = document.getElementById('total-amount');
const dash2Div = document.querySelector('.dash2');

// empty array
let entries = JSON.parse(localStorage.getItem('expenseEntries')) || [];
let currentFilter = "All";

function displayEntries() {
    dash2Div.innerHTML = '';

    // Filter entries based on current filter
    const filteredEntries = currentFilter === "All" ? entries : entries.filter(entry => entry.category === currentFilter);

    filteredEntries.forEach((entry) => {
        const originalIndex = entries.indexOf(entry);
        dash2Div.innerHTML +=
            '<div class="date">' + entry.date + '</div>' +
            '<div>' + entry.description + '</div>' +
            '<div>' + entry.category + '</div>' +
            '<div>' + entry.reason + '</div>' +
            '<div>' + entry.amount + ' <button class="del" data-index="' + originalIndex + '"><img class="img" src="delete.png" alt=""></button></div>' +
            '<div style="grid-column: 1 / -1; width: 100%;"><hr style="border-color: #9b8649; margin: 8px 0;"></div>';
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.del').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteEntry(index);
        });
    });

    // Update container statistics
    updateContainerStats();
}

// Function to update container statistics
function updateContainerStats() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const totalSpent = entries.reduce((sum, entry) => sum + entry.amount, 0);
    document.getElementById('inp-money').innerHTML = totalSpent.toFixed(2);

    const avgPerExpense = entries.length > 0 ? (totalSpent / entries.length).toFixed(2) : 0;
    document.getElementById('avg-records').innerHTML = avgPerExpense;

    // Find top category
    const categoryTotals = {};
    entries.forEach(entry => {
        if (categoryTotals[entry.category]) {
            categoryTotals[entry.category] += entry.amount;
        } else {
            categoryTotals[entry.category] = entry.amount;
        }
    });

    let topCategory = 'None';
    let topAmount = 0;
    for (let category in categoryTotals) {
        if (categoryTotals[category] > topAmount) {
            topAmount = categoryTotals[category];
            topCategory = category;
        }
    }
    document.getElementById('cat-reason').innerHTML = topCategory;
    document.getElementById('cat-total').innerHTML = topAmount.toFixed(2);

    // Calculate total for this month
    let monthlyTotal = 0;
    entries.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
            monthlyTotal += entry.amount;
        }
    });
    document.getElementById('total-monthly').innerHTML = monthlyTotal.toFixed(2);
}

// Function to add a new entry
function addEntry() {
    // Get values from inputs
    const date = dateInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;
    const reason = reasonInput.value;
    const amount = amountInput.value;

    if (!date || !description || !category || !reason || !amount) {
        alert('Please fill in all fields!');
        return;
    }

    // Create a new entry object
    const newEntry = {
        date: date,
        description: description,
        category: category,
        reason: reason,
        amount: parseFloat(amount)
    };

    // Add to entries array
    entries.push(newEntry);

    // Save to localStorage
    localStorage.setItem('expenseEntries', JSON.stringify(entries));

    // Clear the input fields
    dateInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
    reasonInput.value = '';
    amountInput.value = '';

    // Refresh the display
    displayEntries();
    updateContainerStats();
}

// Function to delete an entry
function deleteEntry(index) {
    // Remove the entry from the array
    entries.splice(index, 1);

    // Save the updated array to localStorage
    localStorage.setItem('expenseEntries', JSON.stringify(entries));

    // Refresh the display
    displayEntries();
    updateContainerStats();
}

// Add event listener to the add button
addButton.addEventListener('click', addEntry);

// evenlistener
document.getElementById('opt-all').addEventListener('click', () => { currentFilter = "All"; displayEntries(); });
document.getElementById('opt-food').addEventListener('click', () => { currentFilter = "Food"; displayEntries(); });
document.getElementById('opt-trnsport').addEventListener('click', () => { currentFilter = "Transport"; displayEntries(); });
document.getElementById('opt-housing').addEventListener('click', () => { currentFilter = "Housing"; displayEntries(); });
document.getElementById('opt-health').addEventListener('click', () => { currentFilter = "Health"; displayEntries(); });
document.getElementById('opt-entertainment').addEventListener('click', () => { currentFilter = "Entertainment"; displayEntries(); });
document.getElementById('opt-utility').addEventListener('click', () => { currentFilter = "Utilities"; displayEntries(); });
document.getElementById('opt-education').addEventListener('click', () => { currentFilter = "Education"; displayEntries(); });
document.getElementById('opt-other').addEventListener('click', () => { currentFilter = "Other"; displayEntries(); });

// Display 
displayEntries();

const now = new Date();

const currentDate = now.toLocaleDateString(undefined, {
   weekday: "long",
   year: "numeric",
   month: "long",
//    day: "numeric"
});

document.getElementById("date").innerHTML = currentDate;
