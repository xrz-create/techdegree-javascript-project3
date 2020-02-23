/*
global variables
*/
const nameInput = document.getElementById("name");
nameInput.placeholder = "First Last";
const emailInput = document.getElementById("mail");
emailInput.placeholder = "email@mail.com";
const paymentInput = document.getElementById("cc-num");
const zipcodeInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const otherJobRole = document.getElementById('title');
const selectDesign = document.getElementById('design');
const design = document.getElementById('design');
const colors = document.getElementById('color');
const initialMessage = document.createElement('option');
const colorLabel = document.getElementById('colors-js-puns')
const colorDropDown = document.getElementsByTagName('select')[3];
const activities = document.getElementsByTagName('fieldset')[2];
const activitiesCost = document.createElement('label');
activities.appendChild(activitiesCost);
const paymentSelect = document.getElementById('payment');
const registerButton = document.getElementsByTagName('BUTTON')[0];
const selectPaymentMethod = document.getElementById('payment').firstChild.nextSibling;
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const registerForm = document.getElementsByTagName('FORM')[0];
registerButton.type = "button";
let isFlagged = false;

/*
functions
*/

//function to set focus, used to make the Name input in focus first-thing
focus = focus => document.getElementById(focus).focus();

//helps hide Job Role of 'other' when not selected
hideOtherTitle = hideStuff => {
    hideStuff = document.getElementById(hideStuff);
    hideStuff.type = 'hidden';
}

//helps unhide Job Role of 'other' when selected
unhide = unhideStuff => {
    unhideStuff = document.getElementById(unhideStuff);
    unhideStuff.type = 'text';
}

//makes the user need to select shirt style before color is available
initialColorDropDown = () => {
    initialMessage.textContent = "Please select a T-shirt theme"
    //initialMessage.disabled = true;
    colors.appendChild(initialMessage);
    design[0].textContent = "Please select a T-shirt theme"
    design[0].disabled = true;
}
//loop to make specific shirt options and colors available 
colorsDropDown = () => {
    colorDropDown.style.display = '';
    colorLabel.style.display = '';
    for (let i = 0; i < colors.length; i++) {
        colors[i].style.display = 'none';
        if (design.value === "js puns") {
            colors[0].style.display = '';
            colors[1].style.display = '';
            colors[2].style.display = '';
            colors[0].selected = true;
        } else if (design.value === "heart js") {
            colors[3].style.display = '';
            colors[4].style.display = '';
            colors[5].style.display = '';
            colors[3].selected = true;
        } else if (design.value === "Please select a T-shirt theme") {
            initialMessage.selected = true;
            hideColorUntilSelected();
        }
    }
}

//hides colors for shirts until the style is selected
hideColorUntilSelected = () => {
    if (design.value === "Please select a T-shirt theme"){
        colorDropDown.style.display = 'none';
        colorLabel.style.display = 'none';
    } else {
        colorsDropDown();
    }
}

//activities fieldset disables conflicting times selection and totals user input
const checkBoxesWork = checkbox => {
    const activityList = document.querySelectorAll('[data-day-and-time]');
    const activityListCost = document.querySelectorAll('[data-cost]:checked');
    const checkedBox = checkbox.getAttribute('data-day-and-time');
    for (let singleActivity of activityList) {
        const attributeActivity = singleActivity.getAttribute(['data-day-and-time']);
        if ((attributeActivity == checkedBox) && (singleActivity != checkbox) && (checkbox.checked == true)){
            singleActivity.disabled = true;
        } else if ((attributeActivity == checkedBox) && (singleActivity != checkbox) && (checkbox.checked == false))
        singleActivity.disabled = false;
    }
    let total = 0;
    activitiesCost.textContent = "";
    for (let i = 0; i < activityListCost.length; i++) {
        let costArray = activityListCost[i].getAttribute("data-cost");
        total = parseInt(total) + parseInt(costArray);
        activitiesCost.textContent = "Your total is: $" + total; 
    }  
}

//shows the payment method of choice.
const paymentMethod = paymentElement => {
    if (paymentElement == "credit card") { 
        creditCard.style.display = '';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (paymentElement== "paypal") {
        creditCard.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
    } else if (paymentElement == "bitcoin") {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';
    }
}

//makes the 'credit card' option appear first thing on loading the page
function selectPaymentOnLoad() {
    if (isFlagged != true) {
        paymentSelect.remove(selectPaymentMethod);
        paymentMethod("credit card");
        return isFlagged = true;
    }
}

//validates the typed fields on "Register" button click. Errors in red borders
function validateForm(){
registerButton.textContent = "Register";
    const tryName = /^[^@\.\d]+\s[a-z]+$/i.test(document.getElementById("name").value);
    const tryEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(document.getElementById("mail").value);
    const tryCC = /^\d{13,16}$/.test(document.getElementById("cc-num").value);
    const tryZip = /^\d{5}$/.test(document.getElementById("zip").value);
    const tryCvv = /^\d{3}$/.test(document.getElementById("cvv").value);
    function validateAllFields(varname, elementId){
        if (varname == false || varname == ""){
            registerButton.textContent = "Fix fields in red";
            document.getElementById(elementId).style.borderColor = 'red';
        } else {
            document.getElementById(elementId).style.borderColor = "#5e97b0"
        }
    }
    function validateActivities(){
        document.getElementsByClassName('activities')[0].style.backgroundColor = '#9BBEEF';
        if (document.querySelectorAll('[data-cost]:checked').length == 0) {
            document.getElementsByClassName('activities')[0].style.backgroundColor = 'red';
            registerButton.textContent = "Fix fields in red";
        } else {
            document.getElementsByClassName('activities')[0].style.color = "rgba(6, 49, 68, 0.9)";
        }
    }
    if (paymentSelect.value == "credit card") {
        validateAllFields(tryName, "name");
        validateAllFields(tryEmail, "mail");
        validateAllFields(tryCC, "cc-num");
        validateAllFields(tryZip, "zip");
        validateAllFields(tryCvv, "cvv");
        validateActivities();
    }

    if (paymentSelect.value == "paypal" || paymentSelect.value == "bitcoin") {
        validateAllFields(tryName, "name");
        validateAllFields(tryEmail, "mail");
        validateActivities();
    }
}

/*
executing flow of the form and event listeners
*/
focus('name');

hideOtherTitle('other-title');

initialColorDropDown();

colorsDropDown();

hideColorUntilSelected();

otherJobRole.addEventListener('change', (e) => {
    if (e.target.value === "other"){
        unhide('other-title');
        focus('other-title');
    } else if (e.target.value != "other") {
        hideOtherTitle('other-title');
    }
});

selectDesign.addEventListener('change', (e) => {
    colorsDropDown();
});

activities.addEventListener('click', (e) => { 
    checkBoxesWork(e.target);
});

paymentSelect.addEventListener('change', (e) => {
    paymentMethod(e.target.value);
});

selectPaymentOnLoad();

registerButton.addEventListener('click', (e) => {
    validateForm();
    if (registerButton.textContent == "Register") {
        registerButton.type = 'submit';
    }
});

//will clear the red borders and background in real time
registerForm.addEventListener('change', (e) => {
    if (registerButton.textContent == "Fix fields in red") {
        validateForm();
    }
});
