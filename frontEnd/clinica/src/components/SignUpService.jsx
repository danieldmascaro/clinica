export const SignUp = async (nombres, primer_apellido, segundo_apellido, rut, email, fecha_nacimiento, telefono, genero, password, re_password) => {
  const requestBody = { nombres, primer_apellido, segundo_apellido, rut, email, fecha_nacimiento, telefono, genero, password, re_password };
  const response = await fetch("http://localhost:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombres, primer_apellido, segundo_apellido, rut, email, fecha_nacimiento, telefono, genero, password, re_password })
    });
    if (!response.ok) {
      console.log(JSON.stringify(requestBody))
      throw new Error("Login failed");
    }
  };