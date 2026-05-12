// getting the add button
let addBtn = document.querySelector(".btn3");

// getting all inputs
let inputDate = document.getElementById("input-date");
let inputDescription = document.getElementById("input-description");
let inputCategory = document.getElementById("input-category");
let inputReason = document.getElementById("input-reason");
let inputAmount = document.getElementById("input-amount");

// dashboard areas
let dates = document.getElementById("dates");
let descriptions = document.getElementById("add-description");
let categories = document.getElementById("add-category");
let reasons = document.getElementById("add-reason");
let amounts = document.getElementById("total-amount");

// top cards
let totalMoney = document.getElementById("inp-money");
let totalRecords = document.getElementById("records");
let averageExpense = document.getElementById("avg-records");
let monthlyTotal = document.getElementById("total-monthly");
let topCategory = document.getElementById("cat-reason");
let topCategoryTotal = document.getElementById("cat-total");

// array to store all expenses
let expenses = [];

// when add button is clicked
addBtn.addEventListener("click", function () {

    // getting values from inputs
    let dateValue = inputDate.value;
    let descriptionValue = inputDescription.value;
    let categoryValue = inputCategory.value;
    let reasonValue = inputReason.value;
    let amountValue = inputAmount.value;

    // checking if inputs are empty
    if (
        dateValue === "" ||
        descriptionValue === "" ||
        categoryValue === "" ||
        reasonValue === "" ||
        amountValue === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    // creating expense object
    let expense = {
        date: dateValue,
        description: descriptionValue,
        category: categoryValue,
        reason: reasonValue,
        amount: Number(amountValue)
    };

    // storing inside array
    expenses.push(expense);

    // clearing old dashboard data
    dates.innerHTML = "";
    descriptions.innerHTML = "";
    categories.innerHTML = "";
    reasons.innerHTML = "";
    amounts.innerHTML = "";

    // total money variable
    let totalSpent = 0;

    // category totals
    let categoryTotals = {};

    // displaying all expenses
    expenses.forEach(function (item) {

        dates.innerHTML += `
        <p>${item.date}</p>
        `;

        descriptions.innerHTML += `
        <p>${item.description}</p>
        `;

        categories.innerHTML += `
        <p>${item.category}</p>
        `;

        reasons.innerHTML += `
        <p>${item.reason}</p>
        `;

        amounts.innerHTML += `
        <p>₦${item.amount}</p>
        `;

        // calculating total spent
        totalSpent += item.amount;

        // checking category totals
        if (categoryTotals[item.category]) {
            categoryTotals[item.category] += item.amount;
        } else {
            categoryTotals[item.category] = item.amount;
        }
    });

    // displaying total spent
    totalMoney.innerHTML = `₦${totalSpent}`;

    // displaying total records
    totalRecords.innerHTML = `${expenses.length} Records`;

    // displaying average expense
    let average = totalSpent / expenses.length;

    averageExpense.innerHTML = `₦${average.toFixed(2)}`;

    // displaying monthly total
    monthlyTotal.innerHTML = `₦${totalSpent}`;

    // finding top category
    let highestCategory = "";
    let highestAmount = 0;

    for (let key in categoryTotals) {

        if (categoryTotals[key] > highestAmount) {

            highestAmount = categoryTotals[key];
            highestCategory = key;
        }
    }

    // displaying top category
    topCategory.innerHTML = highestCategory;
    topCategoryTotal.innerHTML = `₦${highestAmount}`;

    // clearing inputs after adding
    inputDate.value = "";
    inputDescription.value = "";
    inputCategory.value = "";
    inputReason.value = "";
    inputAmount.value = "";
});

