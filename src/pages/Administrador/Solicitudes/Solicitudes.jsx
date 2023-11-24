import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "../../../components/menu/Menu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import get, { actualizar, getParametre, post } from "../../../UseFetch";
import "./Solicitudes.css";
// importacion de la imagen para el diseño.
import imagen from "./png.jpg";

export default function BasicTable() {
  const [tableData, setTableData] = useState([]);
  const [selectEstado, setTableDataEstado] = useState([]);
  const [datosGuardados, setDatosGuardados] = useState([]);
  const [idAprobado, setIdAprobado] = useState("");
  const [idRechazado, setIdRechazado] = useState("");
  const [idFallido, setIdFallido] = useState("");
  const [idCompletado, setIdCompletado] = useState("");
  const [IdPendiente, setIdPendiente] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const ESTADO_APROBADO = "Aprobado";
  const ESTADO_RECHAZADO = "Rechazado";
  const ESTADO_FALLIDO = "Fallido";
  const ESTADO_COMPLETADO = "Completado";
  const ESTADO_PENDIENTE = "Pendiente";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get("/prestamos");
        setTableData(data);
        setDatosGuardados(data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataEstado = async () => {
      try {
        const data = await get("/estado-prestamo");
        const filtrados = data.filter(
          (row) =>
            row.nombre === ESTADO_APROBADO ||
            row.nombre === ESTADO_RECHAZADO ||
            row.nombre === ESTADO_FALLIDO ||
            row.nombre === ESTADO_COMPLETADO ||
            row.nombre === ESTADO_PENDIENTE
        );
        const estadoSolicitudes = filtrados.map((row) => ({
          _id: row._id,
          nombre: row.nombre,
        }));
        setTableDataEstado(estadoSolicitudes);

        const aprobado = filtrados.find(
          (row) => row.nombre === ESTADO_APROBADO
        );
        const rechazado = filtrados.find(
          (row) => row.nombre === ESTADO_RECHAZADO
        );
        const fallido = filtrados.find((row) => row.nombre === ESTADO_FALLIDO);
        const completado = filtrados.find(
          (row) => row.nombre === ESTADO_COMPLETADO
        );
        const pendiente = filtrados.find(
          (row) => row.nombre === ESTADO_PENDIENTE
        );

        setIdAprobado(aprobado?._id || null);
        setIdRechazado(rechazado?._id || null);
        setIdFallido(fallido?._id || null);
        setIdCompletado(completado?._id || null);
        setIdPendiente(pendiente?._id || null);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchDataEstado();
  }, [idAprobado, idRechazado, idFallido, idCompletado, IdPendiente]);

  console.log("IdPendiente:", IdPendiente);

  const handleAceptar = async (id) => {
    try {
      const rowData = tableData.find((row) => row._id === id);

      if (rowData.estado.nombre === ESTADO_FALLIDO) {
        setErrorMessage("No se puede aprobar una solicitud fallida.");
        setAlertOpen(true);
        return;
      }

      const data = {
        id
      };

      const response = await getParametre("/prestamos/aprobar/", id);

      setErrorMessage("");
      setAlertOpen(false);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  const handleRechazar = async (id) => {
    try {
      const rowData = tableData.find((row) => row._id === id);

      if (rowData.estado.nombre === ESTADO_FALLIDO) {
        setErrorMessage("No se puede rechazar una solicitud fallida.");
        setAlertOpen(true);
        return;
      }

      const data = {
        id,
        estado: idRechazado,
      };

      const response = await post("/prestamos/finalizar", data);

      setErrorMessage("");
      setAlertOpen(false);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  const handleRecibir = async (id) => {
    try {
      const data = {
        id: id,
        estado: idCompletado,
      };

      const response = await post("/prestamos/finalizar", data);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  const filterTableData = () => {
    const dataToRender = searchTerm ? filterTableData : tableData;

    const sortedData = dataToRender.sort((a, b) => {
      const dateA = new Date(a.fecha_inicio);
      const dateB = new Date(b.fecha_inicio);

      return dateB - dateA;
    });

    switch (filter) {
      case "pendientes":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_PENDIENTE
        );
      case "aprobadas":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_APROBADO
        );
      case "rechazadas":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_RECHAZADO
        );
      case "fallidas":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_FALLIDO);
      case "completados":
        return sortedData.filter(
          (row) => row.estado.nombre === ESTADO_COMPLETADO
        );

      default:
        return sortedData;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div>
      <div className="contenedor-table-solicitudes">
        <Menu></Menu>

        <div className="contenedor-TitleSoli">
          <h2 className="TitleSoli">
            Apartado de <br /> Solicitudes
          </h2>
        </div>
        <div
          className="imagen-sanciones-container"
          style={{ background: "#2c0757" }}
        >
        </div>
        <TableContainer className="cont-table-solicitudes" component={Paper}>
          <div
            style={{
              background: "#eaeaea",
              borderBottom: "0.1px solid #868686",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
            className="btncont"
          >
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("pendientes")}
            >
              Pendientes
            </Button>
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("aprobadas")}
            >
              Aprobadas
            </Button>
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("rechazadas")}
            >
              Rechazadas
            </Button>
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("fallidas")}
            >
              Fallidas
            </Button>
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("completados")}
            >
              Completados
            </Button>
            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter(null)}
            >
              Todos
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              style={{
                background: "#eaeaea",
                borderBottom: "0.1px solid #868686",
                position: "sticky",
                top: 65,
                zIndex: 99,
              }}
            >
              <TableRow >
                <TableCell align="right">
                  {" "}
                  <b> Fecha </b>{" "}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <b> Usuario </b>{" "}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <b> Numero de Documento </b>{" "}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <b> Nombre del Implemento </b>{" "}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <b> Estado de la solicitud </b>{" "}
                </TableCell>
                {filter === "aprobadas" ? (
                  <>
                    <TableCell align="right">
                      {" "}
                      <b> Recibir </b>{" "}
                    </TableCell>
                  </>
                ) : filter === "pendientes" ? (
                  <>
                    <TableCell align="right">
                      {" "}
                      <b> Aceptar solicitud </b>{" "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <b> Rechazar solicitud </b>{" "}
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterTableData().map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    {formatDate(row.fecha_inicio)}
                  </TableCell>
                  <TableCell align="right">
                    {row.usuario.nombres + " " + row.usuario.apellidos}
                  </TableCell>
                  <TableCell align="right">{row.usuario.n_doc}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {row.implementos.map((implemento, index) => (
                      <span key={index}>
                        {implemento.nombre}
                        {index !== row.implementos.length - 1 && ", "}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell align="right">{row.estado.nombre}</TableCell>
                  {filter === "aprobadas" ? (
                    <>
                      <TableCell align="right">
                        <Button
                          style={{ background: "#e3e3e3", color: "#2c0757" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleRecibir(row._id)}
                        >
                          Recibido
                        </Button>
                      </TableCell>
                    </>
                  ) : filter === "pendientes" ? (
                    <>
                      <TableCell align="right">
                        <Button
                          style={{ background: "#e3e3e3", color: "#2c0757" }}
                          variant="contained"
                          color="success"
                          onClick={() => handleAceptar(row._id)}
                        >
                          Aceptar
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRechazar(row._id)}
                        >
                          Rechazar
                        </Button>
                      </TableCell>
                    </>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}