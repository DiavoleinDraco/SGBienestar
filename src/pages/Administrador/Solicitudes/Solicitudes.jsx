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
  const [IdPerdido, setIdPerdido] = useState("");
  const [IdRetrasado, setIdRetrasado] = useState("");
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const ESTADO_APROBADO = "Aprobado";
  const ESTADO_RECHAZADO = "Rechazado";
  const ESTADO_FALLIDO = "Fallido";
  const ESTADO_COMPLETADO = "Completado";
  const ESTADO_PENDIENTE = "Pendiente";
  const ESTADO_PERDIDO = "Perdido";
  const ESTADO_RETRASADO = "Retrasado";



  //_____Filtro de sanciones________

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterBySearchTerm = (row) => {
    const searchTermLowerCase = removeAccents(searchTerm.toLowerCase());
    const rowWithoutAccents = {
      ...row,
      fecha_inicio: removeAccents(row.fecha_inicio),
      usuario: {
        ...row.usuario,
        nombres: removeAccents(row.usuario?.nombres),
        apellidos: removeAccents(row.usuario?.apellidos),
        n_doc: removeAccents(row.usuario?.n_doc),
      },
      implementos: (row.implementos || []).map((implemento) => ({
        ...implemento,
        nombre: removeAccents(implemento.nombre),
      })),
      estado: {
        ...row.estado,
        nombre: removeAccents(row.estado.nombre),
      },
    };

    return (
      rowWithoutAccents.fecha_inicio.includes(searchTermLowerCase) ||
      (rowWithoutAccents.usuario?.nombres + " " + rowWithoutAccents.usuario?.apellidos)
        .toLowerCase()
        .includes(searchTermLowerCase) ||
      rowWithoutAccents.usuario?.n_doc.toLowerCase().includes(searchTermLowerCase) ||
      rowWithoutAccents.implementos.some((implemento) =>
        implemento.nombre.toLowerCase().includes(searchTermLowerCase)
      ) ||
      rowWithoutAccents.estado.nombre.toLowerCase().includes(searchTermLowerCase)
    );
  };


  //_____Peticion para traer todas los prestamos

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


  //___________

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
            row.nombre === ESTADO_PENDIENTE ||
            row.nombre === ESTADO_PERDIDO ||
            row.nombre === ESTADO_RETRASADO
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

        const perdido = filtrados.find(
          (row) => row.nombre === ESTADO_PERDIDO
        );
        const retrasado = filtrados.find(
          (row) => row.nombre === ESTADO_RETRASADO
        );


        setIdAprobado(aprobado?._id || null);
        setIdRechazado(rechazado?._id || null);
        setIdFallido(fallido?._id || null);
        setIdCompletado(completado?._id || null);
        setIdPendiente(pendiente?._id || null);
        setIdPerdido(perdido?._id || null);
        setIdRetrasado(retrasado?._id || null);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchDataEstado();
  }, [idAprobado, idRechazado, idFallido, idCompletado, IdPendiente, IdPerdido, IdRetrasado]);

  console.log("IDss", idAprobado, idRechazado, idFallido, idCompletado, IdPendiente, IdPerdido, IdRetrasado);


  //_____ botones 


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


  const handleRecibido = async (id) => {
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


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterTableData = () => {
    const dataToRender = searchTerm ? tableData.filter(filterBySearchTerm) : tableData;

    const sortedData = dataToRender.sort((a, b) => {
      const dateA = new Date(a.fecha_inicio);
      const dateB = new Date(b.fecha_inicio);

      return dateB - dateA;
    });

    const filterLowerCase = filter?.toLowerCase();

    switch (filterLowerCase) {
      case "pendientes":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_PENDIENTE);
      case "aprobado":
      case "perdido":
      case "retrasado":
        return sortedData.filter((row) => row.estado.nombre.toLowerCase() === filterLowerCase);
      case "rechazadas":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_RECHAZADO);
      case "fallidas":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_FALLIDO);
      case "completados":
        return sortedData.filter((row) => row.estado.nombre === ESTADO_COMPLETADO);
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

      <Menu></Menu>

      <div className="contenedor-table-solicitudes">

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

            <input
              type="text"
              placeholder="Buscar..."
              onChange={handleSearch}
              value={searchTerm}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            />


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
              onClick={() => setFilter("aprobado")}
            >
              Aprobado
            </Button>

            <Button
              className="boton-solicitudes"
              variant="contained"
              onClick={() => setFilter("retrasado")}
            >
              Retrasado
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
              onClick={() => setFilter("rechazadas")}

            >
              Rechazadas
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
              onClick={() => setFilter("perdido")}
            >
              Perdido
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
              <TableRow>
                <TableCell align="right">
                  <b>FECHA</b>
                </TableCell>
                <TableCell align="right">
                  <b>USUARIO</b>
                </TableCell>
                <TableCell align="right">
                  <b>N. DOCUMENTO</b>
                </TableCell>
                <TableCell align="right">
                  <b>IMPLEMENTO</b>
                </TableCell>
                <TableCell align="right">
                  <b>ESTADO DE LA SOLICITUD</b>
                </TableCell>
                {(filter === "aprobado" || filter === "perdido" || filter === "retrasado") && (
                  <TableCell align="right">
                    <b>RECIBIR</b>
                  </TableCell>
                )}
                {filter === "pendientes" && (
                  <>
                    <TableCell align="right">
                      <b>Aceptar solicitud</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Rechazar solicitud</b>
                    </TableCell>
                  </>
                )}
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
                    {row.usuario?.nombres + " " + row.usuario?.apellidos}
                  </TableCell>
                  <TableCell align="right">{row.usuario?.n_doc}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {row.implementos?.map((implemento) => (
                      <span key={implemento.id}>
                        {implemento.nombre}
                        {implemento !== row.implementos[row.implementos.length - 1] && ", "}
                      </span>
                    ))}
                  </TableCell>

                  <TableCell align="right">{row.estado.nombre}</TableCell>
                  {filter === "aprobado" || filter === "perdido" || filter === "retrasado" ? (
                    <>
                      <TableCell align="right">
                        <Button
                          style={{ background: "#e3e3e3", color: "#2c0757" }}
                          variant="contained"
                          color="primary"
                          onClick={() => handleRecibido(row._id)}
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