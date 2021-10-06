import React from "react";

function InfoTooltip({title, subtitle}) {
  return (
    <div className="popup">
      <div className="popup__container popup__container_info">
        <button
          className="popup__close-btn"
          type="button"
        ></button>
        <h2 className="popup__title popup__title_profile">{title}</h2>
        <p className="popup__subtitle-info">{subtitle}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;