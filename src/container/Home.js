import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Sidebar, UserProfile } from "../components";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/logo.png";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { userQuery } from "../utils/data";
import { client } from "../client";
import Pins from "./Pins";


const Home = () => {
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const scrollRef = useRef(null);
  const navigate=useNavigate();
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
    useLayoutEffect(() => {
      if(!userInfo){
        navigate('/Login')
      }
    },[])
  useEffect(() => {
    const query = userQuery(userInfo?._id);
    client.fetch(query).then((data) => {
      setUser(data[0]);
      
    });
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggle(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28"></img>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-20 rounded-md"></img>
          </Link>
        </div>
        {toggle && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggle(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggle} />
          </div>
        )}
      </div>
      <div className=" pb-2 flex-1 h-screen overflow-y-auto" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
