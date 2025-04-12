import React from "react";
import { useForm } from "react-hook-form";
import { SignUp } from "./SignUpService";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const contraseña = watch("password");

  const handleSignUp = async (data) => {
    try {
      // Llamada a la función SignUp para registrar al usuario
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
      navigate("/accountcreated", { state: { formData: data } })
    } catch (err) {
      // Manejar errores de registro
      alert(err);
    }
  };

  const contraseñasComunes = [
    "12345678",
    "password",
    "password123",
    "qwerty123",
    "11111111",
    "admin123",
    "abc12345",
    "123123123",
    "00000000",
    "123456789"
  ];

  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center gap-4 rounded-xl p-15 text-blue-50 bg-[#051850] mt-15 shadow-2xl shadow-[#070f27]">
        <h1 className="text-3xl mb-4">Crear cuenta</h1>
        <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col h-max gap-2">
          {/* Nombres */}
          <label>Nombres</label>
          <input
            type="text"
            placeholder="Ingresa ambos nombres"
            {...register("nombres", { required: "Campo obligatorio", pattern: { value: /.{3,}/, message: "Debe tener más de 3 caracteres" } })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.nombres && <span className="text-red-500">{errors.nombres.message}</span>}

          {/* Primer apellido */}
          <label>Primer apellido</label>
          <input
            type="text"
            placeholder="Ingresa tu primer apellido"
            {...register("primer_apellido", { required: "Campo obligatorio", pattern: { value: /.{3,}/, message: "Debe tener más de 3 caracteres" } })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.primer_apellido && <span className="text-red-500">{errors.primer_apellido.message}</span>}

          {/* Segundo apellido */}
          <label>Segundo apellido</label>
          <input
            type="text"
            placeholder="Ingresa tu segundo apellido"
            {...register("segundo_apellido", { required: "Campo obligatorio", pattern: { value: /.{3,}/, message: "Debe tener más de 3 caracteres" } })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.segundo_apellido && <span className="text-red-500">{errors.segundo_apellido.message}</span>}

          {/* RUT */}
          <label>RUT</label>
          <input
            type="text"
            placeholder="Ingresa tu RUT"
            {...register("rut", {
              required: "Campo obligatorio",
              pattern: { value: /^\d{7,8}-[0-9Kk]$/, message: "RUT inválido (usa formato 12345678-K)" },
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.rut && <span className="text-red-500">{errors.rut.message}</span>}

          {/* Correo electrónico */}
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            {...register("email", {
              required: "Campo obligatorio",
              pattern: { value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, message: "Ingresa un email válido" },
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          {/* Fecha de nacimiento */}
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            {...register("fecha_nacimiento", {
              required: "Campo obligatorio",
              validate: (value) => {
                const hoy = new Date();
                const fechaIngresada = new Date(value);
                if (fechaIngresada > hoy) {
                  return "Ingresa una fecha de nacimiento real.";
                }
                let edad = hoy.getFullYear() - fechaIngresada.getFullYear();
                const mes = hoy.getMonth() - fechaIngresada.getMonth();
                const dia = hoy.getDate() - fechaIngresada.getDate();
                if (mes < 0 || (mes === 0 && dia < 0)) edad--;
                if (edad < 13) return "Debes tener al menos 13 años para registrarte";
                if (edad > 120) return "Edad no válida. Verifica tu fecha de nacimiento";
                return true;
              },
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.fecha_nacimiento && <span className="text-red-500">{errors.fecha_nacimiento.message}</span>}

          {/* Género */}
          <label>Género</label>
          <select
            {...register("genero", { required: "Campo obligatorio" })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Prefiero no especificar</option>
          </select>
          {errors.genero && <span className="text-red-500">{errors.genero.message}</span>}

          {/* Teléfono */}
          <label>Número de teléfono</label>
          <input
            type="text"
            placeholder="+569XXXXXXX"
            {...register("telefono", { required: "Campo obligatorio", minLength: { value: 8, message: "ingrese un teléfono válido" } })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.telefono && <span className="text-red-500">{errors.telefono.message}</span>}

          {/* Contraseña */}
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: "Campo obligatorio",
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, message: "Debe incluir al menos una letra y un número" },
              validate: (value) => contraseñasComunes.includes(value.toLowerCase()) ? "Contraseña demasiado común" : true,
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}

          {/* Confirmación de contraseña */}
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            {...register("re_password", {
              required: "Campo obligatorio",
              validate: (value) => value === contraseña || "Las contraseñas no coinciden",
            })}
            className="p-2 bg-blue-100 text-blue-900 placeholder:text-blue-900 focus:bg-blue-300 duration-300 rounded-xl"
          />
          {errors.re_password && <span className="text-red-500">{errors.re_password.message}</span>}

          {/* Botón de envío */}
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
