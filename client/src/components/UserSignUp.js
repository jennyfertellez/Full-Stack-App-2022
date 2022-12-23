import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'

//This component provides the "Sign Up" screen that allows users to create an account
const userSignUp = ({ context }) => {
    //User inputs their information and (state) is updated 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    //Function that handles input changes 
    const handleChange = (e) => {
        e.preventDefault();
        //The values are a reflection of the information inserted in the <input> elements
        const name = e.target.name;
        const value = e.target.value;
        //Input are being updated 
        if (name === 'firstName') {
            setFirstName(e.target.value);
        } else if (name === 'lastName') {
            setLastName(value);
        } else if (name === 'emailAddress') {
            setEmailAddress(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            return;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        };

        context.data
        //Calls the createUser() method from Data.json
            .createUser(user)
            .then((errors) => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    context.actions
                    //New user successfully created 
                    .signIn(emailAddress, password)
                    .then (() => {
                        navigate('/');
                    })
                    //Error with signing in, user will see an error message 
                    .catch(err => {
                        console.log('Sign-in error: ', err);
                        navigate('/error');
                    })
                }
            })
    };
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

//This component also renders a "Sign Up" button that signs in the user
//This component also renders a "Cancel" button that returns the user to the default route 
    return (
        <div className="form--centered">
        <h2>Sign Up</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleChange}
          />
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
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signup">sign in</Link>!
        </p>
      </div>
    );
  };
  
  export default UserSignUp;