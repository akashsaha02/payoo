function handleLogout(){
    window.location.href = "../index.html";
}

// Section handling
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
        document.querySelectorAll('.dashboard-icon').forEach(icon => icon.classList.remove('clicked'));
        this.classList.add('clicked');
        const sectionName = this.querySelector('h2').innerText;
        Object.values(sections).forEach(section => section.classList.add('hidden'));
        sections[sectionName].classList.remove('hidden');
    });
});

// Common Functions

const updateBalance = (amount, isAddition = true) => {
    const balanceElement = document.querySelector('#available-balance');
    const currentBalance = parseFloat(balanceElement.innerText);
    const newBalance = isAddition ? currentBalance + amount : currentBalance - amount;
    balanceElement.innerText = newBalance.toFixed(2);
};

const addTransactionCard = (description, amount, isAddition) => {
    const transactionHistory = document.querySelector('#transaction-history');
    const timestamp = new Date().toLocaleString();
    const cardType = isAddition ? 'bg-green-200' : 'bg-red-200';
    const sign = isAddition ? '+' : '-';
    const transactionCard = `
        <div class="card ${cardType} p-3 rounded-lg mt-2">
            <div class="flex justify-between gap-4 items-center">
                <div class="flex gap-4 items-center">
                    <img src="./images/coin.png" class="w-8" alt="">
                    <div>
                        <h2 class="text-text-primary text-md font-semibold">${description}</h2>
                        <p class="text-text-gray text-sm">${timestamp}</p>
                    </div>
                </div>
                <div>
                    <h2 class="text-text-primary font-semibold">${sign}<span>${amount.toFixed(2)}</span></h2>
                </div>
            </div>
        </div>`;
    transactionHistory.insertAdjacentHTML('beforeend', transactionCard);
};

const validateFields = (amount, accountNumber, pin, accountLen, pinLen) => {
    if (isNaN(amount) || amount <= 0) {
        alert("Amount is not valid");
        return false;
    }
    if (isNaN(accountNumber) || accountNumber.length != accountLen) {
        alert(`Account number is not valid, length must be ${accountLen}`);
        return false;
    }
    if (isNaN(pin) || pin.length != pinLen) {
        alert(`Pin number is not valid, pin length must be ${pinLen}`);
        return false;
    }
    return true;
};

const processTransaction = (amount, description, isAddition, clearFields) => {
    updateBalance(amount, isAddition);
    addTransactionCard(description, amount, isAddition);
    clearFields.forEach(field => field.value = '');
    alert("Transaction successful");
};

// Specific Actions

document.getElementById('add-btn').addEventListener('click', function () {
    const bankName = document.getElementById('add-bank-name').value;
    const accountNumber = document.getElementById('add-account-number').value;
    const amount = parseFloat(document.getElementById('add-ammount').value);
    const pin = document.getElementById('add-pin').value;

    if (!isNaN(bankName)) {
        alert("Bank name is not valid");
        return;
    }

    if (validateFields(amount, accountNumber, pin, 10, 4)) {
        processTransaction(amount, `Money Added From ${bankName}.<br>Account No: ${accountNumber}`, true, [
            document.getElementById('add-bank-name'),
            document.getElementById('add-account-number'),
            document.getElementById('add-ammount'),
            document.getElementById('add-pin')
        ]);
    }
});

document.getElementById('cashout-btn').addEventListener('click', function () {
    const agentNum = document.getElementById('cashout-agent').value;
    const amount = parseFloat(document.getElementById('cashout-ammount').value);
    const pin = document.getElementById('cashout-pin').value;

    if (validateFields(amount, agentNum, pin, 8, 4)) {
        const balanceElement = document.querySelector('#available-balance');
        const currentBalance = parseFloat(balanceElement.innerText);
        if (amount <= currentBalance) {
            processTransaction(amount, `Cash out to Agent No: ${agentNum} <br>`, false, [
                document.getElementById('cashout-agent'),
                document.getElementById('cashout-ammount'),
                document.getElementById('cashout-pin')
            ]);
        } else {
            alert("Insufficient balance");
        }
    }
});

document.getElementById('ct-btn').addEventListener('click', function () {
    const accountNum = document.getElementById('ct-account-num').value;
    const amount = parseFloat(document.getElementById('ct-ammount').value);
    const pin = document.getElementById('ct-pin').value;

    if (validateFields(amount, accountNum, pin, 10, 4)) {
        const balanceElement = document.querySelector('#available-balance');
        const currentBalance = parseFloat(balanceElement.innerText);
        if (amount <= currentBalance) {
            processTransaction(amount, `Cash Transfer to Account No: ${accountNum} <br>`, false, [
                document.getElementById('ct-account-num'),
                document.getElementById('ct-ammount'),
                document.getElementById('ct-pin')
            ]);
        } else {
            alert("Insufficient balance");
        }
    }
});

document.getElementById('pay-bill-btn').addEventListener('click', function () {
    const bankName = document.getElementById('pb-bank-name').value;
    const accountNum = document.getElementById('pb-account-num').value;
    const amount = parseFloat(document.getElementById('pb-amount').value);
    const pin = document.getElementById('pb-pin').value;

    if (bankName && validateFields(amount, accountNum, pin, 10, 4)) {
        const balanceElement = document.querySelector('#available-balance');
        const currentBalance = parseFloat(balanceElement.innerText);
        if (amount <= currentBalance) {
            processTransaction(amount, `Paid Bill to Account No: ${accountNum}`, false, [
                document.getElementById('pb-bank-name'),
                document.getElementById('pb-account-num'),
                document.getElementById('pb-amount'),
                document.getElementById('pb-pin')
            ]);
        } else {
            alert("Insufficient balance");
        }
    }
});

document.getElementById('bonus-btn').addEventListener('click', function () {
    const coupon = document.getElementById('bonus-input').value;
    let bonusAmount;

    if (coupon === "PAYOO200") bonusAmount = 200;
    else if (coupon === "PAYOO500") bonusAmount = 500;
    else {
        alert("Invalid coupon code");
        document.getElementById('bonus-input').value = '';
        return;
    }

    processTransaction(bonusAmount, `Bonus ${bonusAmount} Added`, true, [document.getElementById('bonus-input')]);
});
