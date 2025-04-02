import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInComponent from './logIn/LogInComponent'
import SignUpComponent from "./signUp/SignUpComponent.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogInComponent />} />
          <Route path='/register' element={<SignUpComponent />} />
      </Routes>
    </Router>
  );
}

export default App
