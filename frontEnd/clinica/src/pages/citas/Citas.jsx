import BarraFiltros from "./components/BarraFiltros";
import TarjetaMedico from "./components/TarjetaMedico";
const Citas = () => {
  return (
    <div className="grid grid-cols-10">
      <BarraFiltros></BarraFiltros>
      <TarjetaMedico></TarjetaMedico>
    </div>
  );
};

export default Citas;
