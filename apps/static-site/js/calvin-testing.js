
let CREATE_DELETE = 0;


//
// getAll / index route
fetch('http://localhost:3000/locations')
  .then(response => response.json())
  .then(data => {
    //console.log('GET /', data);
    console.log('GET all - Success');
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



//
// getOne
const recordId = 12;
fetch(`http://localhost:3000/locations/${recordId}`)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('GET One - Success:', data);
    //console.log('GET One - Success:');
})
.catch(error => {
    console.error('GET One - Error fetching data:', error);
});


//
// create
fetch('http://localhost:3000/locations', {
  method: 'POST',
  headers: {'Content-Type' : 'application/json'},
  body: JSON.stringify({
    name: 'test',
    count: 12,
    address: 'test'
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('POST create - Success. ID:', data.record.id);
    CREATE_DELETE = data.record.id;
    // You might want to store the ID of the created item for subsequent PUT/DELETE tests
  })
  .catch(error => {
    console.error('POST Error:', error);
  });


//
// getMany
fetch('http://localhost:3000/locations')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('GET many - Success'); // handle the data here
})
.catch(error => {
    console.error('GET many Error fetching data:', error);
});


//
// update
const recordIdToUpdate = 12;
fetch(`http://localhost:3000/locations/${recordIdToUpdate}`, {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
    name: 'test update',
    count: 12,
    address: 'test update'
    })
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Assuming your PUT returns the updated record
})
.then(data => {
    console.log('PUT Success:', data.record.name);
})
.catch(error => {
    console.error('PUT Error:', error);
});


//
// deleteOne
const recordIdToDelete = CREATE_DELETE;
fetch(`http://localhost:3000/locations/${recordIdToDelete}`, {
    method: 'DELETE'
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
})
.then(data => {
    console.log('DELETE one - Success:', data || 'Record deleted successfully.');
})
.catch(error => {
    console.error('DELETE Error:', error);
});
