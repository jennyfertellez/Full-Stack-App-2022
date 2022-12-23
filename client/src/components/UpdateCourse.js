import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//This component provides the "Update Course" screen 
const updateCourse = ({ context }) => {
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
}
//This component also renders an "Update Course" button that sends a PUT request to the REST API's 

//This component also renders a "Cancel" button that returns the user to the "Course Detail" screen