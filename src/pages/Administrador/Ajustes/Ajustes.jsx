import React, { useEffect, useState } from "react";
import Menu from "../../../components/menu/Menu";
import Textfield from "../../../components/Textfield/Textfield";
//import "./Ajustes.css";
import EditIcon from "@mui/icons-material/Edit";
import Buttons from "../../../components/Buttons/Buttons";
import CircularColor from "../../../components/Cargando/Cargando";
import get,{actualizar} from "../../../UseFetch";
import { useNavigate } from "react-router-dom";
import "./Ajustes.css";

export default function Ajustes() {
    const [datosActualizados, setDatosActualizados] = useState({});
    const [editable, setEditable] = useState(false);
    const [actualizarr, setActualizar] = useState(false);
    const [eps, setEps] = useState({})
    const [actualConfig, setActualConfig] = useState({})
    const [loading, setLoading] = useState(true);
    const [actualizarEps, setActualizarEps] = useState(false);
    const navegacion = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await get("/config-sistema");
            setActualConfig(response);
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      const handleInputChange = (fieldName, value) => {
        if (fieldName.startsWith('nombre')) {
          setEps((prevEps) => ({
            ...prevEps,
            [fieldName]: value,
          }));
          setActualizarEps(true);
        } else {
          setDatosActualizados((prevState) => ({
            ...prevState,
            [fieldName]: value,
          }));
          setActualizar(true);
        }
      };

      const handleSaveChanges = async() => {
        try {
          setEditable(false);
          setActualizar(false);
          setActualizarEps(false);
          
          console.log(datosActualizados);
          console.log(eps);
         await actualizar('/config-sistema', `/${actualConfig._id}`, datosActualizados);
          
          // actualizar('/registro/eps/', decode.id, eps);
      
        }
        catch (error) {
          console.log(error)
        }
      }
     
      
    const handleEditarClick = () => {
        console.log(editable);
        setEditable(true);
    };

    useEffect(() => {
        const handleUnload = (event) => {
          if (actualizarr || actualizarEps) {
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
      }, [actualizarr, actualizarEps]);
      
      if (loading) {
        return <CircularColor></CircularColor>;
      }
      
      const handleButtonClick = () => {
        navegacion("/registro")
      }

    return (
        <div >

            <div >
                <div >
                    <Textfield
                        editable={editable}
                        name={"Horario de Inicio"}
                        onChange={(value) => handleInputChange("horario_inicio", value)}
                        inicial={actualConfig && actualConfig.horario_inicio}
                    ></Textfield>
                    <span
                        style={{ marginLeft: "-1%", cursor: "pointer" }}
                        onClick={handleEditarClick}
                    >
                        <EditIcon className="lapices-ajuste" style={{ color: '#000' }}> </EditIcon>
                    </span>
                </div>

                <div >
                    <Textfield
                        editable={editable}
                        name={"Horario Fin"}
                        onChange={(value) => handleInputChange("horario_fin", value)}
                        inicial={actualConfig && actualConfig.horario_fin}
                    ></Textfield>
                    <span
                        style={{ marginLeft: "-1%", cursor: "pointer" }}
                        onClick={handleEditarClick}
                    >
                        <EditIcon className="lapices-ajuste" style={{ color: '#000' }} />
                    </span>
                </div>

                <div >
                    <Textfield
                        editable={editable}
                        name={"Duracion Prestamo"}
                        inicial={actualConfig && actualConfig.duracion_prestamo}
                        onChange={(value) => handleInputChange("duracion_prestamo", value)}
                    ></Textfield>
                    <span
                        style={{ marginLeft: "-1%", cursor: "pointer" }}
                        onClick={handleEditarClick}
                    >
                        <EditIcon className="lapices-ajuste" style={{ color: '#000' }}> </EditIcon>
                    </span>
                </div>

                <div>
                    <Textfield
                        editable={editable}
                        name={"Duracion de sancion"}
                        inicial={actualConfig && actualConfig.duracion_sancion}
                        onChange={(value) => handleInputChange("duracion_sancion", value)}
                    ></Textfield>
                    <span
                        style={{ marginLeft: "-1%", cursor: "pointer" }}
                        onClick={handleEditarClick}
                    >
                        <EditIcon className="lapices-ajuste" style={{ color: '#000' }}> </EditIcon>
                    </span>


                </div>
                <div >
                    <Textfield
                        editable={editable}
                        name={"Crear Nueva Eps"}
                        onChange={(value) => handleInputChange("nombre", value)}
                    ></Textfield>
                    <span
                        style={{ marginLeft: "-1%", cursor: "pointer" }}
                        onClick={handleEditarClick}
                    >
                        <EditIcon className="lapices-ajuste" style={{ color: '#000' }}> </EditIcon>
                    </span>


                </div>
                <div className="cont-crear-adm">
                <p>Crea un nuevo administrador</p>
                <Buttons nombre={"Crear Admin"} onclick={handleButtonClick}>Crear</Buttons>
                </div>
            </div>
              
            <div >
                <Buttons nombre={"Guardar cambios"} onclick={handleSaveChanges}>
                    Guardar
                </Buttons>
            </div>


        </div>
    );
}