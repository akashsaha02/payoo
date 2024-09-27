
const sections = {
    'Add Money': document.querySelector('#add-money-section'),
    'Cashout': document.querySelector('#cashout-section'),
    'Cash Transfer': document.querySelector('#cash-transfer-section'),
    'Get Bonus': document.querySelector('#get-bonus-section'),
    'Pay Bill': document.querySelector('#pay-bill-section'),
    'Transactions': document.querySelector('#transaction-history-section')
};

document.querySelectorAll('.dashboard-icon').forEach(icon => {
    icon.addEventListener('click', function () {
        // Remove 'clicked' class from all icons
        document.querySelectorAll('.dashboard-icon').forEach(icon => icon.classList.remove('clicked'));

        // Add 'clicked' class to the clicked icon
        this.classList.add('clicked');

        // Show the corresponding section
        const sectionName = this.querySelector('h2').innerText;
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        sections[sectionName].classList.remove('hidden');
    });
});

const updateBalance = (amount, isAddition = true) => {
    const balanceElement = document.querySelector('#available-balance');
    const currentBalance = parseFloat(balanceElement.innerText);
    const newBalance = isAddition ? currentBalance + amount : currentBalance - amount;
    balanceElement.innerText = newBalance.toFixed(2);
};


// add money
document.getElementById('add-btn').addEventListener('click', function () {
    const bankName = document.getElementById('add-bank-name').value;
    const accountNumber = document.getElementById('add-account-number').value;
    const amount = parseFloat(document.getElementById('add-ammount').value); // parse amount here
    const pin = document.getElementById('add-pin').value;

    // console.log(bankName, accountNumber, amount, pin);

    if (isNaN(amount) || amount <= 0) {
        alert("Amount is not valid");
        return;
    }
    if (!isNaN(bankName)) {
        alert("Bank name is not valid");
        return;
    }
    if (isNaN(accountNumber) || accountNumber.length != 10) {
        alert("Account number is not valid, length must be 10");
        return;
    }
    if (isNaN(pin) || pin.length != 4) {
        alert("Pin number is not valid, pin length must be 4");
        return;
    }

    updateBalance(amount, true);

    const transactionHistory = document.querySelector('#transaction-history');
    const timestamp = new Date().toString();
    const transactionCard = `
    <div class="card bg-green-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Money Added From ${bankName}. Account Number: ${accountNumber}</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">+ $<span>${amount.toFixed(2)}</span></h2>
                </div>
            </div>
        </div>
    `;

    // Insert the HTML string using insertAdjacentHTML
    transactionHistory.insertAdjacentHTML('beforeend', transactionCard);

    // Clear form fields
    document.getElementById('add-bank-name').value = '';
    document.getElementById('add-account-number').value = '';
    document.getElementById('add-ammount').value = '';
    document.getElementById('add-pin').value = '';

    alert("Money added successfully");
});


// cashout
document.getElementById('cashout-btn').addEventListener('click', function () {
    const agentNum = document.getElementById('cashout-agent').value;
    const amount = parseFloat(document.getElementById('cashout-ammount').value); // parse amount here
    const pin = document.getElementById('cashout-pin').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Amount is not valid");
        return;
    }
    if (isNaN(agentNum) || agentNum.length != 8) {
        alert("Agent number is not valid, length must be 8");
        return;
    }
    if (isNaN(pin) || pin.length != 4) {
        alert("Pin number is not valid, pin length must be 4");
        return;
    }

    // Retrieve the current balance
    const balanceElement = document.querySelector('#available-balance');
    const currentBalance = parseFloat(balanceElement.innerText);

    if (amount > currentBalance) {
        alert("Insufficient balance");
        return;
    }

    updateBalance(amount, false);

    const transactionHistory = document.querySelector('#transaction-history');
    const timestamp = new Date().toString();
    const transactionCard = `
    <div class="card bg-red-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Cash out to Agent No: ${agentNum}</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">- $<span>${amount.toFixed(2)}</span></h2>
                </div>
            </div>
        </div>
    `;
    transactionHistory.insertAdjacentHTML('beforeend', transactionCard);

    // Clear form fields
    document.getElementById('cashout-agent').value = '';
    document.getElementById('cashout-ammount').value = '';
    document.getElementById('cashout-pin').value = '';

    alert("Cash Out successful");
});




// cash transfer

