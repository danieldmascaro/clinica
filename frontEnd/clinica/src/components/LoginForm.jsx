import React from "react";
import { login } from "./loginService";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import Button from "./Button";
import Formulario from "./Formulario";


function LoginForm() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const location = useLocation();
  const loginType = location.state?.loginType;
  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password); 
      console.log(data.email);
      window.location.replace('/redireccionlogin');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex justify-center items-center">
        <Formulario titulo="Inicio de sesión" onSubmit={handleSubmit(handleLogin)}>
          <InputField
            name="email"
            label="Correo electrónico:"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            autoComplete="username"
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
            autoComplete="current-password"
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
          <div className="flex justify-between gap-2 mb-2">
            <div className="flex justify-around gap-1 text-xs font-bold">
              <input type="checkbox" {...register("recordar")} />
              <p>Recordar</p>
            </div>
            <div className="text-xs">
            <Link to="/cambiarcontrasena">¿Olvidaste tu contraseña?</Link>
            </div>
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
        </Formulario>
      </div>
  );
}
export default LoginForm;
