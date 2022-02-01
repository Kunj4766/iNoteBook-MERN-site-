import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Componants/Navbar';
import About from './Componants/About';
import Home from './Componants/Home';
import NoteState from './context/NoteState';
import Alert from './Componants/Alert';
import SignUp from './Componants/SignUp';
import Login from './Componants/Login';
import { useState } from 'react';
import Welcome from './Componants/Welcome';

function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (massage, type) => {
    setalert({
      msg: massage,
      type: type
    }
      , setTimeout(() => {
        setalert(null)
      }, 2000)
    )
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert  save={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Welcome/>
              </Route>
              <Route exact path="/home">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <SignUp showAlert={showAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
