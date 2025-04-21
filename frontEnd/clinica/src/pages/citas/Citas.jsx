import BarraFiltros from "./components/BarraFiltros";
import TarjetaMedico from "./components/TarjetaMedico";
const Citas = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-5 gap-3">
      <BarraFiltros></BarraFiltros>
      <TarjetaMedico></TarjetaMedico>
    </div>
  );
};

export default Citas;
