import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

//This component provides the "Create a Course" screen that allows users to create a course
const CreateCourse = ({ context }) => {
    //sets references & states for the objects that are required to build the course object 
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded = useRef();

    const navigate = useNavigate();
    const authUser = context.authenticatedUser;
    const [errors, setErrors] = useState([]);

    //Function that handles input changes 
    const handleChange = (e) => {
      e.preventDefault();
      
      const course = {
        userId: context.authenticatedUser.id,
        title: title.current.value,
        description: description.current.value,
        estimatedTime: estimatedTime.current.value,
        materialsNeeded: materialsNeeded.current.value,
      };
      context.data
        .createCourse(
          course,
          context.authenticatedUser.emailAddress, 
          context.authenticatedUser.password
        )
        .then((errors) => {
          if (errors.length) {
            setErrors(errors);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    };
//The cancel button reroutes the user to the course detail page 
    const handleCancel = async (e) => {
        //prevents button from automatically submitting
        e.preventDefault();
        navigate("/");
    };

//This component also renders a "Create a Course" button that sends a POST request to the REST API's route
//This component also renders a "Cancel" button that returns the user to the default route
return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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
        <form onSubmit={handleChange}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue=""
                ref={title}
              />

              <p>
                By {authUser.firstName} {authUser.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue=""
                ref={description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue=""
                ref={estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                defaultValue=""
                ref={materialsNeeded}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>

          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;