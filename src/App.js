import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import AnimalInput from './components/Dairy/AnimalInput';
import {
  Route,
  Routes
} from 'react-router-dom';

function App() {
  return ( 
    <div className=" flex flex-row" >
      < SideBar />
      < div className="flex flex-col w-full" >
        <Routes className="flex flex-col w-full" >
          < Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          < Route path="/animalinput" element={< AnimalInput />} />
        </ Routes >

      </div>
    </div >
  );
}

export default App;