import {supabase} from "./supabase.js";

async function addEmployee() {
    const {data, error} = await supabase
    .from("Employee")
    .insert([ // This can be a list if you want to add more than one person.  If not, you can remove the brackets
        {
            userID: '1239',
            firstName: 'Jeremy_Test',
            lastName: 'Doe',
            email: 'justjeremy@example.com',
            active: true,
            location: 1,
            position: 2,
            shift: null
        }
    ]).select(); // .select() is used to return row info so that it can be displayed in the following console.log calls

    console.log("Data:", data);
    console.log("Error:", error);
}

async function removeEmployee() {
    const Employee = await supabase.from("Employee").delete().eq("userID", 1239); // .eq applies this operation only to cases where "userID" is equal to 1239
}



function fetchEmployees()
{
      fetch('http://localhost:3000/employees')
    .then(response => response.json())
    .then(data => {
      console.log(data); // handle the employee data here
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
    });
}
fetchEmployees();


///// FUNCTIONS
/*


.insert(*contents, as shown above*) // add row

.delete() // remove row(s).  Use filters as shown above

.select("*"); // Reads data.  "*" gets all data.  To get specific columns, use something like this: select("id, userID, firstName, lastName, email")

.update({firstname: John}).eq(id, 1); // this specific example changes the first name of the first user in the table to John

SQL functions also work!!!


*/