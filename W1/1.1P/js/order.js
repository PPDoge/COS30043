let options = document.getElementsByClassName('select-option');
let addressHideShow = document.getElementsByClassName('hideAddress');
let sameDeliveryAddress = document.getElementById('same-delivery-address');
let getInputOfDeliAddress = document.getElementById('deli-address-input');
let setInputOfBillAddress = document.getElementById('bill-address-input');
let changeValueAfterHideList = document.querySelectorAll('.hideAddress input');
let hdieCreditCard = document.getElementById('hide-credit-card');
let payModeList = document.getElementsByClassName('select-pay-mode');

function changeValueIntoNone(changeValueAfterHideList) {
    Array.from(changeValueAfterHideList).forEach((element) => {
        element.value = 'None';
    })
}

function changeValueIntoWrong(changeValueAfterHideList) {
    Array.from(changeValueAfterHideList).forEach((element) => {
        element.value = '';
    })
}

function showAddress() {
    Array.from(addressHideShow).forEach((item) => {
        item.style.display = 'block';
    })
};

function hideAddress() {
    Array.from(addressHideShow).forEach((item) => {
        item.style.display = 'none';
    })
};

function checkPayMode(payModeList) {
    Array.from(payModeList).forEach((item) => {
        item.addEventListener('click', () => {
            if (item.value === 'Pay by cash') {
                hdieCreditCard.style.display = 'none';
                let changeInputIntoNone = document.querySelector('#hide-credit-card input');
                changeInputIntoNone.value = 'None';
            }
            else {
                hdieCreditCard.style.display = 'block';
                let changeInputIntoNone = document.querySelector('#hide-credit-card input');
                changeInputIntoNone.value = '';
            }
        })
    })
}

function checkOption() {
    Array.from(options).forEach((element) => {
        element.addEventListener('click', () => {
            if (element.value === 'Pick up') {
                hideAddress();
                changeValueIntoNone(changeValueAfterHideList);
            }
            else {
                showAddress();
                changeValueIntoWrong(changeValueAfterHideList);
            }
        })
    });
}

function checkSameInput() {
    sameDeliveryAddress.addEventListener('click', () => {
        if (sameDeliveryAddress.checked) {
            setInputOfBillAddress.value = getInputOfDeliAddress.value;
        } 
    })
}

function Validator(options) {

    function validate(inputELement, rule) {
        let errorElement = inputELement.parentElement.querySelector('.form-message');
        let errorMessage = rule.test(inputELement.value);

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            errorElement.style.color = 'red';
        }
        else {
            errorElement.innerText = '';
        }
        return !errorMessage;
    }

    let formElement = document.querySelector(options.form);

    if (formElement) {
        formElement.onsubmit = function (e) {

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                e.submit;
            }
            else {
                e.preventDefault();
            }
        }


        options.rules.forEach((rule => {
            let inputELement = formElement.querySelector(rule.selector);

            if (inputELement) {
                inputELement.onblur = () => {
                    validate(inputELement, rule);
                };

                inputELement.oninput = () => {
                    let errorElement = inputELement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                };
            }
        }))
    }
}

Validator.isRequire = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            return value.trim() ? undefined : 'Please enter full information';
        },
    };
}


Validator.isCard = (selector) => {
    return {
        selector: selector,
        test: (value) => {
            let regax = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            if (value === 'None') {
                return undefined
            }
            return regax.test(value) ? undefined : 'Please fill in this field with the correct card format';
        }
    }
}

function main() {
    checkOption()
    checkSameInput()
    checkPayMode(payModeList)

    //validator
    Validator({
        form: '#info-option',
        rules: [
            Validator.isRequire('#deli-address-input'),
            Validator.isRequire('#bill-address-input'),
            Validator.isCard('#credit-card'),
        ],
    });
    let reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
        location.reload();
    })
}

main()