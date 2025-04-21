import { useState, useEffect } from "react";
import Formulario from "../Formulario";
import { useForm } from "react-hook-form";
import SelectField from "../SelectField";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { displayGridCols } from "../Formulario";
import InputField from "../InputField";

const MedicoFiltro = ({ onClose }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ especialidad: null });
  const [especialidad, setEspecialidad] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    Promise.all([
      fetch('http://127.0.0.1:8000/api/especialidad', {}).then((response) => 
      response.json()
    ),
      fetch('http://127.0.0.1:8000/api/medicos-select', {}).then((response) =>
      response.json()
    )
    ])
    .then(([especialidad, medico]) => {
      const espMapped = especialidad.map((item) => ({
        value: item.id,
        label: item.nombre
      }));
      const medicoMapped = medico.map((item) => {
        const nombreCompleto = `${item.nombres} ${item.primer_apellido} ${item.segundo_apellido}`;
        const especialidades = item.especialidad?.map((e) => e.nombre).join(", ") || "Sin especialidad";
      
        return {
          value: item.id,
          label: `${nombreCompleto}, ${especialidades}`
        };
      });
      setEspecialidad(espMapped)
      setMedicos(medicoMapped)
      setLoading(false)
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const onSubmit = (data) => {
    const filtros = {};
    if (data.especialidad) {
      filtros.especialidad = data.especialidad;
    }
    if (data.nombre) {
      filtros.nombre = data.nombre;
    }
    if (Object.keys(filtros).length > 0) {
      navigate('/citas', {state: filtros });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Formulario
        titulo="Reserva tu hora"
        onSubmit={handleSubmit(onSubmit)}
        className={displayGridCols}
      >
        <div className="grid grid-rows-2">
          <SelectField
            name="especialidad"
            control={control}
            label="Selecciona la especialidad médica"
            options={especialidad}
            isMulti={false}
            placeholder="Selecciona una especialidad"
          />
          <SelectField
            name="nombre"
            control={control}
            label="Nombre"
            options={medicos}
            isMulti={false}
            placeholder="Escribe el nombre del médico"
          />
          
        </div>
        <div></div>
        <div></div>
        <Button type="submit">Buscar</Button>
      </Formulario>
    </div>
  );
};

export default MedicoFiltro;
