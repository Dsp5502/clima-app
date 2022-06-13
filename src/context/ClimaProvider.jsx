import axios from 'axios';
import { createContext, useState } from 'react';

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [noResultado, setNoResultado] = useState('');

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const consultarClima = async (datos) => {
    setCargando(true);
    setNoResultado(false);
    try {
      const { ciudad, pais } = datos;
      const appID = import.meta.env.VITE_API_KEY;

      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appID}`;
      const { data } = await axios(url);
      const { lat, lon } = data[0];
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`;
      const { data: clima } = await axios(urlClima);
      setResultado(clima);
    } catch (error) {
      setNoResultado('No hay resultados');
    } finally {
      setCargando(false);
    }
  };
  return (
    <ClimaContext.Provider
      value={{
        datosBusqueda,
        busqueda,
        consultarClima,
        resultado,
        cargando,
        noResultado,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };
export default ClimaContext;
