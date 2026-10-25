const firstnameEl = document.querySelector("#firstname");
const emailEl = document.querySelector("#email");
const phonenumberEl = document.querySelector("#phonenumber");
const messageEl = document.querySelector("#message1");
const form = document.querySelector("#form1");

// Required field validation
const isRequired = (value) => value.trim() !== "";

// Name length validation
const isBetween = (length, min, max) =>
    length >= min && length <= max;

// Phone validation
const isNumberValid = (phone) => /^[0-9]{10}$/.test(phone);

// Email validation
const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Show error
const showError = (input, message) => {
    const formfield = input.parentElement;

    formfield.classList.remove("success");
    formfield.classList.add("error");

    const error = formfield.querySelector("small");

    if (error) {
        error.textContent = message;
    }
};

// Show success
const showSuccess = (input) => {
    const formfield = input.parentElement;

    formfield.classList.remove("error");
    formfield.classList.add("success");

    const error = formfield.querySelector("small");

    if (error) {
        error.textContent = "";
    }
};

// Validate name
const checkfirstname = () => {
    const firstname = firstnameEl.value.trim();

    if (!isRequired(firstname)) {
        showError(firstnameEl, "Name cannot be blank.");
        return false;
    }

    if (!isBetween(firstname.length, 3, 25)) {
        showError(
            firstnameEl,
            "Name must be between 3 and 25 characters."
        );
        return false;
    }

    showSuccess(firstnameEl);
    return true;
};

// Validate phone
const checkphonenumber = () => {
    const phone = phonenumberEl.value.trim();

    if (!isRequired(phone)) {
        showError(phonenumberEl, "Phone number cannot be blank.");
        return false;
    }

    if (!isNumberValid(phone)) {
        showError(
            phonenumberEl,
            "Enter a valid 10-digit phone number."
        );
        return false;
    }

    showSuccess(phonenumberEl);
    return true;
};

// Validate email
const checkEmail = () => {
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, "Email cannot be blank.");
        return false;
    }

    if (!isEmailValid(email)) {
        showError(emailEl, "Enter a valid email address.");
        return false;
    }

    showSuccess(emailEl);
    return true;
};

// Validate message
const checkMessage = () => {
    const message = messageEl.value.trim();

    if (!isRequired(message)) {
        showError(messageEl, "Message cannot be blank.");
        return false;
    }

    showSuccess(messageEl);
    return true;
};

// Submit form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = checkfirstname();
    const isPhoneValid = checkphonenumber();
    const isEmailValidNow = checkEmail();
    const isMessageValid = checkMessage();

    const isFormValid =
        isNameValid &&
        isPhoneValid &&
        isEmailValidNow &&
        isMessageValid;

    if (isFormValid) {
        alert("All fields are valid!");

        // Validation is complete.
        // Email sending or backend integration
        // must be added separately.
    }
});

// Validate while typing
const debounce = (fn, delay = 500) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

form.addEventListener(
    "input",
    debounce(function (e) {
        switch (e.target.id) {
            case "firstname":
                checkfirstname();
                break;

            case "phonenumber":
                checkphonenumber();
                break;

            case "email":
                checkEmail();
                break;

            case "message1":
                checkMessage();
                break;
        }
    })
);