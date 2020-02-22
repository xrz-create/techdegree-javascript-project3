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
//turning button into "button" so the form will stop giving 405 error on click
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
    colors.appendChild(initialMessage);
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
        } else if (design.value === "Select Theme") {
            initialMessage.selected = true;
            hideColorUntilSelected();
        }
    }
}

//hides colors for shirts until the style is selected
hideColorUntilSelected = () => {
    if (design.value === "Select Theme"){
        colorDropDown.style.display = 'none';
        colorLabel.style.display = 'none';
    } else {
        colorsDropDown();
    }
}

/*The showOrHideTip() and createListener() is from the Workspace in 
Treehouse's "Regular Expressions in Javascript" course found at: 
https://teamtreehouse.com/library/validating-an-email. Then red, bold text
will tell the user to change their input if incorrect using an event 
listener also taken from the same Treehouse course's workspace */
function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
        element.style.opacity = 1;
        element.style.fontSize = 'large';
        element.style.fontWeight = 'bolder';
        element.style.color = 'red';
    }
}

// //same as above: from Treehouse's "Regular Expressions in Javascript" course
// //with some edits
// const createListener = validator => {
//     return e => {
//         const text = e.target.value;
//         const valid = validator(text);
//         const showTip = text !== "" && !valid;
//         const validateThatForm = (id, txtContentWrong, txtContentRight) => {
//             if (e.target.id == id && showTip == true){
//                 let tooltipElement = document.getElementById(id).previousElementSibling;
//                 tooltipElement.textContent = txtContentWrong
//                 showOrHideTip(showTip, tooltipElement);
//             } else {
//                 let tooltipElement = document.getElementById(id).previousElementSibling;
//                 tooltipElement.textContent = txtContentRight;
//                 tooltipElement.style.color = "#000";
//                 tooltipElement.style.display = "block";
//                 tooltipElement.style.marginBottom = ".5em";
//                 tooltipElement.style.fontSize = 'medium';
//                 tooltipElement.style.fontWeight = 'normal';
//             }
//         }    
//         validateThatForm("name", "Name should be only letters", "Name:");
//         validateThatForm("mail", "Email should be a valid email", "Email");
//         validateThatForm("cc-num", "Credit card # should be valid", "Card Number:");
//         validateThatForm("zip", "Needs valid Zipcode", "Zip Code:");
//         validateThatForm("cvv", "Needs valid CVV", "CVV:" );
//     };  
// }


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
        registerForm.action = "index.html";
    } else if (paymentElement== "paypal") {
        creditCard.style.display = 'none';
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        registerForm.action = "http://www.paypal.com"
    } else if (paymentElement == "bitcoin") {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = '';    
        registerForm.action = "http://www.coinbase.com"    
    }
}

function selectPaymentOnLoad() {
    if (isFlagged != true) {
        paymentSelect.remove(selectPaymentMethod);
        paymentMethod("credit card");
        return isFlagged = true;
    }
}

function validateForm(){
registerButton.textContent = "Register";
    const tryName = /^[^@\.\d]+\s[a-z]+$/i.test(document.getElementById("name").value);
    const tryEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(document.getElementById("mail").value);
    const tryCC = /^\d{16}$/.test(document.getElementById("cc-num").value);
    const tryZip = /^\d{5}$/.test(document.getElementById("zip").value);
    const tryCvv = /^\d{3}$/.test(document.getElementById("cvv").value);
    function validateAllFields(varname, elementId){
        if (paymentSelect.value == "credit card") { 
            if (varname == false || varname == ""){
                registerButton.textContent = "Fix fields in red";
                document.getElementById(elementId).style.borderColor = 'red';
            } else {
                document.getElementById(elementId).style.borderColor = "#5e97b0"
            }
        }
        if (registerButton.textContent == "Register") {
            registerButton.type = 'submit';
        }
    }

    validateAllFields(tryName, "name");
    validateAllFields(tryEmail, "mail");
    validateAllFields(tryCC, "cc-num");
    validateAllFields(tryZip, "zip");
    validateAllFields(tryCvv, "cvv");

    function validateSomeFields(varname, elementId){
        if (paymentSelect.value == "paypal" || paymentSelect.value == "bitcoin") { 
            if (varname == false || varname == ""){
                registerButton.textContent = "Fix fields in red";
                document.getElementById(elementId).style.borderColor = 'red';
            } else {
                document.getElementById(elementId).style.borderColor = "#5e97b0"
            }
        } 
        if (registerButton.textContent == "Register") {
            registerButton.type = 'submit';
        }
    }

    validateSomeFields(tryName, "name");
    validateSomeFields(tryEmail, "mail");
}
    // }
    // if (paymentSelect.value == "credit card") { 
    //     if (tryName == false || tryName == ""){
    //         registerButton.textContent = "Fix the Name field";
    //         document.getElementById("name").style.borderColor = 'red';
    //     } else {
    //         document.getElementById("name").style.borderColor = "#5e97b0"
    //     }
    //     if (tryEmail == false ||  tryEmail == ""){
    //         registerButton.textContent = "Fix the Email field";
    //         document.getElementById("mail").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("mail").style.borderColor = "#5e97b0"
    //     }
    //     if (tryCC == false || tryCC == ""){
    //         registerButton.textContent = "Fix the Credit Card field";
    //         document.getElementById("cc-num").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("cc-num").style.borderColor = "#5e97b0"
    //     }
    //     if (tryZip == false || tryZip == ""){
    //         registerButton.textContent = "Fix the Zip Code field";
    //         document.getElementById("zip").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("zip").style.borderColor = "#5e97b0"
    //     }
    //     if (tryCvv == false || tryCvv == ""){
    //         registerButton.textContent = "Fix the CVV field";
    //         document.getElementById("cvv").style.borderColor = 'red';
    //     }else{document.getElementById("cvv").style.borderColor = "#5e97b0"
    //     }
    //     if (registerButton.textContent == "Register") {
    //         registerButton.type = 'submit';
    //     }
    // } else if (paymentSelect.value == "paypal") {
    //     if (tryName == false || tryName == ""){
    //         registerButton.textContent = "Fix the Name field";
    //         document.getElementById("name").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("name").style.borderColor = "#5e97b0"
    //     }
    //     if (tryEmail == false ||  tryEmail == ""){
    //         registerButton.textContent = "Fix the Email field";
    //         document.getElementById("mail").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("mail").style.borderColor = "#5e97b0"
    //     }
        // if (registerButton.textContent == "Register") {
        //     registerButton.type = 'submit';
        // }
    // } else if (paymentSelect.value == "bitcoin") {
    //     if (tryName == false || tryName == ""){
    //         registerButton.textContent = "Fix the Name field";
    //         document.getElementById("name").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("name").style.borderColor = "#5e97b0"
    //     }
    //     if (tryEmail == false ||  tryEmail == ""){
    //         registerButton.textContent = "Fix the Email field";
    //         document.getElementById("mail").style.borderColor = 'red';
    //     }else{
    //         document.getElementById("mail").style.borderColor = "#5e97b0"
    //     }
    //     if (registerButton.textContent == "Register") {
    //         registerButton.type = 'submit';
    //     }
    // }  

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
});