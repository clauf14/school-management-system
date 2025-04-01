import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInComponent from './logIn/LogInComponent'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogInComponent />} />
      </Routes>
    </Router>
  );
}

export default App
