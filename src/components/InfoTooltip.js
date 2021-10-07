import React from "react";

function InfoTooltip({title, subtitle, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""} }`}>
      <div className="popup__container popup__container_info">
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title popup__title_profile">{title}</h2>
        <p className="popup__subtitle-info">{subtitle}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;