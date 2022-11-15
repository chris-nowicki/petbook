import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-orange-400">
       
        <div className="flex flex-col rounded border border-black p-16 shadow-lg shadow-orange-400/25">
      <div className="container mx-auto flex items-right flex-row-reverse py-2">
        <Link to={"/login"}>
          
          <button className=" hover:bg-orange-500 bg-orange-400 px-9 border border-black bg-black py-3 text-center text-xl text-white shadow-md shadow-black/25">
            LOGIN
          </button>
        </Link>
      </div>
      <div className="align-center mx-auto  flex h-full w-2/5  flex-col rounded border border-black py-16 px-16 shadow-lg shadow-black/25">
        <p className="mb-5 text-2xl font-serif">
          Petbook <br />A place to share our pets
        </p>
        <Link to ={"/register"}>
          <button className="  w-2/4 border border-black bg-orange-400 py-3 text-2xl text-white shadow-md shadow-black/25 hover:bg-orange-500">
            Register
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
