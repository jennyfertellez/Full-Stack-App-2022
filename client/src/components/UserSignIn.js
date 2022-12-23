import React, { useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

//This component provides the "Sign In" screen to users with existing accoounts 
const UserSignIn = ({ context }) => {
    const [errors, setErrors] = useState([]);

    //Holds the initial value for the email address and password field
    const emailAddress = useRef();
    const password = useRef();

    const navigate = useNavigate();
    const location = useLocation();

//Function that handles input changes 
    const handleChange = (e) => {
        e.preventDefault();

        //The values are a reflection of the information inserted in the <input> elements
        const email = emailAddress.current.value;
        const pass = password.current.value;

        //The value of the last location visited
        const prevLocation = location.state?.from || '/'

        if (email && pass) {
            context.actions
            .signIn(email, pass)
            .then(currentUser => (currentUser ? navigate(prevLocation) : setErrors(['Either your email address or password is incorrect. Please try again'])))
            .catch(err => {
              console.log('Sign-In Error: ', err)
              redirectTo('/error'); 
            }); 
            } else {
              setErrors(['Correct email address and password are required']) 
            }
          }
    }
    
//Closes user from sign in and redirects back to home page
  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate('/')
    }

//This component also renders a "Sign In" button to sign in a user 
//And a "Cancel" button to return the user to the default route
return (
            <div className="form--centered">
                <h2>Sign In</h2>
                { errors ? (
                  <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                  </ul>
                </div>
              ) : null
                }
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={emailAddress}
                        onChange={handleChange}
                        />
                    <label htmlFor="password">Password</label>
                    <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={handleChange}
                    />
                    <button className="button" type="submit">
                        Sign In
                    </button>
                    <button className="button button-secondary" onclick={handleCancel}>
                        Cancel
                    </button>
                </form>
                <p>
                    Don't have a user account? Click here to{' '} 
                    <Link to="/signup">sign up</Link>!
                </p>
            </div>
            );

export default UserSignIn;