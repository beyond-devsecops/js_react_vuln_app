import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [response, setResponse] = useState("");
  const [apiKey, setApiKey] = useState("123456-SECRET-API-KEY"); // Exposed in DOM

  const handleLogin = async () => {
    if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("username", username); // Insecure localStorage storage
      localStorage.setItem("password", password);
    }
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      setResponse(JSON.stringify(res.data));
    } catch (err) {
      setResponse(err.message); // Improper error handling
    }
  };

  const handleAddComment = () => {
    setComments([...comments, comment]); // No input sanitization (XSS vulnerability)
    setComment("");
  };

  return (
    <div className="App">
      <h1>Vulnerable React App</h1>
      <h3>Exposed API Key: {apiKey}</h3> {/* Sensitive information in DOM */}
      <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <label>
          <input type="checkbox" id="rememberMe" /> Remember Me
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h2>Post a Comment</h2>
        <textarea placeholder="Write your comment here" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleAddComment}>Post</button>
        <div>
          <h3>Comments</h3>
          {comments.map((c, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: c }} /> // XSS vulnerability
          ))}
        </div>
      </div>
      <div>
        <h2>Response</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default App;