import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";

const CrearMedico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [regiones, setRegiones] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [especialidades, setEspecialidad] = useState([])
  const [previsiones, setPrevision] = useState([])
  const token = localStorage.getItem("access");

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/regiones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()),

      fetch("http://127.0.0.1:8000/api/ciudades", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()),

      fetch("http://127.0.0.1:8000/api/comunas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()),
      fetch("http://127.0.0.1:8000/api/especialidad", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()),
      fetch("http://127.0.0.1:8000/api/previsiones", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json()),
    ])
      .then(([regiones, ciudades, comunas, especialidades, previsiones]) => {
        setRegiones(regiones);
        setCiudades(ciudades);
        setComunas(comunas);
        setEspecialidad(especialidades);
        setPrevision(previsiones);
      })
      .catch((error) => console.error("Error cargando locaciones:", error));
  }, []);

  const desplegar = () => {
    console.log(especialidades);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar") {
        formData.append(key, value[0]); // Para el avatar (que es un archivo)
      } else if (key === "especialidad") {
        // Si es especialidad (múltiple), agregar cada especialidad como un item separado
        value.forEach((esp) => {
          formData.append(key, esp); // Para agregar especialidades individuales
        });
      } else {
        formData.append(key, value);
      }
    });
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/registro-medicos/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
 
      if (!response.ok) throw new Error("Error en el servidor");
      alert("Cuenta creada exitosamente");
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center gap-4 rounded-xl p-15 text-blue-700 font-bold bg-white mt-15 shadow-2xl shadow-[#070f27]">
        <h1 className="text-3xl mb-4">Crear cuenta</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-max gap-2"
        >
          <label>Nombres</label>
          <input
            type="text"
            name="nombres"
            placeholder="Ingresa ambos nombres"
            required
            className="p-2 border rounded"
            {...register("nombres", {
              required: "Campo obligatorio",
              pattern: {
                value: /.{3,}/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Primer apellido</label>
          <input
            type="text"
            name="primer_apellido"
            placeholder="Ingresa el primer apellido"
            required
            className="p-2 border rounded"
            {...register("primer_apellido", {
              required: "Campo obligatorio",
              pattern: {
                value: /.{3,}/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Segundo apellido</label>
          <input
            type="text"
            name="segundo_apellido"
            placeholder="Ingresa el segundo apellido"
            required
            className="p-2 border rounded"
            {...register("segundo_apellido", {
              required: "Campo obligatorio",
              pattern: {
                value: /.{3,}/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Rut</label>
          <input
            type="text"
            name="rut"
            placeholder="Ingresa el rut"
            required
            className="p-2 border rounded"
            {...register("rut", {
              required: "Campo obligatorio",
              pattern: {
                value: /^\d{7,8}-[0-9Kk]$/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            placeholder="Ingresa fecha de nacimiento"
            required
            className="p-2 border rounded"
            {...register("fecha_nacimiento", { required: "Campo obligatorio" })}
          />
          <label>Género</label>
          <select
            name="genero"
            required
            className="p-2 border rounded"
            {...register("genero", { required: "Campo obligatorio" })}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Prefiero no especificar</option>
            </select>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa el email"
            required
            className="p-2 border rounded"
            {...register("email", {
              required: "Campo obligatorio",
              pattern: {
                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Ingrese número de teléfono"
            required
            className="p-2 border rounded"
            {...register("telefono", {
              required: "Campo obligatorio",
              pattern: {
                value: /.{3,}/,
                message: "Debe tener más de 3 caracteres",
              },
            })}
          />
          <label>Región</label>
          <select
            type="text"
            name="region"
            required
            className="p-2 border rounded"
            {...register("region", { required: "Campo obligatorio" })}
          >
            <option value="">Selecciona una región</option>
            {regiones.map((region) => (
              <option key={region.id} value={region.id}>
                {region.nombre}
              </option>
            ))}
          </select>
          <label>Ciudad</label>
          <select
            type="text"
            name="ciudad"
            required
            className="p-2 border rounded"
            {...register("ciudad", { required: "Campo obligatorio" })}
          >
            <option value="">Selecciona una región</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
          <label>Comuna</label>
          <select
            type="text"
            name="comuna"
            required
            className="p-2 border rounded"
            {...register("comuna", { required: "Campo obligatorio" })}>
            <option value="">Selecciona una región</option>
              {comunas.map((comuna) => (
                <option key={comuna.id} value={comuna.id}>
                  {comuna.nombre}
                </option>
              ))}
          </select>
          <label>Especialidad</label>
          <select
            multiple
            required
            className="p-2 border rounded"
            {...register("especialidad", { required: "Campo obligatorio" })}
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>
                {esp.nombre}
              </option>
            ))}
            </select>
          <label>Previsión de salud</label>
          <select
            multiple
            required
            className="p-2 border rounded"
            {...register("prevision", { required: "Campo obligatorio" })}
          >
            <option value="">Selecciona una especialidad</option>
            {previsiones.map((prevision) => (
              <option key={prevision.id} value={prevision.id}>
                {prevision.nombre}
              </option>
            ))}
            </select>
          <label>Avatar</label>
          <input
            type="file"
            name="avatar"
            required
            className="p-2 border rounded"
            {...register("avatar", { required: "Campo obligatorio" })}/>        
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Crear cuenta
          </button>
          <button onClick={desplegar}>datos</button>
        </form>
      </div>
    </div>
  );
};

export default CrearMedico;
