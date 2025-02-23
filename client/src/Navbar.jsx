import React from "react";
import { RxAvatar } from "react-icons/rx";
import { GiBrain, GiTalk } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-[10vh] px-12 text-gray-300 border-b border-gray-600 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center hover:cursor-default">
            <span className="text-3xl pr-3">
              <GiBrain />
            </span>
            <span className="text-2xl">Alain.Ai</span>
          </div>
        </Link>
        <div className="hidden md:flex hover:cursor-default">
          Let's Talk
          <span className="text-xl -mt-2">
            <GiTalk />
          </span>
        </div>
        <Link to="/profile">
          <div className="text-4xl hover:scale-110">
            <RxAvatar />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
