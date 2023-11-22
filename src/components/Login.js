import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { FcGoogle } from "react-icons/fc";
import bgvideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import { client, fetchGoogleDetails } from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-black">
      <div className="relative w-full h-full">
        <video
          src={bgvideo}
          type="video/mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-contain"
        ></video>
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
        </div>
        <div>
          <GoogleOAuthProvider
            clientId='213922365434-jb9dpnuphm6qf702csmaq8fku5u2i45j.apps.googleusercontent.com'
            render={(renderProps) => (
              <button
                type="button"
                className="bg-mainColor flex items-center p-3 rounded-md transition hover:scale-105"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Signin with Google
              </button>
            )}
          >
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
                const { name, picture, sub } = decoded;
                const user = {
                  _id: sub,
                  _type: "user",
                  userName: name,
                  image: picture,
                };
                client.createIfNotExists(user).then(() => {
                  localStorage.setItem("user",JSON.stringify(user))
                  navigate("/");
                });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
