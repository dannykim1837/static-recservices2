# Backend Checklist For Fall Semester:

**Note: Remember to turn on RLS in the database when testing user-role-specific functionalities**

* Calendar Page:
  * Remove functionality to create and edit shifts if the user doesn't have permission as determined by their role in Supabase
  * Erase timeClock.css and timeClock.jsx files.  We will merge them with this file
  * Create a button to filter for either employee schedules or events
  * The database team may need to create a new table in Supabase for events
  * Add location information to shift details
  * Add functionality to export calendar data as a csv file.
  * Change time intervals for new or edited shifts to every 5 minutes, instead of every 1 minute
  * System for viewing when a user clocked in/out and determining their work status (late/missing) based on those times.
* Test all files - ensure all login functionalities are working properly
* Dashboard Page:
  * Allow user to accpet shifts that have been approved for trade
  * Allow user to request to put their own shifts up for trade
    * Managers and Admins should have access to a page displaying these requests.  They should be able to approve or deny requests.
    * Employees should receive a notification or similar feedback when their shift is approved
  * Show user the next (or current) upcoming event that involves them
* Meet with customer representatives to determine additional features and requirements
  * Have them test the app when it's working to provide feedback
* Add additional pages as needed
* Allow users to reset their password (Login Page)
* Add some functionality to determine roles in the app.  Everyone should start an employee and admins can promote them through their profile page or an alternative page.
 
* **Other information from customer:**
  * How should conflicts be handled (like double-booking or rule-breaking)
    -	Double booking (warning with details of the other shift, meetings are fine)
    -	Approve/deny
    -	Don’t worry about rule breaking
  * What different types of alerts do we need to have?
    -	Late notifications, double-booking notifications, 
    -	If someone doesn’t make it, is it a no show or sick callout?  That shift can be made available.
    -	If you are more than 15-25 minutes late, it will count as a no-show, otherwise it’s just late.  If they do show up, managers can change no-show to late.
  * Admins can change settings (how many minutes before a shift can people clock in, etc…)
  * Admins and managers can change schedule limits/settings, rearrange shifts, etc…
  * *Possible* new role: Coordinators.  Only they (and managers) can view the shift information of all employees.  Employees would then only have access to their own schedule as well as the shifts that are put up for trade.  Confirm with customer before implementing this role.
