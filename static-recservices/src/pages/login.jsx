import React, { useState, useEffect } from 'react';
import '../styles/siteStyle.css';
import '../styles/login.css';
import { useUser } from '@supabase/auth-helpers-react';
import useEmployees from '../utils/useEmployees';
import Menu from '../components/Menu';
import supabase from '../db/supabase';

function LoginPage() {
  const { employees, fetchEmployees, loading, error } = useEmployees();
  const [formData, setFormData] = useState({});
  const [visiblePage, setVisiblePage] = useState('login-page');
  const [showPassword, setShowPassword] = useState({
    pwd: false,
    'pwd-reg': false,
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const goToPage = (navigateToPage) => {
    setVisiblePage(navigateToPage);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.username,
      password: formData.pwd
    });

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert("Thank you for Loging In")
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.pwdReg
    });

    if (error) {
      alert(error.error_description || error.message)
      return
    } else {
      alert("Thank you for creating a new User")
      const { error: insertError } = await supabase
        .from('Employee')
        .insert({ firstName: formData.fname, lastName: formData.lname, email: formData.email, uid: data.user.id });
      if (insertError) {
        alert(insertError.error_description || insertError.message)
        return
      }
    }
  }

  return (
    <>
      <header>
        <Menu />
      </header>
      <main className="login-main">
        {/* LOGIN */}
        <section id="login-page" style={{ display: visiblePage === 'login-page' ? 'block' : 'none' }}>
          <form method="post" className="bordered-form" id="login" onSubmit={handleLogin}>
            <h2>Login</h2>
            <label htmlFor="username">Email/Username:</label><br />
            <input
              className="form-text-input"
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="test@mail.com"
              required
              autoFocus
            /><br /><br />

            <label htmlFor="pwd">Password</label><br />
            <input
              type={showPassword.pwd ? 'text' : 'password'}
              className="form-text-input"
              id="pwd"
              name="pwd"
              onChange={handleChange}
              required
              placeholder="********"
            /><br />

            <div className="password-container">
              <label>
                <input
                  className="show-password"
                  type="checkbox"
                  onChange={() => togglePasswordVisibility('pwd')}
                /> Show Password
              </label>
              <a
                className="fake-link"
                onClick={() => goToPage('verification-page')}
              >
                Forgot password?
              </a>
            </div>
            <br /><br />

            <input type="submit" value="Sign In" className="form-button" /><br />

            <div className="center-text">
              <a
                className="fake-link"
                onClick={() => goToPage('registration-page')}
              >
                Not a member? Sign up here!
              </a>
            </div>
          </form>
        </section>

        {/* REGISTRATION */}
        <section id="registration-page" style={{ display: visiblePage === 'registration-page' ? 'block' : 'none' }}>
          <div className="left-align-text">
            <a
              className="fake-link"
              onClick={() => goToPage('login-page')}
            >Back to Login</a>
          </div>
          <form method="post" className="bordered-form" id="registration" onSubmit={handleSignUp}>
            <h2>Create an Account</h2>
            <label htmlFor="fname">First Name*:</label>
            <input className="form-text-input" required type="text" id="fname" name="fname" placeholder="John" onChange={handleChange} />
            <br /><br />

            <label htmlFor="lname">Last Name*:</label>
            <input className="form-text-input" required type="text" id="lname" name="lname" placeholder="Smith" onChange={handleChange} />
            <br /><br />

            <label htmlFor="email">Email*:</label>
            <input className="form-text-input" required type="email" id="email" name="email" placeholder="JohnSmith@email.com" onChange={handleChange} />
            <br /><br />

            <label htmlFor="username-reg">Username*:</label>
            <input className="form-text-input" required type="text" id="username-reg" name="username-reg" placeholder="JohnSmith124" onChange={handleChange} />
            <br /><br />

            <label htmlFor="pwd-reg">Password*:</label>
            <input
              className="form-text-input"
              required
              type={showPassword['pwd-reg'] ? 'text' : 'password'}
              onChange={handleChange}
              id="pwd-reg"
              name="pwdReg"
              placeholder="********"
              minLength="8"
            />
            <br />

            <div className="password-container">
              <label>
                <input
                  className="show-password"
                  type="checkbox"
                  onChange={() => togglePasswordVisibility('pwd-reg')}
                /> Show Password
              </label>
            </div>
            <br />

            <label htmlFor="confirm-pwd">Confirm Password*:</label>
            <input
              className="form-text-input"
              required
              onChange={handleChange}
              type="password"
              id="confirm-pwd"
              name="confirm-pwd"
              placeholder="********"
            />
            <br /><br />

            <label>
              Password Rules:<br />
              8-12 characters <br />
              1 uppercase <br />
              1 lowercase <br />
              1 special character (*&^%!)
            </label>
            <br /><br /><br />

            <input type="submit" value="Sign Up" className="form-button" />
          </form>
        </section>

        {/* VERIFICATION */}
        <section id="verification-page" style={{ display: visiblePage === 'verification-page' ? 'block' : 'none' }}>
          <div className="left-align-text">
            <button
              type="button"
              className="fake-link"
              onClick={() => goToPage('login-page')}
            >Back to Login</button>
          </div>
          <form method="post" className="bordered-form" id="verification">
            <div className="center-image-container">
              <img
                src="/images/placeholder.png"
                alt="Profile"
                className="circle-image"
              />
            </div>
            <h2>Please Verify your Email</h2>
            <p>Please enter the code sent to your email to get started using [app name]!</p>

            <input
              className="form-text-input"
              required
              type="email"
              id="verify-numbers"
              name="verify-numbers"
            />
            <br /><br />

            <input type="submit" value="Check Link" className="form-button" />
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginPage;
