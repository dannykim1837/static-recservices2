fetch('http://localhost:3000/authentication/forgotpass', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    mail: '21jturgoose@gmail.com'
  })
})
.then(res => res.json())
.then(data => console.log('Forgot password response:', data))
.catch(err => console.error('Forgot password error:', err));
