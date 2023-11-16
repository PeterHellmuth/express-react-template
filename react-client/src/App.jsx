import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./App.css";

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

//const port = normalizePort(process.env.PORT || "3000"); //deployed
//const SERVER_URL = "http://members-only.fly.dev"; //deployed
const SERVER_URL = "http://localhost:" + "3000"; //dev test

function App() {
  //const [response, setResponse] = useState("");
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState("sign-up");
  const [user, setUser] = useState({ auth: false, name: "" });
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const loginUser = (e) => {
    e.preventDefault();
    let fetchUrl = "";
    let data = null;
    fetchUrl = `${SERVER_URL}/users/login`;
    data = JSON.stringify({
      username: e.target.parentNode.username.value,
      password: e.target.parentNode.password.value,
    });

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            setErrors({
              submit: "Username or password are incorrect.",
            });
          }
          console.log("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setToken(data.token);
        localStorage.setItem("jwtToken", data.token);
        setUser({ auth: true, name: data.username });
        setErrors([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    let fetchUrl = "";
    let data = null;
    fetchUrl = `${SERVER_URL}/users/create`;
    data = JSON.stringify({
      firstName: e.target.parentNode.firstName.value,
      lastName: e.target.parentNode.lastName.value,
      username: e.target.parentNode.username.value,
      password: e.target.parentNode.password.value,
    });

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          console.log("User Added.");
          setErrors([]);
        }
        if (res.status === 409) {
          setErrors({
            submit:
              "Username already exists. Please choose a new username or log in.",
          });
        }

        return res.json().then((err) => {
          const errorMessages = {};
          err.forEach((error) => {
            errorMessages[error.path] = error.msg;
          });
          setErrors(errorMessages);
        });
      })
      .catch((err) => console.log(err));
  };

  if (user.auth) {
    return (
      <div>
        You are logged in as {user.name}
        <button type="button">Logout</button>
      </div>
    );
  } else {
    return <Login loginUser={loginUser} errors={errors} />;
  }

  //<SignUp addUser={addUser} errors={errors} />
}

export default App;
