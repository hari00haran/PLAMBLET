const  firstnameEl = document.querySelector("#firstname");
const emailEl = document.querySelector('#email');
const phonenumberEl = document.querySelector('#phonenumber');
const messageEl = document.querySelector('#message1');
const form = document.querySelector("#form1");



const checkfirstname = () => {
    let valid = false;

    const min = 3,
    max = 25;

    const firstname = firstnameEl.value.trim();

    if(!isRequired(firstname)) {
        showError(firstnameEl,'Firstname cannot be blank*.');
    } else if (!isBetween(firstname.length, min, max)) {
        showError(firstnameEl,`user firstname must be between ${min} and ${max} characters.*`)
    } else {
        showSuccess(firstnameEl);
        valid = true;

    }
    return valid;
};



const checkphonenumber = () => {
    let valid = false; 

    const phonenumber = phonenumberEl.value.trim();
    if(!isRequired(phonenumber)){
        showError(phonenumberEl,'Number cannot be blank.*');
    } else if(!isNumberValid(phonenumber)) {
        showError(phonenumberEl, 'Number is not valid.*');
    } else {
        showSuccess(phonenumberEl);
        valid = true;
    }

    return valid;
};


const checkEmail = () => {
    let valid = false;

    const email = emailEl.value.trim();
    if(!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};
const checkMessage = () => {
    let valid = false;



    const message = messageEl.value.trim();
    if(message ==""){
        showError(messageEl,'Message cannot be blank*.');
    }else {
        showSuccess(messageEl);
        valid = true;
}
return valid;
};

const isNumberValid = (phonenumber) => {
    const re = /^[0-9]{10}$/;
    return re.test(phonenumber);
}
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;



form.addEventListener('submit', function (e){
    e.preventDefault();

    let isfirstnameValid = checkfirstname(),
        isNumberValid = checkphonenumber(),
       isEmailValid = checkEmail(),
       isMessageValid = checkMessage();



       let isFormValid = isfirstnameValid &&
        isNumberValid && 
        isEmailValid &&
        isMessageValid;

        if(isFormValid){

        }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};



form.addEventListener('input',debounce(function (e){
    switch (e.target.id) {
        case 'firstname' :
            checkfirstname();
            break;

        case 'phonenumber' :

            checkphonenumber();
            break;
        case 'email' :
            checkEmail();
            break;
        case 'message1' :
            checkMessage();
            break;
    }
}));



const showError = (input, message) =>{

    const formfield = input.parentElement;

    formfield.classList.remove('success');
    formfield.classList.add('error');


    const error = formfield.querySelector('small');
    error.textContent = message;
};


const showSuccess = (input) => {
    const formfield = input.parentElement;

    formfield.classList.remove('error');
    formfield.classList.add('success');

    const error = formfield.querySelector('small');
    error.textContent = '';
}