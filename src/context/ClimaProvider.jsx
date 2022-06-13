import axios from 'axios';
import { createContext, useState } from 'react';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const consultarClima = async (datos) => {
    try {
      const { ciudad, pais } = datos;
      const appID = import.meta.env.VITE_API_KEY;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&limit=1&appid=${appID}`;
      const { data } = await axios(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClimaContext.Provider value={{ datosBusqueda, busqueda, consultarClima }}>
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };
export default ClimaContext;
