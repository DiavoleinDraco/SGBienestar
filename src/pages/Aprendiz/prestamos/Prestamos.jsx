import React, { useState, useEffect } from "react";
import get, { post } from "../../../UseFetch";
import jwtDecode from "jwt-decode";
import "./Prestamos.css"
import Textfield from "../../../components/Textfield/Textfield";

export default function Prestamos() {
  const [implemento, setImplemento] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid)
  useEffect(() => {
    const obtenerIdEstadoPendiente = async () => {
      try {
        const estados = await get("/estado-prestamo");
        const estadoPendiente = estados.find((estado) => estado.nombre === "Pendiente");



        if (estadoPendiente) {
          setEstado(estadoPendiente._id);
        } else {
          console.error("No se encontró el estado 'Pendiente'");
        }
      } catch (error) {
        console.error("Error al obtener el ID del estado 'Pendiente'", error);
      }
    };

    obtenerIdEstadoPendiente();

    // Obtener y actualizar la fecha de inicio
    const fechaActual = new Date();
    setFechaInicio(fechaActual.toISOString());
  }, []);

  const obtenerDatosPrestamo = () => {
    const fechaActual = new Date();
    const fechaFin = new Date(fechaActual);
    fechaFin.setHours(fechaActual.getHours() + 1);

    return {
      implementos: [],
      usuario: decode.id,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin.toISOString(),
      estado: estado,
    };
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (estado.trim() === "") {
      console.error("El campo de estado no puede estar vacío.");
      return;
    }

    const data = obtenerDatosPrestamo();
    console.log(data)
    const response = await post("/prestamos", data);
    console.log(response);
  };

  return (
    <div className="contenedor-prestamos">

      <h1>Detalles del prestamo</h1>
      <p>Querido usuario, usted tendra un tiempo de 1 hora para hacer uso del implemento deportivo</p>
      <p>recuerde devolverlo dentro del horario estipulado, en buenas condiciones y respetando</p>
      <p>las normas señaladas en las politicas de prestamos designadas por el area de Bienestar</p>

      <div>
        Usuario: {decode.nombre}
      </div>


      <div>
        <p>Nombre del Implemento: { }</p>
      </div>

      <div>

        <p>Detalles: { }</p>

      </div>
      <form onSubmit={handleSubmit}>
        <div className="id-prestamos">
          <Textfield
            name="id del implemento"
            value={implemento}
            onChange={(value) => setImplemento(value)}
          />
        </div>

        <div>
          <p>Fecha de generación: {fechaInicio}</p>
        </div>

        <button type="submit">Confirmar Prestamo</button>
      </form>
    </div>
  );
}

