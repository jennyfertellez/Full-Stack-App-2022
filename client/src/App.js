import React from "react";
import { Route, Routes } from "react-router-dom"
import axios from "axios";

//Imported Components
import Header from './components/Header'



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
