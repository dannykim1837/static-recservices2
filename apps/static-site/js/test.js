//import { URL } from variables.js;
// ERROR: Having issues importing variables, "Cannot use import statement outside a module"

const urlEndingInput = document.getElementById("urlEnding");
const httpTypeInput = document.getElementById("httpType");
const bodyJSONInput = document.getElementById("bodyJSON");
const url = "https://recservices.onrender.com/api/";
//const localhost = "http://127.0.0.1:5500/"; // Change to whatever IP/port the back end is hosted on

// TODO: Make a map/dictionary with option number, name of option, then add a switch statement in "get custom body"
const bodyOptions = { 0: "Reset Employee 6", 1: "Update Employee 6", 2: "Add new Employee" };

const showResponse = document.getElementById("response__output");
const showResponseBox = document.getElementById("response__box");

/***** HTTP Requests Testing Functions *****/

// Get the tester-entered URL
function getCustomURL() {
  // TODO: fix possible incorrect inputs: no whitespace, already stars with a /

  return urlEndingInput.value;
}

// Get the tester-entered HTTP Request type
function getCustomHTTPType() {
  if (!httpTypeInput) {
    console.log("Test page is missing httpTypeInput field")
    return "GET"; // Invalid setup, just do a GET request
  }
  else if (!httpTypeInput.value) {
    console.log("no value");
    return "GET"; // No value entered 
  }
  else {
    // Get the user-inputed text
    let httpType = httpTypeInput.value;

    // Must be alpha characters only
    if (!(/^[a-zA-Z]+$/.test(httpType))) {
      console.log("non-alpha character");
      return "GET"; // Invalid input, just do a GET request
    }

    // Clean up the text
    httpType = httpType.toUpperCase().trim();

    // Must be these type of requests
    if (httpType == "GET" || httpType == "POST" || httpType == "PUT" || httpType == "PATCH" || httpType == "DELETE") {
      return httpType;
    }
    console.log(`Invalid input ${httpTypeInput.value} => ${httpType}`);
    return "GET"; // Invalid input, just do a GET request
  }
}

// TODO: Either let the tester type JSON freehand, use dummy data, or use a template (asks for relevant data)
function getCustomBody() {
  var bodyVal = "";
  // Convert from JSON to string
  //JSON.stringify({ key: 'value' });

  // TODO: Add switch statement based on Options (Get Employee's Shifts, Get Team's Shifts, Get Employee's UserInfo, etc)
  // TODO: Add Options which shows/hides certain input boxes for a type of request

  // or type all in bodyJSONInput

  // Login 
  /* { username: 'myUsername',
      password: 'password123'
  } */

  // Create Event


  // Event


  // Employee (reduced)
  /*{
    email: "test.employee@example.com",
    first_name: "Test",
    last_name: "Employee",
  }*/

  // Employee (Goal)
  /*{
    -employee_id: 1,   -                      // DB primary key <-- FE has no use for DB ids
    created_at: "2025-03-21T11:20:00.000Z", // Hire date
    updated_at: "2025-03-21T11:20:00.000Z", // Update tracking
    is_active: 1,                           // If the Employee is currently working this semester (true - 1/false - 0)
    
    email: "test.employee@example.com",     // Username and password reset/account recovery
    first_name: "Test",                     // Employee's first name
    last_name: "Employee",                  // Employee's last name
    

    location_ids: [ 1 ],                    // Primary key for location (same as team?) (send Request with id to get info from Location Table for more info)
    position_ids: [ 1 ]                     // Primary key for position (send Request with id to get info from Position Table for more info)
    
    OR (join before sending data. FE has no use for primary keys)
    positions : [ { title: "Lifeguard", assigned_date: "2025-03-21T11:20:00.000Z" ... }, { title: "Temp", assigned_date: "2025-03-21T11:20:00.000Z", ... } ]  
    }*/

  // Employee (current data)
  // New Employee
  JSON.stringify({
    created_at: "2025-03-21T11:20:00.000Z",
    email: "test.employee@example.com",
    employee_id: 1,
    first_name: "Test",
    is_active: 1,
    is_hourly: 1,
    is_salaried: 0,
    last_name: "Employee",
    location_id: 1,
    phone_number: "123-456-7890",
    position_id: 1,
    updated_at: "2025-03-21T11:20:00.000Z",
    user_id: null
  }
  );

  // Employee 6 (Original)
  JSON.stringify({
    created_at: "2025-03-10T21:26:45.000Z",
    email: "emily.carter@example.com",
    employee_id: 6,
    first_name: "Emily",
    is_active: 1,
    is_hourly: 1,
    is_salaried: 0,
    last_name: "Carter",
    location_id: 1,
    phone_number: "555-987-6543",
    position_id: 1,
    updated_at: "2025-03-10T21:26:45.000Z",
    user_id: null
  }
  );

  // Update Employee 6 (change phone number)
  // TODO with BE: Does ALL data need to be sent, or just what is going to be updated?
  JSON.stringify({
    created_at: "2025-03-10T21:26:45.000Z",
    email: "emily.carter@example.com",
    employee_id: 6,
    first_name: "Emily",
    is_active: 1,
    is_hourly: 1,
    is_salaried: 0,
    last_name: "Carter",
    location_id: 1,
    phone_number: "555-555-5555",
    position_id: 1,
    updated_at: "2025-03-10T21:26:45.000Z",
    user_id: null
  }
  );

  return bodyVal;
}

