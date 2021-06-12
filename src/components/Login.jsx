import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../FirebaseConfig";

const Login = () => {
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        setErrorMsg(null);
        navigate.push("/registered");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setErrorMsg("Ya hay un usuario registrado con ese email");
        }
        if (err.code === "auth/invalid-email") {
          setErrorMsg(
            "Formato de email no es válido. Ejemplo de formato válido: xxxxx@yyy.zzz"
          );
        }
        if (err.code === "auth/weak-password") {
          setErrorMsg(
            "Contraseña débil. La contraseña debe tener al menos seis caracteres"
          );
        }
      });
  };
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        setErrorMsg(null);
        navigate.push("/registered");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setErrorMsg("No hay ningún usuario registrado con ese email");
        }
        if (err.code === "auth/wrong-password") {
          setErrorMsg("Contraseña incorrecta");
        }
      });
  };
  return (
    <div className="row justify-content-center">
      <div className="col-sm-6">
        <form className="form-group mt-5">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control mb-3"
            type="email"
            placeholder="Introduce Email"
            autoComplete="username"
          />
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            className="form-control mb-3"
            type="password"
            placeholder="Introduce Contraseña"
            autoComplete="current-password"
          />
          {errorMsg ? (
            <div className="alert alert-danger">{errorMsg}</div>
          ) : (
            <span></span>
          )}

          <div className="d-grid gap-3">
            <button
              onClick={register}
              className="btn btn-block text-white"
              style={{ backgroundColor: "OliveDrab" }}
              type="button"
              value="Registrar Usuario"
            >
              Register
            </button>
            <button
              onClick={login}
              className="btn btn-block"
              style={{ backgroundColor: "PaleGreen" }}
              type="button"
              value="Iniciar Sesión"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
