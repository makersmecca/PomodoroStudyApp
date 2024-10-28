import { useState } from "react";
import { Link } from "react-router-dom";

const Authenticate = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPW = () => {
    setShowPw(!showPw);
  };

  return (
    <>
      <p>Authenticate users here</p>
      <form>
        <label htmlFor="username">Username</label>
        <input onChange={handleInput} id="uName" type="text" name="username" />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInput}
          id="pw"
          type={showPw ? "text" : "password"}
          name="password"
        />
        <button type="button" onClick={handleShowPW}>
          showPw
        </button>
        <button type="submit">Login</button>
      </form>
      <button>
        <Link to="/">Home</Link>
      </button>
    </>
  );
};

export default Authenticate;
