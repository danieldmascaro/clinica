import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUp } from "./SignUpService";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Formulario from "./Formulario";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { displayGridCols } from "./Formulario";

function SignUpForm() {
  const [regiones, setRegiones] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [previsiones, setPrevision] = useState([]);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();
  const password = watch("password");
  
  useEffect(() => {
    Promise.all([
      fetch("http://127.0.0.1:8000/api/regiones", {
      }).then((response) => response.json()),
      
      fetch("http://127.0.0.1:8000/api/ciudades", {
      }).then((response) => response.json()),

      fetch("http://127.0.0.1:8000/api/comunas", {
      }).then((response) => response.json()),
      fetch("http://127.0.0.1:8000/api/previsiones", {
      }).then((response) => response.json()),
    ])
      .then(([regiones, ciudades, comunas, previsiones]) => {
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

  const handleSignUp = async (data) => {
    try {
      await SignUp(
        data.nombres,
        data.primer_apellido,
        data.segundo_apellido,
        data.rut,
        data.email,
        data.fecha_nacimiento,
        data.telefono,
        data.genero,
        data.password,
        data.re_password
      );
      navigate("/accountcreated", { state: { formData: data } });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex justify-center">
      <Formulario titulo="Crear cuenta" onSubmit={handleSubmit(handleSignUp)} className={displayGridCols}>
        <InputField
          name="nombres"
          label="Nombres"
          type="text"
          placeholder="Ingresa tus nombres"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{3,}/,
              message: "Debes ingresar más de 3 caracteres",
            },
          }}
        />
        <InputField
          name="primer_apellido"
          label="Primer apellido"
          type="text"
          placeholder="Ingresa tu primer apellido"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{2,}/,
              message: "Debes ingresar más de 2 caracteres",
            },
          }}
        />
        <InputField
          name="segundo_apellido"
          label="Segundo apellido"
          type="text"
          placeholder="Ingresa tu segundo apellido"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /.{2,}/,
              message: "Debes ingresar más de 2 caracteres",
            },
          }}
        />
        <InputField
          name="rut"
          label="Rut"
          type="text"
          placeholder="12345678-9 (con guión sin puntos)"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^\d{7,8}-[0-9Kk]$/,
              message: "RUT inválido (usa formato 12345678-K)",
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
          placeholder="Ingresa tu correo electrónico"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
              message: "Ingresa un correo electrónico válido",
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
          name="prevision"
          control={control}
          label="Previsión"
          options={previsiones}
          isMulti={false}
          rules={{ required: "Campo obligatorio" }}
          placeholder="Selecciona una previsión"
        />
        <InputField
          name="password"
          label="Contraseña:"
          type="password"
          placeholder="Ingresa tu contraseña"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Debe tener al menos 8 caracteres, una letra y un número.",
            },
          }}
        />
        <InputField
          name="re_password"
          label="Repita su contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          control={control}
          rules={{
            required: "Campo obligatorio",
            pattern: {
              value: (value) =>
                value === password || "Las contraseñas no coinciden",
            },
          }}
        />
        <div className="sm:min-w-70">
          
        </div>
        <div>

        </div>
        <Button type="submit">Crear cuenta</Button>
      </Formulario>
    </div>
  );
}

export default SignUpForm;
