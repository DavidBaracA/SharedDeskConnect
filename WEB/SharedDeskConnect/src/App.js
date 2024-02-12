import logo from './logo.svg';
import './App.css';
import  { useEffect,useState } from 'react';


function App() {
  const [users,setUsers]= useState([])
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:5100/api/Space/GetSpaces')
        .then(response => response.json())
        .then(data => {setUsers(data)});
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding reservation:', error.message);
    }
  };
  
    useEffect((() => 
    {
      getUsers();
    }), []);
    console.log("users: ls",users)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
