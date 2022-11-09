import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.scss";

// import logo from "../../assets/logo.png";
import { Button } from "../../UI/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../UI/Input/Input";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";

export const Login = (props) => {
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [Email, setEmail] = useState("caidyn.ginger@gmail.com");
  const [Pwd, setPwd] = useState("Margindcd1!");
  const [ErrMsg, setErrMsg] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [Email, Pwd]);

  const loginHandler = async (event) => {
    event.preventDefault();
    const options = {
      method: "POST",
      url: "http://localhost:3500/auth",
      headers: { "Content-Type": "application/json" },
      data: { email: Email, pwd: Pwd },
    };
    try {
      const response = await axios.request(options);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ roles: roles, accessToken: accessToken, })
    //   setEmail('')
    //   setPwd('')
        navigate('/')
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={loginHandler}>
        <h1>Welcome back to Ginger Industries</h1>
        {ErrMsg && (
          <p
            ref={errRef}
            className={styles.error_message}
            aria-live="assertive"
          >
            {ErrMsg}
          </p>
        )}
        <Input
          label="Email"
          type="text"
          id="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          required={true}
          valid={true}
        />
        <Input
          label="Password"
          type={ShowPassword ? "text" : "password"}
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={Pwd}
          required={true}
          showHidePasswordHandler={setShowPassword}
          showHidePassword={ShowPassword}
          ShowHide={true}
          valid={true}
        />
        <div className={styles.nav_links}>
        <Link className={styles.register_a} to="/register">
          Register
        </Link>
        <Link className={styles.register_a} to="/">
          Back Home
        </Link>
        </div>
       
        <br />
        <Button>Login</Button>
        <br />
      </form>
    </main>
  );
};
