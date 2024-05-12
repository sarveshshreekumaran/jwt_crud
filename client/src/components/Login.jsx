import React, { useState } from "react";

function Login({ setJwt, setForm }) {
  const api =
    process.env.REACT_APP_BACKEND_PRODUCTION_API ||
    process.env.REACT_APP_BACKEND_DEV_API;
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;

  const onChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    async function login(url, data) {
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
    login(`${api}/user/login`, {
      ...loginForm,
    }).then((data) => {
      // console.log(data);
      setLoginForm({
        email: "",
        password: "",
      });
      setJwt(data.jwtAccessToken);
      localStorage.setItem("jwt", data.jwtAccessToken);
    });
  };
  return (
    <>
      <main className="login_form">
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
              Still not registered?
              <i
                onClick={() => setForm((prevState) => !prevState)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Register
              </i>
            </span>
            <button type="submit">Login</button>
          </section>
        </form>
      </main>
    </>
  );
}

export default Login;
