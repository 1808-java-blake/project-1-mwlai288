import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import AllRequests from "./components/manager/AllRequests";
import CreateRequests from "./components/employees/CreateRequest";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import ApproveDeny from "./components/manager/ApproveDeny";
import Navigation from "./components/navbar/Navigation";
// import Requests from "./components/employees/Requests";

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/requests" component={AllRequests} />
              <Route path="/request/:id" component={ApproveDeny} />
              <Route path="/create-request" component={CreateRequests} />
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}
export default App;
