import React from "react";
import { Route, Routes } from "react-router-dom"
import axios from 'axios'
import withContext from "./Context";

//----Components -------
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

//------ Components with Context -------//
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);



const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />
      <Routes>
        <Route element={<PrivateRoutesWithContext />}>
          <Route
            path="/courses/:id/update"
            element={<UpdateCourseWithContext />}
          />
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
        </Route>
        <Route path="/" element={<CoursesWithContext />} />
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />
        <Route path="/courses" element={<CoursesWithContext />} />
        <Route path="/courses/:id" element={<CourseDetailWithContext />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
