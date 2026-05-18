const dateInput = document.getElementById('input-date');
const descriptionInput = document.getElementById('input-description');
const categoryInput = document.getElementById('input-category');
const reasonInput = document.getElementById('input-reason');
const amountInput = document.getElementById('input-amount');
const addButton = document.getElementById('add-to');

const dash2Div = document.querySelector('.dash2');
const currentDateHeader = document.querySelector('.first-date');

let entries = [];
let currentFilter = 'All';

const API_BASE = 'http://localhost:3000/api';
const LOCAL_STORAGE_KEY = 'expenseEntries';
const LOGGED_IN_KEY = 'loggedIn';

function saveEntriesToLocal() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
}

function ensureAuthenticated() {
    const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === 'true';
    if (!isLoggedIn) {
        window.location.href = 'sign.html';
    }
}

function logoutUser() {
    console.log('logoutUser called');
    localStorage.setItem(LOGGED_IN_KEY, 'false');
    localStorage.removeItem(LOGGED_IN_KEY);
    window.location.replace('sign.html');
}

window.logoutUser = logoutUser;

function normalizeEntry(entry) {
    return {
        id: Number(entry.id) || Date.now(),
        date: entry.date || '',
        description: entry.description || '',
        category: entry.category || 'Other',
        reason: entry.reason || '',
        amount: Number(entry.amount) || 0
    };
}

function loadEntriesFromLocal() {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    return stored.map(normalizeEntry);
}

async function fetchEntries() {
    try {
        const response = await fetch(`${API_BASE}/expenses`);
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const rawEntries = await response.json();
        entries = rawEntries.map(normalizeEntry);
        saveEntriesToLocal();
    } catch (error) {
        console.error('Error fetching entries, using local storage fallback:', error);
        entries = loadEntriesFromLocal();
    }
}

function displayEntries() {
    dash2Div.innerHTML = '';

    const filteredEntries = currentFilter === 'All'
        ? entries
        : entries.filter(entry => entry.category === currentFilter);

    filteredEntries.forEach(entry => {
        dash2Div.innerHTML +=
            `<div class="date">${entry.date}</div>` +
            `<div>${entry.description}</div>` +
            `<div>${entry.category}</div>` +
            `<div>${entry.reason}</div>` +
            `<div>${entry.amount.toFixed(2)} <button class="del" data-index="${entry.id}"><img class="img" src="delete.png" alt="delete"></button></div>` +
            `<div style="grid-column: 1 / -1; width: 100%;"><hr style="border-color: #9b8649; margin: 8px 0;"></div>`;
    });

    document.querySelectorAll('.del').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-index');
            deleteEntry(id);
        });
    });

    updateContainerStats();
}

function updateContainerStats() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const totalSpent = entries.reduce((sum, entry) => sum + entry.amount, 0);
    document.getElementById('inp-money').innerHTML = totalSpent.toFixed(2);

    const avgPerExpense = entries.length > 0 ? (totalSpent / entries.length).toFixed(2) : '0.00';
    document.getElementById('avg-records').innerHTML = avgPerExpense;

    const categoryTotals = {};
    entries.forEach(entry => {
        categoryTotals[entry.category] = (categoryTotals[entry.category] || 0) + entry.amount;
    });

    let topCategory = 'None';
    let topAmount = 0;
    Object.entries(categoryTotals).forEach(([category, total]) => {
        if (total > topAmount) {
            topAmount = total;
            topCategory = category;
        }
    });

    document.getElementById('cat-reason').innerHTML = topCategory;
    document.getElementById('cat-total').innerHTML = topAmount.toFixed(2);

    const monthlyTotal = entries.reduce((sum, entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
            ? sum + entry.amount
            : sum;
    }, 0);

    document.getElementById('total-monthly').innerHTML = monthlyTotal.toFixed(2);
}

async function addEntry() {
    const date = dateInput.value.trim();
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;
    const reason = reasonInput.value.trim();
    const amountValue = parseFloat(amountInput.value);

    if (!date || !description || !category || !reason || !amountInput.value) {
        alert('Please fill in all fields!');
        return;
    }

    if (isNaN(amountValue) || amountValue <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return;
    }

    const newEntry = {
        id: Date.now(),
        date,
        description,
        category,
        reason,
        amount: amountValue
    };

    try {
        const response = await fetch(`${API_BASE}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        });

        if (!response.ok) {
            throw new Error('Failed to add expense to server');
        }

        dateInput.value = '';
        descriptionInput.value = '';
        categoryInput.value = '';
        reasonInput.value = '';
        amountInput.value = '';

        await fetchEntries();
        displayEntries();
        alert('Expense added successfully!');
    } catch (error) {
        console.error('Error adding entry, saving locally:', error);
        entries.push(newEntry);
        saveEntriesToLocal();
        displayEntries();
        alert('Expense added successfully!.');
    }
}

async function deleteEntry(id) {
    const entryId = Number(id);

    try {
        const response = await fetch(`${API_BASE}/expenses/${entryId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete expense from server');
        }

        await fetchEntries();
        displayEntries();
        alert('Expense deleted successfully!');
    } catch (error) {
        console.error('Error deleting entry, deleting locally if present:', error);
        entries = entries.filter(entry => entry.id !== entryId);
        saveEntriesToLocal();
        displayEntries();
        alert('Expense deleted locally. If the server is unavailable, this change is saved in local storage.');
    }
}

addButton.addEventListener('click', addEntry);

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
}

document.getElementById('opt-all').addEventListener('click', () => { currentFilter = 'All'; displayEntries(); });
document.getElementById('opt-food').addEventListener('click', () => { currentFilter = 'Food'; displayEntries(); });
document.getElementById('opt-trnsport').addEventListener('click', () => { currentFilter = 'Transport'; displayEntries(); });
document.getElementById('opt-housing').addEventListener('click', () => { currentFilter = 'Housing'; displayEntries(); });
document.getElementById('opt-health').addEventListener('click', () => { currentFilter = 'Health'; displayEntries(); });
document.getElementById('opt-entertainment').addEventListener('click', () => { currentFilter = 'Entertainment'; displayEntries(); });
document.getElementById('opt-utility').addEventListener('click', () => { currentFilter = 'Utilities'; displayEntries(); });
document.getElementById('opt-education').addEventListener('click', () => { currentFilter = 'Education'; displayEntries(); });
document.getElementById('opt-other').addEventListener('click', () => { currentFilter = 'Other'; displayEntries(); });

ensureAuthenticated();
fetchEntries().then(displayEntries);
        //   dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesssssssssss
const now = new Date();
const currentDate = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long'
});

if (currentDateHeader) {
    currentDateHeader.innerHTML = currentDate;
}
