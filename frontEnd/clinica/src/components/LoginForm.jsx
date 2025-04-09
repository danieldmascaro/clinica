import React from "react";
import { login } from "./loginService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Gestión del formulario
  const navigate = useNavigate();
  const { setUser, setToken} = useAuth

  const handleLogin = async (data) => {
    try {
      await login(data.rut, data.password); // Enviar datos al servicio de login
      window.location.replace('/');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="flex justify-center flex-col items-center gap-4 rounded-xl
         p-10 text-blue-50 bg-[#051850] mt-15 shadow-2xl shadow-[#070f27]"
      >
        <h1 className="text-3xl mb-4">Inicio de sesión</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col h-max gap-2">
          <label>Rut</label>
          <input
            type="text"
            placeholder="Ingresa tu Rut"
            {...register("rut", {
              required: "El RUT es obligatorio",
              pattern: {
                value: /^\d+-\d$/,
                message: "Rut inválido"
              }
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 
            focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.rut && <span className="text-red-500">{errors.rut.message}</span>}

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 
            focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          <div className="flex justify-between text-xs">
            <div className="flex justify-around gap-1">
              <input type="checkbox" {...register("recordar")} />
              <p>Recordar</p>
            </div>
            <Link to="/crearCuenta">¿No tienes cuenta?</Link>
          </div>
          <button type="submit" className="bg-blue-400 p-2 hover:bg-blue-300 text-blue-900 rounded-xl">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
