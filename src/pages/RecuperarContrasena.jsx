
import InputCorreo from "../components/ComantCorreo/ComantCorreo";
import ButtonContraseña from "../components/ButtonContraseña/ButtonContraseña";
import './RecuperarContrasena.css';
import Textfield from "../components/Textfield/Textfield";

export default function RecuperarContrasena() {



    return (



        <div className="container-padre-rec-contraseña">
            <h1 className="tittle">Recupera tu contraseña</h1>
            <div className="item">
                <InputCorreo
                    label='Correo institucional'
                    institutional
                    onChange={(value) => {
                        handleChange('correo_inst', value);
                        setCorreoInstitucional(value);
                    }} required />
            </div>

            <div className="item">
                <Textfield
                    name="Codigo"
                    onChange={(value) => handleChange("codigo", value)}
                    required />
            </div>

            <div className="item item-re-contraseña">
                <ButtonContraseña
                    nombre={"nueva contraseña"}
                    onChange={(value) => handleChange('contrasena', value)} required />
            </div>
        </div>
    )

}