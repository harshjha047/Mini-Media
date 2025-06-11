import React from "react";

function Nav() {
  return (
    <>
      <div className=" fixed w-full h-[8%] bottom-0 z-50 bg-black text-xl text-white flex justify-center items-center">
        <div className="w-11/12 h-5/6 flex items-center justify-between">
          <div className="h-9 w-9"><svg x="0px" y="0px" viewBox="0 0 24 24"><path fill="#fff" d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path></svg></div>
          <div className="h-8 w-8 text-white"><svg x="0px" y="0px" viewBox="0 0 50 50"><path fill="#fff" d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path></svg></div>
          <div className="h-9 w-9">P</div>
        </div>
      </div>
    </>
  );
}

export default Nav;
