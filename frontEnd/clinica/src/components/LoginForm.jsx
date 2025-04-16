import React from "react";
import { login } from "./loginService";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";


function LoginForm() {
  const { register, handleSubmit, formState: { errors }, control } = useForm(); // Gestión del formulario
  const location = useLocation();
  const loginType = location.state?.loginType;
  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password); 
      console.log(data.rut);
      window.location.replace('/redireccionlogin');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="flex justify-center flex-col items-center gap-4 rounded-xl
         p-10 bg-white mt-15 shadow-2xl"
      >
        <h1 className="text-3xl mb-4 font-bold text-blue-700">Inicio de sesión</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col h-max gap-2">
          <InputField
            name="email"
            label="Correo electrónico:"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            control={control}
            rules={{
              required: "Campo obligatorio",
              pattern: {
                value:  /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                message:
                  "Correo electrónico inválido",
              },
            }}
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
          <div className="flex justify-between text-xs font-bold">
            <div className="flex justify-around gap-1">
              <input type="checkbox" {...register("recordar")} />
              <p>Recordar</p>
            </div>
            <Link to="/cambiarcontrasena">¿Olvidaste tu contraseña?</Link>
          </div>
          <Button type="submit">Iniciar sesión</Button>
            {loginType === "paciente" || !loginType && (
              <>
                <div className="font-bold text-blue-500">
                  <h1>¿No tienes cuenta? <Link to="/signup" className="text-blue-400">Crea una aquí</Link></h1>
                </div>
              </>)
            }
            {loginType === "admin" && (
              <></>
            )

            }
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
