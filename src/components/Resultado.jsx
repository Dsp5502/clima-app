import React from 'react';
import useClima from '../hooks/useClima';

const Resultado = () => {
  const { resultado } = useClima();
  const { name, main } = resultado;

  const Kelvin = 273.15;
  return (
    <div className='contenedor clima'>
      <h2>El Clima de {name} es: </h2>
      <p>
        {parseInt(main.temp - Kelvin)} <span>&#x2103;</span>
      </p>
      <div className='temp-min-max'>
        <p>
          Mín: {parseInt(main.temp_min - Kelvin)} <span>&#x2103;</span>
        </p>
        <p>
          Máx: {parseInt(main.temp_max - Kelvin)} <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

export default Resultado;
