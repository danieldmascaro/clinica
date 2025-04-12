export const SignUp = async (
  nombres, primer_apellido, segundo_apellido,
  rut, email, fecha_nacimiento, telefono,
  genero, password, re_password
) => {
  // Obtener el csrfToken
  const csrfResponse = await fetch('http://localhost:8000/api/csrf-token/', {
    credentials: 'include',
  });

  const csrfData = await csrfResponse.json();
  const csrfToken = csrfData.csrfToken;

  const requestBody = {
    nombres, primer_apellido, segundo_apellido, rut, email,
    fecha_nacimiento, telefono, genero, password, re_password
  };

  const response = await fetch("http://localhost:8000/api/registro-pacientes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Registro fallido");
  }

  return await response.json(); // Devuelve la respuesta del servidor
};
