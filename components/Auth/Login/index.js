import { useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "../../../lib/auth";
import { removeToken } from "../../../lib/token";
import fontwhite from '../../../styles/font-white';

export function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Remove the User's token which saved before.
    removeToken();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      // API call:
      const data = await loginUser(identifier, password);
      //const loginResponseData = await data.json();

     // console.log("Data is :", JSON.stringify(data.error.status));
      console.log("Data is :", JSON.stringify(data));
      // console.log("Token is :" , data.payload.token);
      if (data.data !== null) {
        var jwt = JSON.stringify(data.jwt);
        console.log("JWT is :", jwt);
        if (rememberMe) {
          window.localStorage.setItem("token", jwt);
        } else {
          window.sessionStorage.setItem("token", jwt);
        }
        setTimeout(() => {
          Router.push("/dashboard");
        }, 1000);
      } else {
        var message = JSON.stringify(data.error.message);
        console.log("Error is :", message);
        setErrorMessage(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="h1">Login</legend>
        <div className="mb-3">
          <label htmlFor="identifierInput" className="form-label" style={fontwhite}>
            Identifier:&nbsp;&nbsp;
          </label>
          <input
            type="text"
            id="identifierInput"
            className="form-control"
            placeholder="Identifier"
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label" style={fontwhite}>
            Password:&nbsp;&nbsp;
          </label>
          <input
            type="password"
            id="passwordInput"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="RememberMeInput"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="RememberMeInput" style={fontwhite}>
              Remember Me
            </label>
          </div>
        </div>
        <br />
        {errorMessage && (
          <div className="alert alert-danger" role="alert"  style={fontwhite}>
            {errorMessage}
          </div>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Login
        </button>
      </fieldset>
    </form>
  );
}