import { useState } from "react";

function Box({ children, isOpen: controlledIsOpen, setIsOpen }) {
    const isControlled = controlledIsOpen !== undefined && setIsOpen;
    const [internalIsOpen, setInternalIsOpen] = useState(true);
  
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const toggle = () =>
    isControlled ? setIsOpen(!controlledIsOpen) : setInternalIsOpen((open) => !open);
  
    return (
      <div className="box">
        <button className="btn-toggle" onClick={toggle}>
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    );
  }
  export default Box;