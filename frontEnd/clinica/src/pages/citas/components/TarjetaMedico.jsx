import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TarjetaMedico = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = "http://127.0.0.1:8000/api/medicos/";

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
          "Content-Type": "application/json",
          },
          
        });
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) return<div className="text-6xl text-blue-200 p-10 ml-5 h-max w-max flex justify-center items-center">
                      <h1 className="text-6xl text-blue-200">Cargando...</h1>
                      </div>
   
  if (error) return <p>Error: {error}</p>
  if (data.length === 0) {
    return<div className="text-6xl text-blue-200 p-10 ml-5 h-max w-max flex justify-center items-center">
            <h1>ERROR</h1>
          </div>
  }

  return (
    <div className="flex flex-col col-span-8 gap-4 m-2">
      {data.map((medicos) => (
        <div key={medicos.id} className="bg-white rounded-md p-4 grid grid-cols-10 
        shadow-md hover:shadow-lg transition duration-200 ease-in-out hover:scale-[1.01]">
          <div className="col-span-2 p-3">
            <img
              src={medicos.avatar}
              alt={medicos.nombres}
              className="h-40 m-4 object-cover rounded-full border-4 border-blue-50"
            />
          </div>
          <div className="col-span-2 ml-4">
            <h2 className="text-2xl text-blue-700 font-bold">
              {medicos.nombres} {medicos.primer_apellido} {medicos.segundo_apellido}
            </h2>
            <h2 className="text-blue-400">
              {medicos.especialidad.map((esp, index) => (
              <span key={index}>
                {esp.nombre}
                {index < medicos.especialidad.length - 1 ? ', ' : ''}
              </span>
            ))}
            </h2>
          </div>
          <div className="col-span-6 m-4 flex flex-col gap-4 font-bold">
            <div className="bg-blue-100 text-blue-700 h-1/2 flex p-3 rounded-2xl justify-between hover:shadow-lg transition  
        duration-200 ease-in-out hover:scale-[1.01]">
              <h1>Próxima hora disponible</h1> <span className="text-sm opacity-90">08:30 hrs</span>
            </div>
            <div className="h-1/2 flex justify-end items-center">
              <Link to='/' className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition p-3 rounded-md shadow-2xl">
                Todas las horas disponibles
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarjetaMedico;
