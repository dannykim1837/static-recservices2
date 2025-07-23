/******************************************************************************
 ==============================================================================
 * Calendar.js
 * @description This script manages a weekly calendar view, allowing users to
 * create, edit, and delete events. It simulates a backend with a static
 * array of events and provides a user interface for interacting with the calendar.
 * @authors : @Calvinbullock @JosephTurgoose @midgitg1314 @sowbyspencer @Tnargw
 * @todo
 * - Implement backend API calls for event CRUD operations
 * - Handle concurrent events and display them appropriately
 * - Add validation for event times and prevent overlapping events
 * - Improve user interface for better usability
 *
 * - how do we want to prevent events outside of range?
 * - how do we want to deal with and display concurrent events?
 * - should we have an "edit" button popup when clicking existing events instead of going straight to editing/deleting?
 * - >with explicit set/delete buttons only and no "close" x button?
 ==============================================================================
 *****************************************************************************/

// =============================
// 1. CONSTANTS & DOM REFERENCES
// =============================
// DOM elements for popups, buttons, and form fields
// === Popups and Popup Controls ===
let popup = document.getElementById(`popup`);
let popupDay = document.getElementById(`popupDay`);
let popupCreate = document.getElementById(`popupCreate`);
let closeButtons = [...document.getElementsByClassName(`close`)];
let closeButtonDay = document.getElementsByClassName(`closeDay`)[0];

// === Event Form Fields ===
let setDate = document.getElementById(`setDate`);
let setName = document.getElementById(`setName`);
let setDescription = document.getElementById(`setDescription`);
let setStartTime = document.getElementById(`setStartTime`);
let setEndTime = document.getElementById(`setEndTime`);

/**
 * For when frontend is connected to a backend
 * @todo
 * - Add fields for `up_for_trade` and `employeeID` when creating/editing events
 **/
// let up_for_trade = document.getElementById(`up_for_trade`);
// let employeeID = document.getElementById(`employeeID`);

// === Event Form Buttons ===
let createEventButton = document.getElementById(`createEventButton`);
let setEventButton = document.getElementById(`setEventButton`);
let deleteEventButton = document.getElementById(`deleteEventButton`);

// === Navigation Buttons and Displays ===
let prevWeekButton = document.getElementById(`prev__week`);
let nextWeekButton = document.getElementById(`next__week`);
let currentWeekDisplay = document.getElementById(`current__week`);
let openButton = document.getElementById(`openWindow`);
let openButtonDay = document.getElementById(`openWindowDay`);

// Calendar grid offsets for correct placement
const COLUMN_OFFSET = 3; // which column is Sunday (day = 0)
const ROW_OFFSET = -4; // which row is 12am (hour = 0)

// =============================
// 2. EVENT DATA & MODELS
// =============================
let hourDifference = 1; // Used for time input helpers

// Event storage (simulates backend)
/******************************************************************************
 * allEvents
 * @description This array simulates a backend storage for events. It contains
 * a list of JSON strings representing ScheduledEvent objects.
 * @type {string[]}
 * @example
 * let allEvents = [
 *  JSON.stringify(new ScheduledEvent("Meeting", "Discuss project", new Date(), 10, 30, 11, 30)),
 * // Creates an event named "Meeting" on the current date, starting at 10:30 and ending at 11:30
 * ];
 * @todo This should be replaced with data from SupaBase database.
 * @note The events are stored as JSON strings for easy serialization and deserialization.
 *****************************************************************************/
// let allEvents = [
//   JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 2, 22), 9, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 2, 23), 10, 0, 13, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 2, 24), 8, 0, 12, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 2, 25), 10, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 2, 30), 15, 0, 16, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 2, 22), 13, 0, 14, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 2, 24), 14, 0, 15, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 2, 26), 9, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 2, 27), 10, 0, 13, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 2, 28), 8, 0, 12, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 2, 29), 10, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 2, 30), 15, 0, 16, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 2, 26), 13, 0, 14, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 2, 28), 14, 0, 15, 0)),
//   JSON.stringify(new ScheduledEvent(`Sled Day`, `Mandatory!`, new Date(2025, 2, 29), 8, 0, 9, 0)),
//   JSON.stringify(new ScheduledEvent(`Orientation`, `For what? Who knows`, new Date(2025, 2, 30), 10, 0, 14, 0)),
//   JSON.stringify(new ScheduledEvent(`Slang Workshop`, `Get the older folks up to date`, new Date(2025, 3, 1), 15, 0, 16, 30)),
//   JSON.stringify(new ScheduledEvent(`Spoon + Egg Race`, `Winner gets a Hoverboard`, new Date(2025, 3, 3), 10, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Web Engineering Meeting`, `Learn from spiders`, new Date(2025, 3, 4), 11, 0, 12, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 1`, `Blah blah`, new Date(2025, 3, 6), 9, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 2`, `Beep boop`, new Date(2025, 3, 7), 10, 0, 13, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 3`, `Foo bar`, new Date(2025, 3, 8), 8, 0, 12, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 4`, `Fizz buzz`, new Date(2025, 3, 9), 10, 0, 11, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 5`, `Plz let me graduate`, new Date(2025, 3, 11), 15, 0, 16, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 6`, `Plz give me job`, new Date(2025, 3, 6), 13, 0, 14, 0)),
//   JSON.stringify(new ScheduledEvent(`Example 7`, `Thx`, new Date(2025, 3, 8), 14, 0, 15, 0)),
// ];

