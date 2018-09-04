import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllRequests from "./components/manager/AllRequests";
// import Requests from "./components/employees/Requests";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route path="/requests" component={AllRequests} />
        </Switch>
      </Router>
    );
  }
}
export default App;
