import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import SelectField from "../../components/SelectField";
import InputField from "../../components/InputField";
import Formulario from "../../components/Formulario";
import { displayGridCols } from "../../components/Formulario";

const CrearMedico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [regiones, setRegiones] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [especialidad, setEspecialidad] = useState([]);
  const [previsiones, setPrevision] = useState([]);

  const token = localStorage.getItem("access");

  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/regiones", {}).then((response) =>
        response.json()
      ),
      fetch("http://127.0.0.1:8000/api/ciudades", {}).then((response) =>
        response.json()
      ),
      fetch("http://127.0.0.1:8000/api/comunas", {}).then((response) =>
        response.json()
      ),
      fetch("http://127.0.0.1:8000/api/especialidad", {
      }).then((response) => response.json()),
      fetch("http://127.0.0.1:8000/api/previsiones", {}).then((response) =>
        response.json()
      ),
    ])
      .then(([regiones, ciudades, comunas, especialidades, previsiones]) => {
        setRegiones(
          regiones.map((esp) => ({
            value: esp.id,
            label: esp.nombre,
          }))
        );
        setCiudades(
          ciudades.map((esp) => ({
            value: esp.id,
            label: esp.nombre,
          }))
        );
        setComunas(
          comunas.map((esp) => ({
            value: esp.id,
            label: esp.nombre,
          }))
        );
        setEspecialidad(
          especialidades.map((esp) => ({
            value: esp.id,
            label: esp.nombre,
          }))
        );
        setPrevision(
          previsiones.map((esp) => ({
            value: esp.id,
            label: esp.nombre,
          }))
        );
      })
      .catch((error) => console.error("Error cargando locaciones:", error));
  }, []);

  const generoChoices = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
    { value: "O", label: "Prefiero no especificar." },
  ];

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar") {
        formData.append(key, value[0]);
      } else if (key === "especialidad") {
        value.forEach((esp) => {
          formData.append(key, esp);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/registro-medicos/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error en el servidor");
      alert("Cuenta creada exitosamente");
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Formulario
        titulo="Crear médico"
        onSubmit={handleSubmit(onSubmit)}
        className={displayGridCols}
      >
        <InputField
          name="nombres"
          label="Nombres"
          type="text"
          placeholder="Ingresa los dos primeros nombres"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{3,}/,
              message: "Debe tener más de 3 caracteres",
            },
          }}
        />
        <InputField
          name="primer_apellido"
          label="Primer apellido"
          type="text"
          placeholder="Ingresa el primer apellido"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{3,}/,
              message: "Debe tener más de 3 caracteres",
            },
          }}
        />
        <InputField
          name="segundo_apellido"
          label="Segundo apellido"
          type="text"
          placeholder="Ingresa el segundo apellido"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{3,}/,
              message: "Debe tener más de 3 caracteres",
            },
          }}
        />
        <InputField
          name="rut"
          label="Rut"
          type="text"
          placeholder="12345678-9 (sin puntos, con guión)"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^\d{7,8}-[0-9Kk]$/,
              message: "Ingresa un rut válido",
            },
          }}
        />
        <InputField
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
          type="date"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              message: "Ingresa una fecha válida",
            },
          }}
        />
        <SelectField
          name="genero"
          control={control}
          label="Género"
          options={generoChoices}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona el género"
        />
        <InputField
          name="email"
          label="Correo electrónico"
          type="email"
          placeholder="Ingresa el correo electrónico"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
              message: "Ingresa un email válido",
            },
          }}
        />
        <InputField
          name="telefono"
          label="Teléfono"
          type="text"
          placeholder="+56912345678"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^\+\d{8,15}$/,
              message: "Ingresa un número de teléfono válido",
            },
          }}
        />
        <SelectField
          name="region"
          control={control}
          label="Región"
          options={regiones}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una región"
        />
        <SelectField
          name="ciudad"
          control={control}
          label="Ciudad"
          options={ciudades}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una ciudad"
        />
        <SelectField
          name="comuna"
          control={control}
          label="Comuna"
          options={comunas}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una comuna"
        />
        <SelectField
          name="especialidad"
          control={control}
          label="Especialidad"
          options={especialidad}
          isMulti={true}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una o más especialidades"
        />
        <SelectField
          name="prevision"
          control={control}
          label="Previsión"
          options={previsiones}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una previsión"
        />
        <div>
          <label>Avatar</label>
          <input
            type="file"
            name="avatar"
            required
            className="p-2 border rounded"
            {...register("avatar", { required: "Campo obligatorio" })}
          />
        </div>
        <div></div>
        <div></div>
        <Button type="submit">Crear cuenta</Button>
      </Formulario>
    </div>
  );
};

export default CrearMedico;