let events = []; // Events for the current week
var currentWeek = new Date(); // Tracks the current week being viewed

// Track the event currently being edited (null if creating new)
let editingEvent = null;

// Event object constructor
// startHour and endHour are 24-hour time (0-23), startMin and endMin are 0-59
/******************************************************************************
 * ScheduledEvent
 * @description Constructor for creating a new ScheduledEvent object
 * @param {string} name - The name of the event
 * @param {string} description - The description of the event
 * @param {Date} date - The date of the event
 * @param {number} startHour - The starting hour of the event (0-23)
 * @param {number} startMin - The starting minute of the event (0-59)
 * @param {number} endHour - The ending hour of the event (0-23)
 * @param {number} endMin - The ending minute of the event (0-59)
 * @returns {ScheduledEvent} - A new ScheduledEvent object
 * @example
 * let myEvent = new ScheduledEvent("Meeting", "Discuss project", new Date(), 10, 30, 11, 30);
 * // Creates an event named "Meeting" on the current date, starting at 10:30 and ending at 11:30
 *****************************************************************************/

//   shifts: {
//   id: 999, // Use a high number to avoid PK conflict; required
//   created_at: new Date().toISOString(), // optional, will be ignored if default is set in DB
//   start_time: new Date().toISOString(), // optional, allow null
//   end_time: new Date(Date.now() + 3600000).toISOString(), // 1 hour later, optional, allow null
//   up_for_trade: false, // optional, allow null
//   duration: 60, // optional, allow null (e.g., 60 minutes)
// },

function ScheduledEvent(
  //name = `New Event`,
  //description = `Event Details`,
  //date = new Date(),
  id = 0,
  start_time = (date.getHours() + 1) % 24,
  end_time = (start_time + 1) % 24,
  up_for_trade = false, // For when the field is added in the frontend
  duration = 240,
  clock_in_time = null,
  clock_out_time = null,
  clocked_duration = null,
  employeeID = `` // For when the field is added in the frontend
) {
  return {
    //name: name,
    //description: description,
    //date: date,
    id: id,
    start_time: start_time,
    end_time: end_time,
    up_for_trade: up_for_trade, // For when the field is added in the frontend
    duration: duration,
    clock_in_time: clock_in_time,
    clock_out_time: clock_out_time,
    clocked_duration: clocked_duration,
    employeeID: employeeID, // For when the field is added in the frontend
  };
}

// =============================
// 3. HELPER FUNCTIONS
// =============================

/******************************************************************************
 * PAD
 * @description Pads a number to two digits (e.g., 7 -> '07')
 * @param {number} item - The number to pad
 * @returns {string} - The padded number as a string
 * @example pad(7); // Returns '07'
 *****************************************************************************/
function pad(item) {
  return String(item).padStart(2, `0`);
}

/******************************************************************************
 * JSONtoEvent
 * @description Converts a JSON string to a ScheduledEvent object
 * @param {string} event - The JSON string of the event
 * @returns {ScheduledEvent} - The ScheduledEvent object
 *****************************************************************************/
function JSONtoEvent(event) {
  let parsed = JSON.parse(event);
  let newEvent = new ScheduledEvent(
    parsed[`name`],
    parsed[`description`],
    new Date(parsed[`date`]),
    Number(parsed[`startHour`]),
    Number(parsed[`startMin`]),
    Number(parsed[`endHour`]),
    Number(parsed[`endMin`])
  );
  return newEvent;
}

