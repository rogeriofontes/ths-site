import { useState } from "react";
import { registerUser } from "../../../lib/auth";
import Router from "next/router";
import fontwhitecenter from '../../../styles/font-white-center';
import fontwhite from '../../../styles/font-white';

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const dataResponse = await registerUser({
        username: username,
        password: password,
        email: email,
      });

      if (!dataResponse.ok) {
        setMessage('Erro ao registar dados!');
      } else {
        Router.push("/login");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p style={fontwhitecenter}>{msg}</p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="h1" style={fontwhite}>Register</legend>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label" style={fontwhite}>
              Email:&nbsp;&nbsp;
            </label>
            <input
              type="email"
              id="emailInput"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="usernameInput" className="form-label" style={fontwhite}>
              Username:&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="usernameInput"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label" style={fontwhite}>
              Password:&nbsp;&nbsp;
            </label>
            <input
              type="text"
              id="passwordInput"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}