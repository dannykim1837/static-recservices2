let btns = document.getElementsByClassName("pinpad-btn");
let pinInput = document.getElementById("pinpad-input");
let pinLength = 4;

// Ensure focus is put back on the PIN input after the window is changed back
window.addEventListener('focus', function () {
    // Refocus to pin input
    pinInput.focus();
});

// Check and submit the PIN
function submitPIN() {
    // Ensure there is input in the box
    if (!pinInput || !pinInput.value || pinInput.value === "") {
        alert("Please enter a PIN first");
    }
    // Ensure the PIN is a certain number of digits long
    else if (pinInput.value.length < pinLength) {
        alert(`Please enter a ${pinLength} digit PIN`);
    }
    // Ensure only numbers are used
    else if (/[^0-9]/.test(pinInput.value)) {
        alert("Please enter only numbers");
    }
    // PIN is in correct format,
    else {
        // alert("Thanks for your PIN " + pinInput.value + " :)");

        // Send HTTP Request to clock-in/clock-out Employee, get shift information
        // TODO: Add request call here

        // Depending on the server response,
        if (false /* There is an Employee */) {
            if (true /* Employee is not clocked-in */) {
                if (true /* Employee has a scheduled Shift */) {
                    alert("Show clock-in prompt, with Employee and Shift info")
                    showClockIn();
                }
                else {
                    // Employee is not clocked-in and doesn't have a scheduled shift
                    alert("Show \"No upcoming shifts\"");
                    showNoShifts();
                }
            }
            else {
                // Employee is currently clocked-in
                alert("Show clock-out prompt");
                showClockOut();
            }
            return;
        }
        else {
            // There is no Employee associated with the user-entered PIN
            alert("Invalid PIN");
        }
    }

    // Reset the input
    pinInput.value = "";

    // Refocus to PIN input
    pinInput.focus();
}

// If there is something in the input box, delete one character from the end
function deleteFromInput() {
    // If there is a value in the input box
    if (pinInput.value) {
        // Remove the last character from the input
        pinInput.value = pinInput.value.substr(0, pinInput.value.length - 1);

        // Refocus to PIN input
        pinInput.focus();
    }
}

// Allow input with the keyboard to be directed to the input box
document.addEventListener('keyup', (e) => {
    // If a number key is pushed,
    if (/[0-9]/g.test(e.key)) {
        // If not focused on the input box, focus
        if (document.activeElement != pinInput) {
            pinInput.focus();
        }
    }
    // If the delete key is pushed,
    else if (e.key == "Delete") {
        // If not focused on the input box, call function (otherwise deletes like normal)
        if (document.activeElement != pinInput) {
            deleteFromInput();
        }
    }
    // If the enter key is pushed,
    else if (e.key == "Enter") {
        submitPIN();
    }
});

// Add event listeners for each button
for (let i = 0; i < btns.length; i++) {
    let btn = btns.item(i);

    // For buttons that have an id, there are different eventListeners
    if (btn.id) {
        // For the submit button, call submitPIN
        if (btn.id === "submit-btn") { btn.addEventListener("click", () => { submitPIN() }); }
        // For the delete button, call deleteFromInput
        else if (btn.id === "delete-btn") { btn.addEventListener("click", () => { deleteFromInput() }); }
    }
    else {
        // For buttons without an id (all the number buttons),
        btn.addEventListener("click", (e) => {
            // Refocus to PIN input
            pinInput.focus();

            // If the input box is not full,
            if (pinInput.value.length < pinLength) {
                // Add value to the input
                pinInput.value += e.target.value;
            }
        });
    }
}

// TODO: Show/hide page sections, where parameter 'show' is true/false
function showClockIn(show) { } // The screen shown to prompt the user to clock-in, showing additional shift information (Shift title, timeStart, timeEnd, how long until the shift starts/how long it has been since the start)
function showClockOut(show) { } // The screen shown to prompt the user to clock-out
function showNoShifts(show) { } // The screen shown when the Employee is not scheduled
function showSuccessfulClockEvent() { } // The screen shown after an Employee clocks in or out, goes back to main Kiosk screen after 1-2 seconds