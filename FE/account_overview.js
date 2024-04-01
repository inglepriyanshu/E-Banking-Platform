const name_element = document.getElementById("name");
const account_number_element = document.getElementById("account-number");
const balance_element = document.getElementById("balance");
const loan_amount_element = document.getElementById("loan-amount");

const name_value = localStorage.getItem("name");
const account_number_value = localStorage.getItem("ac_no");
const balance_value = localStorage.getItem("balance");
const loan_amount_value = localStorage.getItem("loan_amount");

name_element.innerHTML=`${name_value}`;
account_number_element.innerHTML=`${account_number_value}`;
balance_element.innerHTML=`${balance_value}`;
loan_amount_element.innerHTML=`${loan_amount_value}`;