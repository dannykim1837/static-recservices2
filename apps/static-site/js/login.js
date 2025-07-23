//Enhanced Error checking should be added to this code some preliminary work has been left commented out
//TODO: Add text element, with id=errorMessage, to the HTML. Add "visibility: hidden;" to it in CSS
//let errorMessage = document.getElementById(`errorMessage`);

//Checks input whenever something is typed in the username field
// usernameField.addEventListener("input", checkUsernameFieldInput);

// TODO: Users cannot log in if their credentials are not in the database
// TODO: Encrypt and decrypt user credentials when putting to / pulling from the database






function goToPage(
  originPage = "login-page",
  navigateToPage = "registration-page"
) {
  let originPageElement = document.getElementById(originPage);
  let navToPageElement = document.getElementById(navigateToPage);

  originPageElement.style.display = "None";
  navToPageElement.style.display = "Block";
}

/**
 * togglePasswordVisibility assumes that passwordField is set to "text" or (preferably) "password" in the HTML.
 * No need to reinvent the wheel!
 **/
function togglePasswordVisibility(elementId) {
  let passwordField = document.getElementById(elementId);

  if (passwordField.type === "password") {
    //if already visible, hide password
    passwordField.type = "text";
  } else {
    //otherwise, show password
    passwordField.type = "password";
  }
}

/**
 * Event listeners for when submit button is pressed on forms
 */
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", login);

const regForm = document.getElementById("registration");
regForm.addEventListener("submit", register);

const verifyForm = document.getElementById("verification");
verifyForm.addEventListener("submit", verify);

/**
 * Takes form data and converts to JSON string
 * useful resource https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
 **/
function login(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));


  // Check credential validity
  // TODO: make sure the email is in the database and move the validation to the register function
  const password = formDataObj.pwd;

  // move this line to register
  //const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // is true if email matches the pattern, is false otherwise
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password); //password must be 8+ characters, have a number, a symbol, and both a lowercase and an uppercase letter

  if (!validPassword) {
    alert("Password must be 8+ characters and include uppercase, lowercase, number, and symbol.");
    return;
  }

  // validation has passed
  if (sendToBackEnd(formDataObj)) {
    window.location = "dashboard.html";
  } else {
    //post error requeting to reenter
    alert("username or password error");
  }
}

function register(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  //if form is valid then take user to login
  if (sendToBackEnd(formDataObj)) {
    window.location = "login.html";
  } else {
    //post error requeting to reenter
    alert("please enter missing form fields");
  }
}

function verify(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));
  //if email is valid then take user to login
  if (sendToBackEnd(formDataObj)) {
    window.location = "login.html";
  } else {
    //post error requeting to reenter
    alert("please enter valid email address");
  }
}

/**
 * Stub function. In future used send to backend when it is setup
 **/
function sendToBackEnd(formData) {
  console.log(formData);
  //put code to send to backend here

  return true;
}

/**
 * HTML form button can submit the username and pass, and send to server.
 *
 * This function is less for security and more to be pretty for the user.
 * We are forced to check input on backend, regardless of what we do here.
 **/
// function checkUsernameFieldInput() {
//   //This regular expression checks that the username/email field:
//   // starts with a letter, followed by at least 3 letters/numbers
//   // may end with "@letters.letters"
//   // allows for whitespace before and after (easy for user to mistype and not notice, and easy for us to clean up), but no other characters
//   validFormat =
//     /^\s*[A-Za-z]+[A-Za-z0-9]{3,}(\@[A-Za-z]{5,}\.[A-Za-z]{3,})?\s*$/;
//   if (!validFormat.test(usernameField.value)) {
//     errorMessage.innerHTML = "Error: Please check your username/email!";
//     errorMessage.style.visibility = "visible";
//   } else {
//     errorMessage.style.visibility = "hidden";
//   }
// }
