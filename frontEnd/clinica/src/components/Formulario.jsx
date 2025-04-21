export const displayGridCols = "flex flex-col sm:grid sm:grid-cols-3 w-max gap-3";
const Formulario = ({
  titulo,
  onSubmit,
  className = "flex flex-col w-max gap-3",
  h1className = "text-3xl mb-4 text-center",
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl
             p-10 bg-white mt-15 shadow-2xl font-bold text-blue-700">
        <h1 className={h1className}>{titulo}</h1>
        <form onSubmit={onSubmit} className={className}>
        {children}
        </form>
    </div>
    
  );
};

export default Formulario;
