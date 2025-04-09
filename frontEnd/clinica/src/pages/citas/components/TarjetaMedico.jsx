import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TarjetaMedico = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Nueva variable para manejar errores
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      const endpoint = "http://127.0.0.1:8000/api/medicos/";

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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

  if (loading) return <p>Cargando....</p>
  if (error) return <p>Error: {error}</p>, window.location.replace('/');

  return (
    <div className="flex flex-col col-span-8 gap-4 m-2">
      {data.map((medicos) => (
        <div key={medicos.id} className="bg-blue-800 text-blue-100 grid grid-cols-10 rounded-2xl p-2">
          <div className="col-span-2 p-3">
            <img
              src={medicos.avatar}
              alt={medicos.nombres}
              className="h-40 m-4 rounded-full"
            />
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl">
              {medicos.nombres} {medicos.primer_apellido} {medicos.segundo_apellido}
            </h2>
            <h2>{medicos.especialidad}</h2>
          </div>
          <div className="col-span-6 m-4 flex flex-col gap-4">
            <div className="bg-blue-700 text-blue-100 h-1/2 items-center flex p-3 rounded-2xl">
              <h1>Próxima hora disponible</h1>
            </div>
            <div className="h-1/2 flex justify-end items-center">
              <Link to='/' className="bg-blue-200 text-blue-950 p-3 rounded-2xl shadow-2xl">
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