// Testing the format
// user's input --> sendRequest(input) --> return data (in JSON/dictionary) --> use data to modify the DOM
// GOAL: Use dummy data, can send various input and receive various output
// GOAL #2 (Week 12): Move functions to their .js files, use actual HTML elements to get/send data to
/* function example() {
  // Get info from the DOM elements
  let username = "userName" // getDocumentByID("username").value // Dummy here, actual within the login.js
  let password = "password123" // getDocumentByID("password").value
  
  // Send the HTTP Request and get a Response
  // HTTP Type, ending url, JSON String (can use JSON.stringify())
  let responseData = sendRequest("POST", "/account/login", `{ "username": ${username}, "password": ${password} }`);

  // Error Handling
  // What happens when there is an error, specific to page or type of request
  if(!responseData)
  {
    return; // Didn't get any data, not even an error message
  }
  else if (responseData.error) {
    // Show the error at the top of the page
    showError(responseData.error);
    return; // Can't work with no data
  }

  // Using Response data, put in DOM elements
  document.getElementById("firstName").value = responseData.first_name;

  // Request to get Events to display on the Calendar
  // If no Events returned,
  if(!responseData.events) {
    return;
  }

  // Create Events for the data recievd
  foreach(responseData.events) {
    createEvent(responseData.events.i);
  }
}
*/


// Send an HTTP request using Fetch
function sendRequest(httpType, urlEnding, body = "") {
  let sendURL = url + urlEnding

  // Log the request details
  console.log(`Sending ${httpType} HTTP Request to ${sendURL} with body \"${body}\"`);
  var dataResponse = "";

  // If the request needs a body,
  if (httpType != "GET") {
    fetch(sendURL, {
      method: httpType,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body // Only for methods like POST or PUT
    })
      .then(response => response.json())
      .then(data => {
        // Response data is handled here, asynchronus
        console.log(data);
        showResponseBox.value = JSON.stringify(data);
        return data;
      })
      .catch(error => {
        // Error handled here, also asynchronus
        console.error('Error:', error)
      });
  }
  // GET requests do not have a body
  else {
    fetch(sendURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add session/user-id for request context
      }
    })
      .then(response => response.json())
      .then(data => {
        // Response data is handled here, asynchronus
        console.log(data);
        showResponseBox.value = JSON.stringify(data);
        return data;
      }
      )
      .catch(error => {
        // Error handled here, also asynchronus
        console.error('Error:', error)
        // TODO: Add error handling, should have an alert or somehow let user know if a network error occured
        // Within general "sendRequest" function or specific to page/request function?
      });
  }

  // TODO: Add returns within the error messages, anywhere else?
  //return null;
}

// Change the type of request based on changes to the HTML page (TODO: Add more fields)
function sendCustomRequest() {
  sendRequest(getCustomHTTPType(), getCustomURL(), getCustomBody());
}

// Sends a request to get all Employees
function sendEmployeeRequest() {
  sendRequest("GET", "employees", "");

  /*let sendURL = url + "employees";
  console.log("Send request to " + sendURL + "for Employee data");

  // Both Fetch and XMLHttpRequest work, use either
  // Using Fetch API
  fetch(sendURL, {
    method: 'GET', // or 'POST', 'PUT', 'DELETE'
    headers: {
      'Content-Type': 'application/json'
      // Add session/user-id for request context
    }
    //, body: JSON.stringify({ key: 'value' }) // Only for methods like POST or PUT
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));*/
}


// XML format, Using fetch for now
function sendCustomRequestXML() {
  // Sends a request
  let customURL = getCustomURL();
  let httpType = getCustomHTTPType();
  console.log("Send request to ", customURL);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', customURL); // or 'POST', 'PUT', 'DELETE'
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Success:', JSON.parse(xhr.response));
    } else {
      console.error('Error:', xhr.status, xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error('Network Error');
  };
  // xhr.send(JSON.stringify({ key: 'value' })); // Only for POST/PUT requests
  xhr.send();
  /*
  // Using XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url); // or 'POST', 'PUT', 'DELETE'
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Success:', JSON.parse(xhr.response));
    } else {
      console.error('Error:', xhr.status, xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Network Error');
  };
  // xhr.send(JSON.stringify({ key: 'value' })); // Only for POST/PUT requests
  xhr.send();
  */
}