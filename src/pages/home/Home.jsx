import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="cont-home">
      <nav className="nav-home">
        <div className="home">home</div>
        <Link to="/Registro">Registro</Link>
        <Link to="/login">Iniciar Sesion</Link>
      </nav>

      <div className="cont-textos">
        <h2 className="titulo-home">Bienvenido</h2>

        <p className="texto-home">A tu alcance</p>

        <p className="texto-homee">
          <b>Prestamo de implementos</b>
        </p>

        <p className="parrafo-home">
          Una app creada con el proposito de facilitar tanto a aprendices como a
          el equipo de bienestar al aprendiz a tener un buen manejo de los
          implementos que se le dan uso es el sena.
        </p>
      </div>
    </div>
  );
}
