
import './App.css';
import {Route,Routes,BrowserRouter as Router, useNavigate} from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home';
import { useEffect } from 'react';
import { fetchData } from './utils/fetchData';
function App() {
  const navigate=useNavigate();
  useEffect(()=>{
    const user= fetchData();
    if (!user) {
      navigate('/login');
    } 
      
    
  },[])
  return (
    
    <Routes>
      <Route path='/login' element={<Login/>}/>'
      <Route path='/*' element={<Home/>}/>
    </Routes>
    
  );
}

export default App;
