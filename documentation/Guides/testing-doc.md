# REC Services Testing Guide

## Scope
This document outlines the testing procedures for key functionalities of the REC Services website. The goal is to ensure the website is performing as expected and to identify any defects before deployment.

## Test Environment
* **Browser(s):** Tested on Chrome
* **URL:**  `http://localhost:3000/calendar`
* **Login Credentials (if applicable):** [Provide generic test user credentials or indicate where they can be found]

## General Testing Instructions
* For each test case, record the outcome (Pass/Fail) and any observations or errors encountered.
* If a test fails, provide detailed steps to reproduce the issue, screenshots, and relevant error messages.
* Clearly mark any deviations from expected behavior.

## Pages for Testing

### 1. Calendar Page

* **Test Case 1.1: Create New Task (Current Day/Time)**
    1. Click the "Add" button (or equivalent action to create a new event/task).
    2. Enter a descriptive task title (e.g., "Team Meeting").
    3. Select a time and date for the current day.
    4. Add two specific employees to the event (e.g., Employee A, Employee B).
    5. Save the event/task
    * **Expected Result:** The task should appear on the rows for each of the selected employees (e.g., Employee A, Employee B).
* **Test Case 1.2: Create New Task (Future and Past Day/Time)**
    1. Click the "Add" button (or equivalent action to create a new event/task).
    2. Enter a descriptive task title (e.g., "Team Meeting").
    3. Select a time and date for the in the future the week after the current (add 7 days).
    5. Save the event/task
    6. repeat steps 1 - 5 but subtract 7 days from current for the new event.
    * **Expected Result:** The tasks should appear on the rows for each of the selected employees 1 week in the past and 1 week in the future(e.g., Employee A, Employee B).
* **Test Case 1.3: Delete Task**
    1. click on any created task.
    2. scroll to the bottom of pop up select the "Delete" or the equivalent.
    * **Expected Result:** The tasks should be removed from the colander and database.

### Dashboard / Announcements
1. login using `/login` route
2. should see `Your Upcoming Shift (User Nmae)` and the list of upcoming shift events in the colander or `No upcoming shifts found for you.`

### login
2. should be able to enter password and login, *page will not indicate you are logged in yet*.

### timeClock
1. should display a page with placeholder data.

### userProfile
1. should display a page with placeholder data.

### kiosk
1. should display a page with placeholder data.

