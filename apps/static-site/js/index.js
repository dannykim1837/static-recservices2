// index.html is the default GitHub page, start on login page
window.location = "login.html";

// TODO: Add logic for checking if the user is currently logged in
// Logged in - "dashboard.html", not logged in - "login.html"

// Redirect to login if session isn't active
// Would be called when loading each page
function checkSessionState() {
    // Get the sessionID/cookie from the browser

    // Send to the backend to confirm if the session is still active
    // Send an HTTP POST/PATCH request with the sessionID and current time to update/extend session
    // route = "session"? httpType = "POST", body = { "sessionID" : sessionID, "time" : Date() }
    activeSession = false; // Depending on HTTP response value

    // If not active, redirect to the login page
    if (!activeSession) {
        window.location = "login.html"
    }
}