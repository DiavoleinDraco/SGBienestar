import React, { useState, useEffect } from "react";
import Menu from "../../components/menu/Menu";
import "./Perfil.css";
import jwtDecode from "jwt-decode";
import { getParametre } from "../../UseFetch";
import EditIcon from "@mui/icons-material/Edit";
import Textfield from "../../components/Textfield/Textfield";
import CircularColor from "../../components/Cargando/Cargando";
import Buttons from "../../components/Buttons/Buttons";
import icono from "./incon_user-removebg-preview.png";
export default function RecuperarContrasena() {
  const [datosActualizados, setDatosActualizados] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actualizar, setActualizar] = useState(false);
  const [editable, setEditable] = useState(false);
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getParametre("/registro/usuario/", decode.id);
        setUserData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [decode.id]);
  console.log(editable);
  const handleInputChange = (fieldName, value) => {
    setDatosActualizados((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setActualizar(true); // Marcar como actualizado al realizar cambios
  };

  const handleSaveChanges = () => {
    setEditable(false);
    console.log("editable");
    setActualizar(false);
    //actualizar('/registro/usuarios/',decode.id, actualizar)
  };

  useEffect(() => {
    const handleUnload = (event) => {
      if (actualizar) {
        const message =
          "¡Atención! Hay cambios no guardados. ¿Seguro que quieres salir?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [actualizar]);

  if (loading) {
    return <CircularColor></CircularColor>;
  }

  const handleEditarClick = () => {
    console.log(editable);
    setEditable(true);
  };

  console.log(datosActualizados);
  if (userData) {
    return (
      <div className="container-perfil-org">
        <Menu></Menu>

        <div className="contenedor-padre-perfil">
          <h2 className="title-perfil">Editar datos de usuario</h2>

          <div className="contenedor-de-texfields">
            <div className="contenedor-texfield-perfil">
              <Textfield
                editable={editable}
                name={"Telefono"}
                inicial={userData ? userData.telefono : null}
                onChange={(value) => handleInputChange("telefono", value)}
              ></Textfield>
              <span
                style={{ marginLeft: "-1%", cursor: "pointer" }}
                onClick={handleEditarClick}
              >
                <EditIcon> </EditIcon>
              </span>
            </div>

            <div className="contenedor-texfield-perfil">
              <Textfield
                editable={editable}
                name={"Correo Personal"}
                inicial={userData.correo_pers}
                onChange={(value) => handleInputChange("correo_pers", value)}
              ></Textfield>
              <span
                style={{ marginLeft: "-1%", cursor: "pointer" }}
                onClick={handleEditarClick}
              >
                <EditIcon> </EditIcon>
              </span>
            </div>

            <div className="contenedor-texfield-perfil">
              <Textfield
                editable={editable}
                name={"Dirección"}
                inicial={userData.direccion}
                onChange={(value) => handleInputChange("direccion", value)}
              ></Textfield>
              <span
                style={{ marginLeft: "-1%", cursor: "pointer" }}
                onClick={handleEditarClick}
              >
                <EditIcon> </EditIcon>
              </span>
            </div>

            <div className="contenedor-texfield-perfil">
              <Textfield
                editable={editable}
                name={"Genero"}
                inicial={userData.genero}
                onChange={(value) => handleInputChange("genero", value)}
              ></Textfield>
              <span
                style={{ marginLeft: "-1%", cursor: "pointer" }}
                onClick={handleEditarClick}
              >
                <EditIcon> </EditIcon>
              </span>


            </div>
            <div className="contenedor-texfield-perfil">
              <Textfield
                editable={editable}
                name={"EPS"}
                inicial={userData.eps}
                onChange={(value) => handleInputChange("eps", value)}
              ></Textfield>
              <span
                style={{ marginLeft: "-1%", cursor: "pointer" }}
                onClick={handleEditarClick}
              >
                <EditIcon> </EditIcon>
              </span>


            </div>
          </div>

          <div className="btn-perfil">
            <Buttons nombre={"Guardar cambios"} onclick={handleSaveChanges}>
              Guardar
            </Buttons>
          </div>

          <div className="contenedor-info-perfil">
            <div className="contenedor-img-perfil">
              <img src={icono}></img>
            </div>
            <p>Nombres y Apellidos: {decode.nombre + " " + decode.apellidos}</p>
            <p>Correo Institucional: {decode.correo_inst}</p>
            <p>Fecha de nacimiento: {userData && userData.nacimiento}</p>
            <p>Tipo de sangre: {userData && userData.rh}</p>
            {/*
            Cambiar la peticion de registro/info para poder hacer las peticiones completas con todos los datos
             */}
          </div>
        </div>
      </div>
    );
  }

  return <p>Error al cargar los datos del usuario.</p>;
}
