import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

function Home() {
  const [user, setUser] = useState(null);

  const userInfo = fetchUser();
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  return (
    <div className="flex bg-gray-50 flex-row h-screen transition-height duration-75 ease-out">
      <div className="flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
