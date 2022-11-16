import React, { useState, useContext } from "react";
import MyContext from "../contexts/MyContext";
import axios from "axios";
import Input from "./elements/Input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
      axios
        .post("http://localhost:8000/api/users/login", user, {
          withCredentials: true,
        })
        .then((user) => {
          console.log(user.data);
          setErrors([])
          navigate("/dashboard/feed");
        })
        .catch((err) => {
          console.log(err);
          setErrors({message: "Invalid Email/Password"});
        });
    
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex w-2/5 flex-col rounded border border-black p-16 shadow-lg shadow-black/25">
        <p className="text-3xl mb-1 text-center">
          Login <br></br> or <Link className="text-blue-500" to={"/register"}> Register. </Link>
        </p>
    
        {
          errors &&
          <p className='text-red-600 text-md text-center'>{errors.message}</p>
        }
        <form onSubmit={handleSubmit} className="mt-4">
          <Input
            type="text"
            name="email"
            placeholder="email"
            onChangeProp={(e) => handleChange(e)}
            errorProps={errors ? errors.email : false}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChangeProp={(e) => handleChange(e)}
            errorProps={errors ? errors.password : false}
          />
          <button className=" w-full border border-black bg-black py-3 text-xl text-white shadow-md shadow-black/25">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
