import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { styles } from "../styles";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleResume = () => {
    const resumeUrl = "/Resume.pdf";
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) {
      setActive("");
    }
  }, [toggle]);

  const renderNavLinks = (isMobile) => (
    <ul
      className={`list-none ${
        isMobile
          ? "flex flex-col gap-4"
          : "hidden sm:flex flex-row gap-8"
      }`}
    >
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${
            active === link.title
              ? "text-white"
              : "text-secondary"
          } hover:text-white text-[18px] font-medium cursor-pointer transition duration-300`}
          onClick={() => {
            setActive(link.title);
            if (isMobile) setToggle(false);
          }}
        >
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}

      <li className="hover:text-white text-[18px] font-medium cursor-pointer transition duration-300">
        <button onClick={toggleResume}>Resume CV</button>
      </li>
    </ul>
  );

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 bg-primary backdrop-blur-md`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo + Nama */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
          />

          <p className="text-white text-[20px] font-bold">
           A.Gunawan Wibisono
          </p>
        </Link>

        {/* Desktop Menu */}
        {renderNavLinks(false)}

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[20px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`p-6 black-gradient absolute top-16 right-0 mx-4 my-2 min-w-[150px] z-10 rounded-xl ${
              toggle ? "flex" : "hidden"
            }`}
          >
            {renderNavLinks(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
