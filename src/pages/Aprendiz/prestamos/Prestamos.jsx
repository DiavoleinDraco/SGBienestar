import React, { useState, useEffect } from "react";
import get, { eliminar, getParametre, post } from "../../../UseFetch";
import jwtDecode from "jwt-decode";
import "./Prestamos.css";
import Textfield from "../../../components/Textfield/Textfield";
import GenerateQr from "../../../components/Generate_Qr/Generate_Qr";
import img from "../../imagenes/sena-bienestar.png";
import Menu from "../../../components/menu/Menu";


export default function Prestamos() {
  const [implemento, setImplemento] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaInicio, setFechaInicio] = useState(new Date()); // Inicializa como objeto Date
  const usuarioid = localStorage.getItem("token");
  const decode = jwtDecode(usuarioid);
  const [peticionExitosa, setPeticionExitosa] = useState(false);
  const [IDPrestamo, setIDPrestamo] = useState("");
  const inforPrestamo = JSON.parse(localStorage.getItem("implementosAprestar"));




  useEffect(() => {
    const obtenerIdEstadoPendiente = async () => {
      try {
        const estados = await get("/estado-prestamo");
        const estadoPendiente = estados.find(
          (estado) => estado.nombre === "Pendiente"
        );

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

    const fechaActual = new Date();
    setFechaInicio(fechaActual);

    const handleUnload = () => {
      localStorage.removeItem("implementosAprestar");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };

  }, []);




  const obtenerDatosPrestamo = () => {
    const fechaFin = new Date(fechaInicio);
    fechaFin.setMinutes(fechaFin.getMinutes() + 15);
    const implementos = inforPrestamo.map((implemento) => implemento.id);
    const cantidades = inforPrestamo.map((implemento) => implemento.cantidad);

    console.log(cantidades);


    return {
      implementos: implementos,
      cantidad_implementos: cantidades,
      usuario: decode.id,
      fecha_inicio: fechaInicio.toISOString(),
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
    console.log(data);
    const response = await post("/prestamos", data);
   console.log(response)
    setIDPrestamo(response)
    setPeticionExitosa(true);

  };

  const prestamo = async () => {
    try {
      if (!implemento) {
        console.error(
          "Ingrese un ID de implemento válido para eliminar prestamo."
        );
        return;
      }

      const response = await eliminar("/prestamos/", implemento);
      console.log(response);

      setImplemento("");
    } catch (error) {
      console.error("Error al eliminar la prestamo", error);
    }
  };
  if (peticionExitosa) {
   console.log(IDPrestamo)
    return (

      <div>
           <Menu></Menu>
      <div className="contenedor-prestamos">

        <p className="parr-qr">
          La petición se creó con éxito. <br /> Presiona si quieres descargar el QR.
        </p>
        <div className="qr">
          <GenerateQr busqueda={IDPrestamo} />
        </div>
      </div>
      </div>
    );
  }
  console.log(peticionExitosa);
  return (

    <div>
      

      <div className="contenedor-prestamos-principal">
        
        <div className="img-contenedor">
          <img className="img-prestamos" src={img} alt="Logo de bienestar" />
        </div>
        <div className="contenedor-prestamos">
          <h1>Detalles del prestamo</h1>
          <p className="parr-prestamo">
            Querido usuario, usted tendra un tiempo de 15 minutos para ir a buscar
            el implemento deportivo, recuerde devolverlo dentro del horario
            estipulado, en buenas condiciones y respetando las normas señaladas en
            las politicas de prestamos designadas por el area de Bienestar.
          </p>

          <div className="cot-UND">
            <div>
              <b> Usuario: </b> {decode.nombre}
            </div>

            <div>
              <p>
                <b>Implemento:</b>{" "}
                {inforPrestamo.map((implemento) => implemento.nombre).join(", ")}
              </p>
            </div>

            {inforPrestamo.map((implemento, index) => (
              <div key={index}>

              </div>
            ))}


          </div>

          <form onSubmit={handleSubmit}>
            <div className="contenedor-inputs">

            </div>

            <div className="contenedor-btn-prestamos">
              <button
                className="btn-prestamo"
                style={{ marginRight: "10%" }}
                type="submit"
              >
                Confirmar Prestamo
              </button>
            </div>

            <div>
              <p>Fecha de generación: {fechaInicio.toLocaleString()}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}