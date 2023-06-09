import React from "react";
import classes from "./SubNavigation.module.css";
import { Link } from "react-router-dom";

const SubNavigation = () => {
  return (
    <div>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <Link to="/main/compose">Compose</Link>
            </li>
            <li>
              <Link to="/main/inbox">Inbox</Link>
            </li>
            <li>
              <Link to="/main/sent">Sent</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default SubNavigation;
