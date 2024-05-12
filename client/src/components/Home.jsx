import React, { useState } from "react";
import "./components_styles.css";
import Register from "./Register";
import Login from "./Login";
import Notes from "./Notes";
function Home() {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [form, setForm] = useState(false);
  return (
    <>
      {jwt !== "undefined" ? (
        <Notes jwt={jwt} setJwt={setJwt} setForm={setForm} />
      ) : form ? (
        <Register setJwt={setJwt} setForm={setForm} />
      ) : (
        <Login setJwt={setJwt} setForm={setForm} />
      )}
    </>
  );
}

export default Home;
