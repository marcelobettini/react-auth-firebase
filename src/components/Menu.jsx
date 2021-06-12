import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";

const Menu = () => {
  const navigate = useHistory();
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    // let isMounted = true;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogged(user.email);
      }
    });

    // return () => {
    //   isMounted = false;
    // };
  }, []);
  function close() {
    auth.signOut();
    setLogged(null);
    navigate.push("/home");
  }
  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-sm justify-content-around navbar-dark"
        style={{ backgroundColor: "OliveDrab" }}
      >
        <ul className="navbar-nav contenedor-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {logged === null ? (
            <li className="nav-item">
              <Link className="nav-link" to="/Login">
                Login
              </Link>
            </li>
          ) : (
            <span></span>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/Admin">
              Admin
            </Link>
          </li>
        </ul>
        <span className="text-white">{logged}</span>
        {logged != null ? (
          <button
            className="btn btn-dark btn-sm align-self-center align-items-end"
            onClick={close}
          >
            Cerrar Sesión
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </Fragment>
  );
};

export default Menu;
