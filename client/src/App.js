import React from "react";
import { Route, Routes } from "react-router-dom"
import axios from "axios";

//----Components -------
import Header from "./components/Header"
import Courses from "./components/Courses"
import CourseDetail from "./components/"
import CreateCourse from "./components/"
import UpdateCourse from "./components/"
import UserSignIn from "./components/"
import UserSignUp from "./components/"
import UserSignOut from "./components/"


function App() {
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
