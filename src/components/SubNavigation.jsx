import React from "react";
import classes from "./SubNavigation.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SubNavigation = () => {
  const currentMail = useSelector((state) => state.email);
  const unRead = useSelector((state) => state.unRead);

  return (
    <div>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <Link to="/main/compose">Compose</Link>
            </li>
            <li>
              <Link to="/main/inbox">
                Inbox <sup>{unRead}</sup>
              </Link>
            </li>
            <li>
              <Link to="/main/sent">Sent</Link>
            </li>
          </ul>
        </nav>
        <ul>
          <li>
            <Link to="/main/inbox">Welcome {currentMail}</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default SubNavigation;
