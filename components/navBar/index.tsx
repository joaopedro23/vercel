import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./styled.css"



export default function NavBar() {
  return (
    
    <nav>
    <img src="white-pokeball.svg" alt="pokebola" className="pokebola" />
      <ul>
        <li className='pokebola-li'>
        </li>
        <li className="Quem-somos">
          <Link style={{ textDecoration: "none", color: "#000" }} href="/About">
            Quem Somos
          </Link>
        </li>
        <li className="Agendar-consulta">
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            href="/Agendar"
          >
    Agendar Consulta
          </Link>
        </li>
      </ul>
    </nav>
  );

}



