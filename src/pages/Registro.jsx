import ComSelect from "../components/ComSelect/ComSelect.jsx";
import AutoComplete from "../components/AutoComplete/AutoComplete.jsx";
import Textfield from "../components/Textfield/Textfield.jsx";
import ModalTyC from "../components/ModalTyC/ModalTyC.jsx";
import Buttons from "../components/Buttons/Buttons.jsx";
import Date from "../components/Date/Date.jsx"
import { Link } from "react-router-dom";
import ButtonContraseña from "../components/ButtonContraseña/ButtonContraseña.jsx";
import InputCorreo from "../components/ComantCorreo/ComantCorreo.jsx"
import './registro.css'


export default function Registro () {
 
    return (
      <div className="container">
      <div className="item"><Textfield nombre='Nombres' required/></div>
      <div className="item"><Textfield nombre='Apellidos'required/></div>
      <div className="item"><ComSelect nombre= "Tipo de documento" items={["C.C", "T.I", "P.A","C.E"]} required/></div>
      <div className="item"><Textfield nombre='Número de documento'required/></div>
      <div className="item"><Date Descripcion= 'Fecha de Nacimiento'/></div>
      <div className="item"><ComSelect nombre= "Rol" items={["Instructor","Aprendiz","Administrador"]} required/></div>
      <div className="item"><AutoComplete nombre= 'Ficha' array={[
      { label: 2712267, programa: 'Programación de software' },
      { label: 6384789, programa: 'Programación de software' },
      { label: 9039843, programa: 'Programación de software' },
      { label: 2435363, programa: 'Programación de software' },
      { label: 4357722, programa: 'Programación de software' },
      { label: 8922224, programa: 'Programación de software' },
      { label: 7289332, programa: 'Programación de software' },
      ]}/> </div>
      <div className="item"><Textfield nombre='Teléfono'required/></div>
      <div className="item"><Textfield nombre='Dirección'/></div>
      <div className="item"> <AutoComplete nombre= 'EPS' array={[
      { label: 'SALUD TOTAL S.A E.P.S' },
      { label: 'SALUDVIDA S.A E.P.S' },
      { label: 'SAVIA SALUD EPS' },
      { label: 'MALLAMAS' },
      { label: 'E.P.S SANITAS S.A' },
      ]}/></div>
      <div className="item"><ComSelect nombre= "Tipo de Sangre" items={["A+","O+","B+","AB+","A-","O-","B-","AB-"]}/></div>
      <div className="item"><ComSelect nombre= "Género" items={["Masculino","Femenino","Otro"]} required/></div>
      <div className="item"><InputCorreo label='Correo institucional'institutional/></div>
      <div className="item"><InputCorreo label='Correo personal'personal/></div>
      <div className="item"><ButtonContraseña nombre={"contraseña"} /></div>
      <div className="item"><ModalTyC nombre='Términos y condiciones' texto='Términos y Condiciones del Sitio Web [Tu Nombre de Sitio Web]
        Bienvenido/a a [Tu Nombre de Sitio Web]. Antes de utilizar nuestro sitio web, te pedimos que leas y comprendas los siguientes términos y condiciones:
        Aceptación de Términos: Al acceder y utilizar [Tu Nombre de Sitio Web], aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con estos términos, por favor, no uses nuestro sitio web.
        Uso Apropiado: Este sitio web está destinado para uso personal y no comercial. No debes utilizarlo para actividades ilegales o que violen los derechos de terceros.
        Propiedad Intelectual: Todo el contenido, diseño y recursos de [Tu Nombre de Sitio Web] están protegidos por derechos de propiedad intelectual. No se permite la reproducción, distribución o modificación sin nuestro consentimiento.
        Privacidad: Respetamos tu privacidad. Consulta nuestra Política de Privacidad para obtener información sobre cómo manejamos tus datos personales.
        Enlaces Externos: [Tu Nombre de Sitio Web] puede contener enlaces a sitios web externos. No somos responsables del contenido o políticas de privacidad de esos sitios.
        Cambios en los Términos: Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios se harán efectivos al publicar la versión actualizada en nuestro sitio web.
        Descargo de Responsabilidad: [Tu Nombre de Sitio Web] se proporciona "tal cual" y no garantizamos su disponibilidad, precisión o idoneidad para un propósito específico. No somos responsables de cualquier daño o pérdida que pueda resultar del uso de nuestro sitio web.
        Contacto: Si tienes preguntas o comentarios sobre estos términos y condiciones, por favor contáctanos a través de [tu dirección de correo electrónico].
        Al utilizar [Tu Nombre de Sitio Web], aceptas cumplir con estos términos y condiciones. Te agradecemos por visitar nuestro sitio web y esperamos que disfrutes de tu experiencia aquí.
        [Fecha de Última Actualización de Términos y Condiciones]'/></div>
      <div className="item"> <Buttons nombre='Registrarse'/></div>
      <Link to="/Home">Home</Link>
    </div>
  );
};
