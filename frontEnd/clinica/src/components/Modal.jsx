const Modal = ({ isOpen, onClose, children, showCloseButton = true}) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="rounded-xl shadow-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-700 hover:text-black text-5xl"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default Modal;
  