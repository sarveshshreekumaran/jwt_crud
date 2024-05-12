import React, { useState } from "react";

function Register({ setJwt, setForm }) {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { email, username, password } = registerForm;

  const onChange = (e) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    async function Register(url, data) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    Register("http://localhost:4000/user/register", { ...registerForm }).then(
      (data) => {
        console.log(data);
        setJwt(data.jwtAccessToken);
      }
    );
  };
  return (
    <>
      <main>
        <h1 style={{ textAlign: "center" }}>Register User</h1>
        <form onSubmit={onSubmit}>
          <section className="login_form_input">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
              />
            </label>
            <label htmlFor="username">
              Username:
              <input
                type="string"
                id="username"
                name="username"
                placeholder="Enter your name"
                value={username}
                onChange={onChange}
                required
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
              />
            </label>
          </section>
          <section className="login_form_submit">
            <span>
              Already registered?
              <i
                onClick={() => setForm((prevState) => !prevState)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Login
              </i>
            </span>
            <button type="submit">Register</button>
          </section>
        </form>
      </main>
    </>
  );
}

export default Register;
