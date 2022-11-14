import React from "react";
import Input from "./elements/Input";
import MyContext from "../contexts/MyContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
const Register = () => {
  const { user, setUser } = useContext(MyContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((user) => {
        console.log(user.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="login-reg flex w-1/2 flex-col rounded border border-black  p-11 shadow-lg shadow-black/25">
        <p className="text-4xl mb-5 text-center font-semibold">Register</p>
        <form onSubmit={submitHandler}>
          <Input
            onChangeProp={(e) => handleChange(e)}
            placeholder="First Name"
            name="firstName"
            type="text"
            errorProps={errors ? errors.firstName : false}
          />
          <Input
            onChangeProp={(e) => handleChange(e)}
            placeholder="Last Name"
            name="lastName"
            type="text"
            errorProps={errors ? errors.lastName : false}
          />
          <Input
            onChangeProp={(e) => handleChange(e)}
            placeholder="Email"
            name="email"
            type="text"
            errorProps={errors ? errors.email : false}
          />
          <Input
            onChangeProp={(e) => handleChange(e)}
            placeholder="Password"
            name="password"
            type="password"
            errorProps={errors ? errors.password : false}
          />
          <Input
            onChangeProp={(e) => handleChange(e)}
            placeholder="confirm Password"
            name="confirmPassword"
            type="password"
            errorProps={errors ? errors.confirmPassword : false}
          />
          <button className="w-full border border-black bg-black py-3 text-white text-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
