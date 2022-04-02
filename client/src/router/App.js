import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/LandingPage/landingPage";
import Home from '../components/Home/home';
import DogDetail from "../components/DogDetail/dogDetails";
import DogCreate from '../components/CreateDog/dogCreation';
//import './App.css';

function App() {
  return (
      <div className="App">
        <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route exact path="/home/createDog" component={<DogCreate/>}/>
        <Route exact path="/home" element={<Home />}/>
        <Route path="/home/:id" element={<DogDetail/>}/>
        </Routes>
      </div>
  );
}

export default App;