/******************************************************************************
 * createNewEventInDataBase
 * @description Sends the event data to the backend API to save it
 * @param {ScheduledEvent} event - The event to send
 * @returns {Promise<void>} - A promise that resolves when the event is sent
 * @example
 * createNewEventInDataBase(new ScheduledEvent("Meeting", "Discuss project", new Date(), 10, 30, 11, 30));
 * // Sends the event data to the backend API
 *****************************************************************************/
async function createNewEventInDataBase(event) {
  try {
    const response = await fetch(`http://localhost:3000/shifts`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Event saved successfully:`, data);
  } catch (error) {
    console.error(`Error saving event:`, error);
  }
}

/******************************************************************************
 * updateNewEventInDataBase
 * @description Updates an existing event in the backend API
 * @param {ScheduledEvent} event - The event to update
 * @returns {Promise<void>} - A promise that resolves when the event is updated
 * @example
 * updateNewEventInDataBase(new ScheduledEvent("Meeting", "Discuss project", new Date(), 10, 30, 11, 30));
 * // Updates the event data in the backend API
 *****************************************************************************/
async function updateNewEventInDataBase(event) {
  try {
    let id = event.id || 20; // Default ID for testing
    const response = await fetch(`http://localhost:3000/shifts/` + id, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Event saved successfully:`, data);
  } catch (error) {
    console.error(`Error saving event:`, error);
  }
}

// Function just for an example testing
function updateRow() {
  const event = { id: 20, up_for_trade: true };
  updateNewEventInDataBase(event);
}
// updateRow(); // Call this function to test updating an event just for testing

// =============================
// 4. EVENT CRUD FUNCTIONS
// =============================

// Adds a new event or updates an existing one from the popup form
/******************************************************************************
 * createEvent
 * @description This function collects the event details from the form fields,
 * creates a new ScheduledEvent object, and either adds it to the allEvents
 * array or updates an existing event. If an event is being edited, it removes
 * the old event first.
 * @example createEvent(); // Saves the event data from the form fields
 * @todo This function should convert to route to a backend API call to save
 * he event data into the SupaBase database.
 *****************************************************************************/
function createEvent() {
  popupCreate.style.display = `none`;
  const startTime = String(setStartTime.value).split(`:`);
  const endTime = String(setEndTime.value).split(`:`);

  let event = new ScheduledEvent(
    setName.value || "New Event",
    setDescription.value || "Event Details",
    setDate.value ? new Date(setDate.value.replace(/-/g, "/").replace(/T.+/, "")) : new Date(),
    Number(startTime[0]) || (new Date().getHours() + 1) % 24,
    Number(startTime[1]) || 0,
    Number(endTime[0]) || (new Date().getHours() + 2) % 24,
    Number(endTime[1]) || 0
  );

  if (editingEvent) {
    // Update: remove the old event, then add the new one
    // let deleteIndex = allEvents.findIndex(function (e) {
    //   let ev = JSONtoEvent(e);
    //   return (
    //     ev.startHour == editingEvent.startHour &&
    //     ev.endHour == editingEvent.endHour &&
    //     ev.date.toString() == editingEvent.date.toString() &&
    //     ev.name == editingEvent.name &&
    //     ev.description == editingEvent.description
    //     // ev.up_for_trade == editingEvent.up_for_trade &&
    //     // ev.employeeID == editingEvent.employeeID
    //   );
    // });
    //if (deleteIndex !== -1) allEvents.splice(deleteIndex, 1);
  }
  // @todo: This is where it would send the event to the backend API
  // an async function with fethch will the url and the event data
  //createNewEventInDataBase(event);

  //allEvents.push(JSON.stringify(event));

  editingEvent = null;
  setView(); // Refresh calendar view
}

// this whole function is an exsample / test
function createEvent2() {
  const event = { id: 20 };
  createNewEventInDataBase(event);
}
// createEvent2(); // Call this function to test creating an event just for testing

// Deletes the event currently being edited
/******************************************************************************
 * handleDeleteEvent
 * @description This function checks if there is an event being edited. If so,
 * it finds the event in the allEvents array, removes it, and closes the popup.
 * @example handleDeleteEvent(); // Deletes the currently edited event
 * @todo This function should convert to route to a backend API call to delete
 * the event data from the SupaBase database.
 *****************************************************************************/
function handleDeleteEvent() {
  if (!editingEvent) return;
  // let deleteIndex = allEvents.findIndex(function (e) {
  //   let ev = JSONtoEvent(e);
  //   return (
  //     ev.startHour == editingEvent.startHour &&
  //     ev.endHour == editingEvent.endHour &&
  //     ev.date.toString() == editingEvent.date.toString() &&
  //     ev.name == editingEvent.name &&
  //     ev.description == editingEvent.description
  //   );
  // });
  // if (deleteIndex !== -1) allEvents.splice(deleteIndex, 1);
  popupCreate.style.display = `none`;
  editingEvent = null;
  setView();
}

// Opens the event creation/edit popup and fills it with event data
/******************************************************************************
 * openEvent
 * @description This function opens the event creation popup. If an event is
 * passed, it fills the form fields with the event's data for editing. If no
 * event is passed, it sets default values for a new event.
 * @param {ScheduledEvent|null} event - The event to edit, or null
 * @return {void}
 * @example
 * openEvent(); // Opens the popup for creating a new event
 * openEvent(existingEvent); // Opens the popup for editing an existing event
 * @todo Add `up_for_trade` and `employeeID` fields to the event creation form
 *****************************************************************************/
function openEvent(event = null) {
  popupCreate.style.display = `block`;
  if (event) {
    editingEvent = event;
    setStartTime.value = `${pad(event.startHour)}:${pad(event.startMin)}`;
    setEndTime.value = `${pad(event.endHour)}:${pad(event.endMin)}`;
    setDate.value = `${event.date.getFullYear()}-${pad(event.date.getMonth() + 1)}-${pad(event.date.getDate())}`;
    setName.value = event.name;
    setDescription.value = event.description;
    // For when the fields are added in the frontend
    // up_for_trade.checked = event.up_for_trade; // Assuming up_for_trade is a boolean
    // employeeID.value = event.employeeID; // Assuming employeeID is a string
    deleteEventButton.style.display = "";
  } else {
    editingEvent = null;
    // Set default values for new event
    let now = new Date();
    setStartTime.value = pad((now.getHours() + 1) % 24) + ":00";
    setEndTime.value = pad((now.getHours() + 2) % 24) + ":00";
    setDate.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    setName.value = "New Event";
    setDescription.value = "Event Details";
    // For when the fields are added in the frontend
    // up_for_trade.checked = event.up_for_trade; // Assuming up_for_trade is a boolean
    // employeeID.value = event.employeeID; // Assuming employeeID is a string
    deleteEventButton.style.display = "none";
  }
}

// =============================
// 5. CALENDAR VIEW FUNCTIONS
// =============================

// Sets the current week to Sunday and loads events for that week
/******************************************************************************
 * setView
 * @description This function sets the current week to the Sunday of the
 * current week, updates the display with the current week range, and loads
 * events for that week.
 * @example setView(); // Sets the calendar view to the current week
 *****************************************************************************/
function setView() {
  // Set date to the Sunday of the current week
  currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay());
  let endDate = new Date(currentWeek);
  endDate.setDate(currentWeek.getDate() + 6);
  currentWeekDisplay.innerHTML = `
    ${currentWeek.getMonth() + 1}/
    ${currentWeek.getDate()}-
    ${endDate.getMonth() + 1}/
    ${endDate.getDate()}\t
    ${endDate.getFullYear()}
  `;
  loadEvents();
}

