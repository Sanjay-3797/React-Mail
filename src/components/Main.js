import React from "react";
import SubNavigation from "./SubNavigation";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Compose from "./mail/Compose";
import Inbox from "./mail/Inbox";

const Main = () => {
  return (
    <div>
      <SubNavigation />
      <Switch>
        <Route path="/main/compose">
          <Compose />
        </Route>
        <Route path="/main/inbox">
          <Inbox />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
