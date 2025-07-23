// fetch('http://localhost:3000/employees')       
// .then(response => response.json())
// .then(data => {
//       console.log(data); // handle the data here
// })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });


// // This should print all employee info to the console



// Sign up
fetch('http://localhost:3000/authentication/signUp', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    mail: 'example@example1.com',
    pass: 'securepassword'
  })
})
.then(res => res.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));

// Login - Requires email confirmation
// fetch('http://localhost:3000/authentication/logIn', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     mail: '21jturgoose@gmail.com',
//     pass: 'securepassword'
//   })
// })
// .then(res => res.json())
// .then(data => console.log('Login response:', data))
// .catch(err => console.error('Login error:', err));

// // Log out
// fetch('http://localhost:3000/authentication/logOut', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'}
// })
// .then(res => res.json())
// .then(data => console.log('Logout response:', data))
// .catch(err => console.error('Logout error:', err));

// // Forgot Password
// fetch('http://localhost:3000/authentication/forgotPass', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     mail: '21jturgoose@gmail.com'
//   })
// })
// .then(res => res.json())
// .then(data => console.log('Forgot password response:', data))
// .catch(err => console.error('Forgot password error:', err));