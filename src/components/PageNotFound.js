import React from "react";
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  return (
    <div className="page-not-found">
      <h1 className="page-not-found__error-title">404</h1>
      <p className="page-not-found__error-subtitle">Страница не найдена</p>
      <button className="page-not-found__link" onClick={() => history.goBack()}>Назад</button>
    </div>

  );
}

export default PageNotFound;
