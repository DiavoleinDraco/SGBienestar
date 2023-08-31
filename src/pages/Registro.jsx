import ComSelect from "../components/styles/ComSelect.jsx";

export default function Registro () {
  return (
    <div>
    <ComSelect nombre= "Tipo de documento" items={["C.C", "T.I", "PA","C.E"]}/>
    <ComSelect nombre= "Género" items={["Masculino","Femenino","Otro"]} />
    <ComSelect nombre= "Tipo de Sangre" items={["A+","O+","B+","AB+","A-","O-","B-","AB-"]} />
    <ComSelect nombre= "Rol" items={["Instructor","Aprendiz","Administrador"]} />
    </div>
  );
}

