import React, {useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

//This component provides the "Courses Detail" screen 
const CourseDetail = ({ context }) => {
    //Declare a new state variable called "course"
    const [ course, setCourse ] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    //Retriving the data from the REST API's route
    useEffect(() => {
        context.data
        .getCourse(id) 
        .then((data) => setCourse(data))
        .catch((err) => {
            console.log("Sorry. There seems to be a problem with finding the course.");
        });
     // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

//The deletion of a course
const courseDelete = () => {
    context.data.deleteCourse(id, currentUser)
        .then(() => { navigate('/') })
        .catch((err) => {
            console.error(err);
            navigate('/error')
        });
};

//This component also renders a "Delete Course" button to delete a course
//This componets also renders an "Update Course" button to naviagate to the "Update Course" screen
return (
    <>
    <main>
    <div className="actions--bar">
        <div className="wrap">

            <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
            <Link className="button" to="/" onClick={() => {courseDelete(id)}}>Delete Course</Link>
            <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
    </div>
    
    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>{`By: ${course.courseOwner?.firstName} ${course.courseOwner?.lastName}`}</p>
                    <ReactMarkdown>children = {course.description}</ReactMarkdown>

                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                    <ReactMarkdown> children = {course.materialNeeded}</ReactMarkdown>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</main>
</>
);
};

export default CourseDetail;