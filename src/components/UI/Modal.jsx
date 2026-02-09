import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, children, customClasses = "", closeModal }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }

    return () => {
     modal.close()
    }
    
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${customClasses}`} onClose={closeModal}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