// Loads events for the current week and displays them in the grid
/******************************************************************************
 * loadEvents
 * @description This function clears the current calendar view, retrieves
 * events for the current week, and displays them in the calendar grid. It also
 * hides the cells that are occupied by events.
 * @example loadEvents(); // Loads and displays events for the current week
 *****************************************************************************/
function loadEvents() {
  // Remove all existing event elements
  document.querySelectorAll(`.event`).forEach((event) => event.parentElement.removeChild(event));
  // Show all cells (reset grid)
  document.querySelectorAll(`.cell`).forEach((cell) => (cell.style.display = `flex`));

  // Get events for the current week
  let endDate = new Date(currentWeek);
  endDate.setDate(currentWeek.getDate() + 6);
  events = getEventsRequest(currentWeek, endDate);

  // For each event, create a div and place it in the grid
  events.forEach((event) => {
    let newEvent = document.createElement(`div`);
    newEvent.className = `event`;
    newEvent.innerHTML = `<h4>${event.name}</h4>\n                            <p>${event.startHour}:${pad(
      event.startMin
    )}-\n                            ${event.endHour}:${pad(event.endMin)}</p>`;
    // Set grid position
    newEvent.style.gridColumn = `${event.date.getDay() + COLUMN_OFFSET - 1}/${event.date.getDay() + COLUMN_OFFSET}`;
    newEvent.style.gridRow = `${event.startHour + ROW_OFFSET}/${event.endHour + ROW_OFFSET + 1}`;

    // On click: open event in popup for editing (do not delete here)
    newEvent.addEventListener(`click`, function () {
      openEvent(event);
    });

    document.querySelector(`.week__view`).appendChild(newEvent);

    // Hide the cells that this event occupies
    // cell 0 == day 0 hour 7 ... sunday 7am, the first cell on the calendar
    // find the right `row` ((event.startHour-7) * 7 ), then go `day of week` cells over (+ event.date.getDay())
    let cells = document.querySelectorAll(`.cell`);
    for (let difference = event.endHour - event.startHour; difference >= 0; difference -= 1) {
      cells[(event.startHour + difference - 7) * 7 + event.date.getDay()].style.display = `none`;
    }
  });
}

