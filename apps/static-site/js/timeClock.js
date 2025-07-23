/*** CREATE TIME CLOCK DOM ELEMENTS ***/

const employeeList = document.getElementById("employeeList");

// Create TimeClockEvent with data
function createTimeClockEvent(elm, event_data) {
    // Create each element, adding the class tag

    // Employee Name
    let employeeName = document.createElement('h4');
    employeeName.classList.add("timeClockEvent__employeeName");
    employeeName.innerHTML = event_data["employeeName"];
    elm.appendChild(employeeName);

    // Date
    let date = document.createElement('h4');
    date.classList.add("timeClockEvent__date");
    date.innerHTML = event_data["date"];
    elm.appendChild(date);

    // Location
    let location = document.createElement('h4');
    location.classList.add("timeClockEvent__location");
    location.innerHTML = event_data["location"];
    elm.appendChild(location);

    // Position
    let position = document.createElement('h4');
    position.classList.add("timeClockEvent__position");
    position.innerHTML = event_data["position"];
    elm.appendChild(position);

    // Shift Start
    let shiftStart = document.createElement('h4');
    shiftStart.classList.add("timeClockEvent__shiftStart");
    shiftStart.innerHTML = event_data["shiftStart"];
    elm.appendChild(shiftStart);

    // Clock In
    let clockIn = document.createElement('h4');
    clockIn.classList.add("timeClockEvent__clockIn");
    clockIn.innerHTML = event_data["clockIn"];
    elm.appendChild(clockIn);

    // Clock Out
    let clockOut = document.createElement('h4');
    clockOut.classList.add("timeClockEvent__clockOut");
    clockOut.innerHTML = event_data["clockOut"];
    elm.appendChild(clockOut);

    // Shift End
    let shiftEnd = document.createElement('h4');
    shiftEnd.classList.add("timeClockEvent__shiftEnd");
    shiftEnd.innerHTML = event_data["shiftEnd"];
    elm.appendChild(shiftEnd);

    // Duration
    let duration = document.createElement('h4');
    duration.classList.add("timeClockEvent__duration");

    // TODO: innerHTML = clockOut - clockIn 
    duration.innerHTML = "- hours";
    elm.appendChild(duration);

    // Pay Estimate
    let payEstimate = document.createElement('h4');
    payEstimate.classList.add("timeClockEvent__payEstimate");

    // TODO: innerHTML = duration * payRate
    payEstimate.innerHTML = "$-.--";
    elm.appendChild(payEstimate);

}

// For each set of Employee data (Employee and their Time Clock Events), create DOM elements
function createEmployee(data) {
    let employee = document.createElement('div');
    employee.classList.add("employee");

    // Create "Employee Summary" section
    let employeeSummary = document.createElement('div');
    employeeSummary.classList.add("employee__summary");

    // Show Employee's name within summary
    let employeeName = document.createElement('h3');
    employeeName.innerHTML = data["name"];
    employeeName.classList.add("employee__name");

    // Create dropdown button
    let dropdown = document.createElement('button');
    dropdown.classList.add("dropdown");
    dropdown.textContent = "+";

    // Add dropdown toggle (show/hide Employee's Time Clock Events)
    dropdown.addEventListener('click', function () {
        // Find "timeClockEvents" section
        let employee = this.parentElement.parentElement;
        let tce = employee.querySelector(".timeClockEvents");

        hideToggle(tce);

        // icon toggle
        this.textContent = tce.classList.contains('hide') ? "+" : "-";
    });

    employeeSummary.appendChild(employeeName);
    employeeSummary.appendChild(dropdown);

    employee.appendChild(employeeSummary);

    // Create "Time Clock Events" section
    let timeClockEvents = document.createElement('div');
    timeClockEvents.classList.add("timeClockEvents");
    if (data["name"] !== "First Last") {
        timeClockEvents.classList.add("hide");
    } else {
        dropdown.textContent = "-";
    }

    // For each timeClockEvent,
    data["events"].forEach(function (event_data) {
        // Create the "Time Clock Event" item
        let timeClockEvent = document.createElement('div');
        timeClockEvent.classList.add("timeClockEvent");

        // Add DOM elements using event_data
        createTimeClockEvent(timeClockEvent, event_data);

        timeClockEvents.appendChild(timeClockEvent);
    });

    employee.appendChild(timeClockEvents);
    employeeList.appendChild(employee);
}


// TEMP: Test data to diplay events
let JSON_data_test = {
    "Employees": [
        {
            "name": "First Last",
            "events": [
                {
                    "employeeName": "First Last",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "First Last",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "First Last",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                }
            ]
        },
        {
            "name": "My Name Is",
            "events": [
                {
                    "employeeName": "My Name Is",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                }
            ]
        },
        {
            "name": "Best Employee",
            "events": [
                {
                    "employeeName": "Best Employee",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "Best Employee",
                    "date": "March 25",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "Best Employee",
                    "date": "March 26",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "Best Employee",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                },
                {
                    "employeeName": "Best Employee",
                    "date": "March 24",
                    "location": "Rec Services",
                    "position": "Lifeguard Temp",
                    "shiftStart": "10:00 AM",
                    "clockIn": "9:55 AM",
                    "clockOut": "11:55 AM",
                    "shiftEnd": "12:00 PM",
                    "payRate": "22"
                }
            ]
        }
    ]
}

// The current format of event data
// NOTE: Add/remove shown elements in the createTimeClockEvent() function
const sample_event = {
    "employeeName": "First Last",
    "date": "March 24",
    "location": "Rec Services",
    "position": "Lifeguard Temp",
    "shiftStart": "10:00 AM",
    "clockIn": "9:55 AM",
    "clockOut": "11:55 AM",
    "shiftEnd": "12:00 PM",
    "payRate": "22"
}

// Create HTML elements to display info for each Employee and their TimeClockEvents
JSON_data_test["Employees"].forEach(function (employee) {
    //console.log(employee);
    createEmployee(employee);
});

// For the given element, add or remove the "hide" class
function hideToggle(elm) {
    if (elm.classList.contains('hide'))
        elm.classList.remove('hide');
    else
        elm.classList.add('hide');
}


/*** FILTERS ****/

const filters = document.querySelectorAll(".timeClockFilter");

// Show/Hide columns based on which checkboxes are checked
filters.forEach(function (checkbox) {
    checkbox.addEventListener('change', function (event) {
        let columnClass = checkbox.value;
        let displayStyle = event.target.checked ? 'block' : 'none'; // Change 'block' to default display style of these elements

        //console.log(`Column ${columnClass} will be display: ${displayStyle}`)

        const columnElements = document.querySelectorAll("." + columnClass);
        columnElements.forEach(elm => elm.style.display = displayStyle);
    });
});

// Have certain columns default shown/hidden
const defaultShow = ["timeClockEvent__shiftStart", "timeClockEvent__shiftEnd", "timeClockEvent__duration"]
filters.forEach(function (checkbox) {
    // If value in default show,
    if (defaultShow.includes(checkbox.value)) {
        checkbox.checked = true;
    }
    else {
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change')); // Update hidden columns
    }
});