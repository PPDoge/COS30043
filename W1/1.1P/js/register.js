var usename = document.querySelector("#usename")
var email = document.querySelector("#email")
var password = document.querySelector("#password")
var repassword = document.querySelector("#repassword")
var postcode = document.querySelector("#postcode")
var fname = document.querySelector("#fname")
var lname = document.querySelector("#lname")
var phone = document.querySelector("#phone")
var form = document.querySelector("#regform")


const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; 

const checkFname = () => fname.value.trim().length > 0;  
const checkLname = () => lname.value.trim().length > 0;
const checkContactNumber = () => phone.value.trim().length > 0 && phone.value.trim().match(phoneRegex);
const checkUsername = () => username.value.trim().length > 0;
const checkEmail = () => email.value.trim().length > 0 && email.value.trim().match(emailRegex);
const checkPassword = () => password.value.length >= 7;
const checkRePassword = () => repassword.value === password.value && repassword.value.length > 0;
const checkPostCode = () => postcode.value.trim().length === 4;

const validate = () => {
  let errMsg = "";
  if (!checkFname()) {
    errMsg += "Please fill in the username\n";
    fname.parentNode.classList.add("input__wrapper--error");
  }else{
    fname.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkLname()) {
    errMsg += "Please fill in the username\n";
    lname.parentNode.classList.add("input__wrapper--error");
  }else{
    lname.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkContactNumber()) {
    errMsg += "Please fill in the username\n";
    phone.parentNode.classList.add("input__wrapper--error");
  }else{
    phone.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkUsername()) {
    errMsg += "Please fill in the username\n";
    username.parentNode.classList.add("input__wrapper--error");
  }else{
    username.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkEmail()) {
    errMsg += "Please recheck your Email\n";
    email.parentNode.classList.add("input__wrapper--error");
  }else{
    email.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkPassword()) {
    errMsg += "Please fill in at least 6 characters for the password\n";
    password.parentNode.classList.add("input__wrapper--error");
  }else{
    password.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkRePassword()) {
    errMsg += "Please type the same password twice\n";
    repassword.parentNode.classList.add("input__wrapper--error");
  }else{
    repassword.parentNode.classList.remove("input__wrapper--error");
  }
  if (!checkPostCode()) {
    errMsg += "Pleaes recheck your postcode's format";
    postcode.parentNode.classList.add("input__wrapper--error");
  }else{
    postcode.parentNode.classList.remove("input__wrapper--error");
  }
  if (errMsg !== "") {
    alert(errMsg);
    return false;
  }
  return true;
};

form.onsubmit = validate;