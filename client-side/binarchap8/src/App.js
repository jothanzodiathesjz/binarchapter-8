import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import './assets/css/style.css'
import Header from "./components/Header";
import Users from "./components/Users";
import AddUser from "./components/Adduser";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Users/>} />
        <Route path="Adduser" element={<AddUser />} />
      </Routes>
    </Router>
      
    
  );
}

export default App;
