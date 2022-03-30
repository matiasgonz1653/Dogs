import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/landingPage';
import Home from './components/home';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home"  element={<Home/>}/>
        </Routes>
        <h1>Henry Dogs</h1>
      </div>
  );
}

export default App;
