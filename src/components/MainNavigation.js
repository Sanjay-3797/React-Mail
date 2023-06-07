import { Link, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useSelector((state) => state.theme);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  return (
    <header
      className={classes.header}
      style={{ backgroundColor: theme ? "black" : "#38015c" }}
    >
      <Link to="/">
        <div className={classes.logo}>Mail</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/main">Inbox</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
