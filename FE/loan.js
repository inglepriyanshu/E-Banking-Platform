window.onload = function () {
    console.log('Window loaded'); // Check if window onload event is firing

    const form = document.querySelector('.loan-form');
    console.log('Form:', form); // Check if the form is selected correctly

    form.addEventListener('submit', function (event) {
        console.log('Form submitted'); // Check if the form submit event is firing

        event.preventDefault();

        const loanAmountInput = document.getElementById('loan-amount');
        const incomeInput = document.getElementById('income');
        const creditScoreInput = document.getElementById('credit-score');
        const infoBox = document.getElementById('info-box');
        const successBox = document.getElementById('success-box');

        // Retrieve values from input fields
        const loanAmount = parseFloat(loanAmountInput.value);
        const income = parseFloat(incomeInput.value);
        const creditScore = parseFloat(creditScoreInput.value);
        const balance = parseFloat(localStorage.getItem('balance'));
        const debt = parseFloat(localStorage.getItem("loan_amount"));

        console.log('Loan Amount:', loanAmount);
        console.log('Income:', income);
        console.log('Credit Score:', creditScore);
        console.log('Balance:', balance);

        // Calculate debt-to-income ratio
        const debtToIncomeRatio = debt / income;

        console.log('Debt-to-Income Ratio:', debtToIncomeRatio);

        // Check loan application criteria
        if (loanAmount > 1000000) {
            infoBox.innerText = 'Loan amount exceeds the maximum amount.';
            infoBox.style.display = 'block';
            successBox.style.display = 'none';
        } else if (debtToIncomeRatio > 0.4) {
            infoBox.innerText = 'Debt-to-income ratio is too high.';
            infoBox.style.display = 'block';
            successBox.style.display = 'none';
        } else if (creditScore < 600) {
            infoBox.innerText = 'Credit score is too low.';
            infoBox.style.display = 'block';
            successBox.style.display = 'none';
        } else {
            successBox.innerText = 'Loan application approved!';
            successBox.style.display = 'block';
            infoBox.style.display = 'none';
            const name = localStorage.getItem("name");
            
            const loanAmountInt = parseInt(loanAmount);
            const oldLoan = localStorage.getItem("loan_amount");
            const newLoan = parseInt(oldLoan)+loanAmountInt;
            localStorage.setItem("loan_amount",newLoan)
            fetch('http://localhost:4002/loan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'name': name,
                },
                body: JSON.stringify({ loanAmount: loanAmountInt }) // Send loan amount in the request body
            })
            .then(()=>
                {
                    console.log("DB updated successfully");
                })

        }
    });
};
