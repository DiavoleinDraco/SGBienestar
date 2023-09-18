import React from 'react';
import { Link } from "react-router-dom";
import InputCorreo from "../components/ComantCorreo/ComantCorreo.jsx";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <InputCorreo
      label='Correo institucional'
      required/>
      <Link to="/home">Home</Link>
    </div>
  );
};