// Retrieves events for a given week from the fake backend
/******************************************************************************
 * getEventsRequest
 * @description This function retrieves events from the allEvents array that
 * fall within the specified date range (startDate to endDate).
 * @param {Date} startDate - The start date of the week
 * @param {Date} endDate - The end date of the week
 * @returns {ScheduledEvent[]} - An array of ScheduledEvent objects for the week
 * @example
 * getEventsRequest(new Date(2025, 2, 22), new Date(2025, 2, 28));
 * @todo This function should convert to route to a backend API call to
 * retrieve the events from the SupaBase database.
 *****************************************************************************/
function getEventsRequest(startDate, endDate) {
  let returningEvents = [];
  // allEvents.forEach((raw_event) => {
  //   let event = JSONtoEvent(raw_event);
  //   // The 10000 * 10000 is a hack to not miss Sunday events (JS date quirks)
  //   if (startDate.valueOf() <= event.date.valueOf() + 10000 * 10000 && event.date.valueOf() <= endDate.valueOf()) {
  //     returningEvents.push(event);
  //   }
  // });
  return returningEvents;
}

// =============================
// 6. TIME INPUT HELPERS
// =============================

// Ensures end time is not before start time
/******************************************************************************
 * setDifference
 * @description This function checks the start and end time inputs. If the end
 * time is earlier than the start time, it adjusts the end time to be at least
 * the same as the start time. It also updates the hourDifference variable.
 * @example setDifference(); // Adjusts the end time based on the start time
 *****************************************************************************/
function setDifference() {
  const startTime = String(setStartTime.value).split(`:`);
  let endTime = String(setEndTime.value).split(`:`);
  if (Number(endTime[0]) < Number(startTime[0])) endTime[0] = startTime[0];
  if (Number(endTime[0]) == Number(startTime[0]) && Number(endTime[1]) < Number(startTime[1])) endTime[1] = startTime[1];
  setEndTime.value = `${pad(endTime[0])}:${pad(endTime[1])}`;
  hourDifference = Number(endTime[0]) - Number(startTime[0]);
}

// Keeps the hour difference between start and end time
/******************************************************************************
 * keepDifference
 * @description This function adjusts the end time to maintain the hour
 * difference from the start time. If the start time is changed, it updates the
 * end time accordingly.
 * @example keepDifference(); // Adjusts the end time based on the start time
 *****************************************************************************/
function keepDifference() {
  const startTime = String(setStartTime.value).split(`:`);
  const endTime = String(setEndTime.value).split(`:`);
  setEndTime.value = `${pad((Number(startTime[0]) + hourDifference) % 24)}:${endTime[1]}`;
}

// =============================
// 7. EVENT LISTENERS & INIT
// =============================

// Close popups when clicking X
closeButtons.forEach(
  (closeButton) =>
    (closeButton.onclick = function () {
      popup.style.display = `none`;
      popupCreate.style.display = `none`;
    })
);

// Close popup at click outside the popup (main)
window.onclick = function (event) {
  if (event.target == popup) {
    popup.style.display = `none`;
  }
  // Also handle day popup if present
  if (event.target == popupDay) {
    popupDay.style.display = `none`;
  }
};

// Open event creation popup
createEventButton.onclick = function () {
  openEvent();
};

// Week navigation buttons
nextWeekButton.addEventListener(`click`, function () {
  currentWeek.setDate(currentWeek.getDate() + 7);
  setView();
});
prevWeekButton.addEventListener(`click`, function () {
  currentWeek.setDate(currentWeek.getDate() - 7);
  setView();
});
setEventButton.addEventListener(`click`, createEvent);
// deleteEventButton.onclick = handleDeleteEvent;

// Time input helpers
setStartTime.addEventListener(`input`, keepDifference);
setEndTime.addEventListener(`input`, setDifference);

// Initialize calendar view on page load
setView();