document.getElementById('ct-btn').addEventListener('click', function () {

    const accountNum = document.getElementById('ct-account-num').value;
    const amount = parseFloat(document.getElementById('ct-ammount').value); // parse amount here
    const pin = document.getElementById('ct-pin').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Amount is not valid");
        return;
    }
    if (isNaN(accountNum) || accountNum.length != 10) {
        alert("Account number is not valid, length must be 10");
        return;
    }
    if (isNaN(pin) || pin.length != 4) {
        alert("Pin number is not valid, pin length must be 4");
        return;
    }

    // Retrieve the current balance
    const balanceElement = document.querySelector('#available-balance');
    const currentBalance = parseFloat(balanceElement.innerText);

    // Check if the entered amount is less than or equal to the current balance
    if (amount > currentBalance) {
        alert("Insufficient balance");
        return;
    }

    updateBalance(amount, false);

    const transactionHistory = document.querySelector('#transaction-history');
    const timestamp = new Date().toString();
    const transactionCard = `
    <div class="card bg-red-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Cash Transfer to Account No: ${accountNum}</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">- $<span>${amount.toFixed(2)}</span></h2>
                </div>
            </div>
        </div>
    `;
    transactionHistory.insertAdjacentHTML('beforeend', transactionCard);

    // Clear form fields
    document.getElementById('ct-account-num').value = '';
    document.getElementById('ct-ammount').value = '';
    document.getElementById('ct-pin').value = '';

    alert("Cash Transferred Successfully");

});

// pay bill

document.getElementById('pay-bill-btn').addEventListener('click', function () {

    const bankName = document.getElementById('pb-bank-name').value;
    const accountNum = document.getElementById('pb-account-num').value;
    const amount = parseFloat(document.getElementById('pb-amount').value); // parse amount here
    const pin = document.getElementById('pb-pin').value;

    if (!bankName) {
        alert("Bank name is required");
        return;
    }
    if (isNaN(accountNum) || accountNum.length != 10) {
        alert("Account number is not valid, length must be 10");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Amount is not valid");
        return;
    }
    if (isNaN(pin) || pin.length != 4) {
        alert("Pin number is not valid, pin length must be 4");
        return;
    }

    // Retrieve the current balance
    const balanceElement = document.querySelector('#available-balance');
    const currentBalance = parseFloat(balanceElement.innerText);

    // Check if the entered amount is less than or equal to the current balance
    if (amount > currentBalance) {
        alert("Insufficient balance");
        return;
    }

    updateBalance(amount, false);

    const transactionHistory = document.querySelector('#transaction-history');
    const timestamp = new Date().toString();
    const transactionCard = `
    <div class="card bg-red-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Paid Bill to Account No: ${accountNum}</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">- $<span>${amount.toFixed(2)}</span></h2>
                </div>
            </div>
        </div>
    `;
    transactionHistory.insertAdjacentHTML('beforeend', transactionCard);

    // Clear form fields
    document.getElementById('pb-bank-name').value = '';
    document.getElementById('pb-account-num').value = '';
    document.getElementById('pb-amount').value = '';
    document.getElementById('pb-pin').value = '';

    alert("Bill Paid Successfully");

});

// get bonus

document.getElementById('bonus-btn').addEventListener('click', function () {

    const payoo200 = 200;
    const payoo500 = 500;


    const coupon = document.getElementById('bonus-input').value;

    if (coupon == "PAYOO200") {
        updateBalance(payoo200, true);
        const transactionHistory = document.querySelector('#transaction-history');
        const timestamp = new Date().toString();
        const transactionCard = `
    <div class="card bg-green-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Bonus 200 Added</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">+ $<span>200</span></h2>
                </div>
            </div>
        </div>
    `;
        transactionHistory.insertAdjacentHTML('beforeend', transactionCard);
        document.getElementById('bonus-input').value = '';
        alert("Bonus added successfully");
    }
    else if (coupon == "PAYOO500") {
        updateBalance(payoo500, true);
        const transactionHistory = document.querySelector('#transaction-history');
        const timestamp = new Date().toString();
        const transactionCard = `
    <div class="card bg-green-200 p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/transaction.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">Bonus 500 Added</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">+ $<span>500</span></h2>
                </div>
            </div>
        </div>
    `;
        transactionHistory.insertAdjacentHTML('beforeend', transactionCard);
        document.getElementById('bonus-input').value = '';
        alert("Bonus added successfully");
    }
    else {
        alert("Invalid coupon code");
        document.getElementById('bonus-input').value = '';
    }

});

