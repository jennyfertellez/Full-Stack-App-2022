import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

//This component provides the "Create a Course" screen that allows users to create a course
const CreateCourse = ({ context }) => {
    //sets references & states for the objects that are required to build the course object 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    //Function that handles input changes 
    const handleChange = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        if (name === "courseTitle") {
            setTitle(value);
          } else if (name === "courseDescription") {
            setDescription(value);
          } else if (name === "estimatedTime") {
            seteEtimatedTime(value);
          } else if (name === "materialsNeeded") {
            setMaterialsNeeded(value);
          } else {
            return;
          }
        };
    
    const handleSubmit = async (e) => {
        //prevents buttons from automatically submitting
        e.preventDefault();
    }
    }

//This component also renders a "Create a Course" button that sends a POST request to the REST API's route

//This component also renders a "Cancel" button that returns the user to the default route