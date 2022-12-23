import React from "react";
import { Route, Routes } from "react-router-dom"
import axios from "axios";

//----Components -------
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";


const App = () => {
  let courses = [];  
  axios.get('http://localhost:5000/api/courses')
    .then((response) => {
      courses = response.data;
    }
  );
  return (
    <div>
      courses.
    </div>
  );
}

export default App;
