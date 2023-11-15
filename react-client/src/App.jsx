import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || "3000");     //deployed
const SERVER_URL = "http://express-react-template.fly.dev"; //deployed
//const SERVER_URL = "http://localhost:" + "3000"; //dev test

function App() {
  const [response, setResponse] = useState("")

  useEffect(() => {
    fetch(`${SERVER_URL}/users`, {
      method: "GET"
    })
      .then((res) => {
        if (res.ok) {
          res.text().then( (res) => {
            setResponse(res);
          }
           );

        } else {
          setResponse("Error connecting")
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Server response is {response}
        </button>
      </div>
    </>
  )
}

export default App
