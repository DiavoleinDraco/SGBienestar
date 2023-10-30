import React from 'react';
import { Link } from "react-router-dom";
import'./Home.css';
import ball from './ball.png'


export default function Home() {
  return (
    <div className='cont-home'>

      <nav className='nav-home'>
      <div className='home'>home</div>
      <Link to="/Registro">Registro</Link>
      <Link to="/login">Iniciar Sesion</Link>
      </nav>
      
      <div className='cont-textos'>
        <h2 className='titulo-home'>Bienvenido</h2>
        <p className='texto-home'>A TU ALCANCE</p>
        <p className='texto-homee'><b>PRESTAMO DE IMPLEMENTOS</b></p>
        <p  className='parrafo-home'>Una app creada con el proposito de facilitar tanto 
          a aprendices como a el equipo de bienestar al aprendiz a 
          tener un buen manejo de los implementos que se le dan uso 
          es el sena </p>
      </div>

      <div className='cont-ball'>
        <div className='ball1'>
        <img className='ballon' src={ball} alt="balon" />
        </div>
        <div className='ball2'>
        <img src={ball} alt="balon" />
        </div>
        <div className='ball3'>
        <img className='ballon3' src={ball} alt="balon" />
        </div>
      </div>

   









    </div>
  );
}