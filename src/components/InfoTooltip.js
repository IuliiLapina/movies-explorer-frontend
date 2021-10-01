import React from "react";

function InfoTooltip() {
  return (
    <div className="popup">
      <div className="popup__container popup__container_info">
        <button
          className="popup__close-btn"
          type="button"
        ></button>
        <h2 className="popup__title popup__title_profile">Что-то пошло не так!</h2>
        <p className="popup__subtitle-info"></p>
      </div>
    </div>
  );
}

export default InfoTooltip;