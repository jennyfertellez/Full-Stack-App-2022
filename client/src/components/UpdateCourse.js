import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//This component provides the "Update Course" screen 
const UpdateCourse = ({ context }) => {
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      context.data
        .getCourse(id)
        .then((data) => {
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
        })
        .catch((err) => {
          console.log(err);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //Creates a course object that references OnChnage input value 
const submitHandler = (e) => {
  e.preventDefault();

  const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
  };
  context.data
      .updateCourse(
        id,
        course,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Sorry. You encounter an interal server error", err);
        navigate("/");
      });
};


//Redirects the user to the course detail page when the cancel button is pressed 
const cancelHandler = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
}

//This component also renders an "Update Course" button that sends a PUT request to the REST API's 
//This component also renders a "Cancel" button that returns the user to the "Course Detail" screen
return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
        <form onSubmit={submitHandler}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <p>
                By {course.user?.firstName} {course.user?.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={(e) => {
                  setEstimatedTime(e.target.value);
                }}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={(e) => {
                  setMaterialsNeeded(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button onClick={cancelHandler} className="button button-secondary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
 };
export default UpdateCourse;