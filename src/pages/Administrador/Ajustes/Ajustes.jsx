import React, { useState } from "react";
import Menu from "../../../components/menu/Menu";
import Textfield from "../../../components/Textfield/Textfield";
import "./Ajustes.css";

export default function Ajustes() {
    const [editMode, setEditMode] = useState({
        nuevaEPS: false,
        tiempoSancion: false,
        tiempoPrestamo: false,
    });

    const [values, setValues] = useState({
        nuevaEPS: "",
        tiempoSancion: "",
        tiempoPrestamo: "",
    });

    const [initialValues, setInitialValues] = useState({
        nuevaEPS: "",
        tiempoSancion: "",
        tiempoPrestamo: "",
    });

    const handleInputChange = (e, adjustmentType) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [adjustmentType]: value,
        }));
    };

    const handleEditClick = (adjustmentType) => {
        setInitialValues((prevValues) => ({
            ...prevValues,
            [adjustmentType]: values[adjustmentType],
        }));

        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [adjustmentType]: true,
        }));
    };

    const handleSaveClick = (adjustmentType) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [adjustmentType]: false,
        }));
    };

    const handleDiscardChangesClick = (adjustmentType) => {
        setValues((prevValues) => ({
            ...prevValues,
            [adjustmentType]: initialValues[adjustmentType],
        }));

        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [adjustmentType]: false,
        }));
    };

    return (
        <div className="padre-ajustes">
            <Menu />

            <div className="contenedor-principal-ajustes">

                <div className="contenedor-titulo-ajustes">
                    <h1>Ajustes del Sistema</h1>
                </div>
                <div className="contenedor-campos-ajuste">

                    <div className="contenedor-NuEPS">
                        <p>Agregar una nueva EPS</p>
                        <Textfield
                            className="son-codigo"
                            name="Nueva EPS"
                            value={values.nuevaEPS}
                            onChange={(e) => handleInputChange(e, "nuevaEPS")}
                            readOnly={!editMode.nuevaEPS}
                        />
                        {!editMode.nuevaEPS ? (
                            <>
                                <button className="btn-editar" onClick={() => handleEditClick("nuevaEPS")}>
                                    Editar
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleSaveClick("nuevaEPS")}>
                                    Guardar cambios
                                </button>
                                <button onClick={() => handleDiscardChangesClick("nuevaEPS")}>
                                    Descartar cambios
                                </button>
                            </>
                        )}
                    </div>

                    <div className="contenedor-TiSan">
                        <p>Cambiar el tiempo predeterminado <br /> de una sanción</p>
                        <Textfield
                            className="son-codigo"
                            name="Tiempo Sancion"
                            value={values.tiempoSancion}
                            onChange={(e) => handleInputChange(e, "tiempoSancion")}
                            readOnly={!editMode.tiempoSancion}
                        />
                        {!editMode.tiempoSancion ? (
                            <>
                                <button className="btn-editar" onClick={() => handleEditClick("tiempoSancion")}>
                                    Editar
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleSaveClick("tiempoSancion")}>
                                    Guardar cambios
                                </button>
                                <button
                                    onClick={() => handleDiscardChangesClick("tiempoSancion")}
                                >
                                    Descartar cambios
                                </button>
                            </>
                        )}
                    </div>

                    <div className="contenedor-tiPres">
                        <p>Cambiar el tiempo de préstamos</p>
                        <Textfield
                            className="son-codigo"
                            name="Tiempo Prestamo"
                            value={values.tiempoPrestamo}
                            onChange={(e) => handleInputChange(e, "tiempoPrestamo")}
                            readOnly={!editMode.tiempoPrestamo}
                        />
                        {!editMode.tiempoPrestamo ? (
                            <>
                                <button className="btn-editar" onClick={() => handleEditClick("tiempoPrestamo")}>
                                    Editar
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleSaveClick("tiempoPrestamo")}>
                                    Guardar cambios
                                </button>
                                <button
                                    onClick={() => handleDiscardChangesClick("tiempoPrestamo")}
                                >
                                    Descartar cambios
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}