import React from "react";
import SubNavigation from "./SubNavigation";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Compose from "./mail/Compose";
import Inbox from "./mail/Inbox";
import Sent from "./mail/Sent";

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
        <Route path="/main/sent">
          <Sent />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
