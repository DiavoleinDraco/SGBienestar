// PaginaIntermedia.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaIntermedia = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes agregar lógica adicional si es necesario
    // Por ejemplo, realizar comprobaciones antes de redirigir

    // Después de cualquier lógica necesaria, redirige a la página adecuada
    window.location.reload()
    const token = localStorage.getItem('privilegio');
    const ruta = token && token > 1 ? '/usuarios' : '/admin';

    navigate(ruta);
  }, [navigate]);

  return (
    // Puedes mostrar un mensaje o componente de carga si es necesario
    <div>
      Redirigiendo...
    </div>
  );
};

export default PaginaIntermedia;
