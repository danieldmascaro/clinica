import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, parseISO } from 'date-fns';
import '../../styles/calendar.css'

const HorasDisponibles = () => {
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [diasConHoras, setDiasConHoras] = useState(new Set());
    const location = useLocation();
    const { id } = location.state || {};
    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/api/horas-disponibles/?medico=${id}`)
            .then ((res) => res.json())
            .then ((data) => {
                setHorasDisponibles(data);
                const dias = new Set(
                    data.map((hora) => format(parseISO(hora.inicio), 'yyyy-MM-dd'))
                );
                setDiasConHoras(dias);
            })
            .catch((err) => console.error('Error al cargar las horas:', err))
        }
    }, [id])
    console.log(id)

    const tileDisabled = ({ date, view }) => {
        if (view !== 'month') return false;
        const fecha = format(date, 'yyyy-MM-dd');
        return !diasConHoras.has(fecha);
      };
    
      const tileClassName = ({ date, view }) => {
        if (view !== 'month') return '';
        const fecha = format(date, 'yyyy-MM-dd');
        return diasConHoras.has(fecha) ? 'bg-green-200 text-green-900 font-semibold rounded' : '';
      };
    
      const onChange = (date) => {
        const fecha = format(date, 'yyyy-MM-dd');
        const horasDelDia = horasDisponibles.filter(
          (hora) => format(parseISO(hora.inicio), 'yyyy-MM-dd') === fecha
        );
        console.log('Horas del día seleccionado:', horasDelDia);
      };
    
      return (
        <div className="flex justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Selecciona una fecha</h2>
            <Calendar
              onClickDay={onChange}
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
            />
          </div>
        </div>
      );
    };
    
export default HorasDisponibles;
    