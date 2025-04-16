import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInComponent from './logIn/LogInComponent'
import SignUpComponent from "./signUp/SignUpComponent.jsx";
import ListOfCoursesComponent from './courses/ListOfCoursesComponent.jsx';
import EnrolledCourses from "./courses/EnrolledCourses.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogInComponent />} />
        <Route path='/register' element={<SignUpComponent />} />

        <Route path='/courses/:id' element={<ListOfCoursesComponent />} />

        <Route path='/enrollments/:id' element={<EnrolledCourses />} />
      </Routes>
    </Router>
  );
}

export default App
