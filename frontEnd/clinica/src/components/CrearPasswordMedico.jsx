import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import Formulario from "./Formulario";

const CrearPasswordMedico = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { uid, token } = location.state || {};
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("new_password");

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      uid,
      token,
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/users/reset_password_confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }
      if (response.status !== 204) {
        const responseData = await response.json();
        console.log(responseData);
      }
      setMessage(
        "Contraseña creada con éxito. Ya puedes iniciar sesión con tus credenciales.",
        navigate("/")
      );
    } catch (error) {
      setMessage("Error al crear contraseña y validar el usuario");
      console.log(finalData);
      console.error("Error: ", error);
    }
  };
  return (
    <div className="flex justify-center">
      <Formulario titulo="Crea tu contraseña" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="new_password"
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
          name="re_new_password"
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
        <Button type="submit" text="Cambiar contraseña" />
      </Formulario>
    </div>
  );
};

export default CrearPasswordMedico;
