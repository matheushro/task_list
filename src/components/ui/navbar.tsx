'use client'
import { Button } from "../ui/button";
import { useState } from 'react';
import Link from "next/link";

const menus = [

  { title: "Dashboard", path: "/" },
  { title: "Tarefas", path: "/tasks" },

]

export default function Navbar() {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const closeMenuOnXClick = () => {
      setMenuOpen(false);
    };

    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };

    return (
      <>
      <header className="md:block hidden sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="hidden xl:flex space-x-1">
            <ul className="flex flex-row gap-5">
              {menus.map((item, idx) => (
                <li key={idx}>
                    <a href={item.path} className={`font-semibold text-slate-500 hover:text-black overflow-hidden`}>
                      {item.title}
                    </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
          <button onClick={() => setMenuOpen(false)} className='fixed h-screen w-screen z-40 bg-black bg-opacity-40' />
        )} 

      {/* Botão do menu para dispositivos móveis */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        aria-label="Close menu"
        title="Close menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>


       <nav
          className={`text-white z-50 lg:hidden fixed top-0 left-0 h-screen w-[80vw] bg-black transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Botão "X" para fechar o menu */}
          <button
            onClick={closeMenuOnXClick}
            className="absolute top-4 right-4 text-white close-button focus:outline-none"
            aria-label="Close menu"
            title="Close menu"
          >
          x
          </button>

          {/* Conteúdo do menu */}
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            {menus.map((item, idx) => (
                <li key={idx}>
                    <a href={item.path} className={`font-semibold text-slate-500 hover:text-black overflow-hidden`}>
                        {item.title}
                    </a>
                </li>
            ))}
          </div>
        </nav>
      </>
    )
  }
  