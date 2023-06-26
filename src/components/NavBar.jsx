import { Link, useHistory } from "react-router-dom";
import "./styles/NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/actions";
export function Navbar() {
  let history = useHistory();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  function logOut() {
    dispatch(clearUser());
  }
  return (
    <div className="navBar">
      <div className="contentUser">
        {user.id ? (
          <>
            <h2>{user.name}</h2>

            <button onClick={() => history.push("/create")}>
              Add videogame
            </button>

            <button className="buttonOptinal" onClick={logOut}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => history.push("/login")}>Log In</button>

            <button
              className="buttonOptinal"
              onClick={() => history.push("/register")}
            >
              Registrer me
            </button>
          </>
        )}
      </div>
      <div className="contentButtons">
        <button className="buttonNav" onClick={() => history.push("/home")}>
          Home
        </button>

        <button className="buttonNav">About me</button>
        <button className="buttonNav">Genres</button>
        <button className="buttonNav">Plataforms</button>
      </div>
    </div>
  );
}
