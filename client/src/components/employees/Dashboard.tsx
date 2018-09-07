// import axios from "axios";
import * as React from "react";

export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: []
    };
  }

  // public async componentDidMount() {
  //   const res = await axios.get("http://localhost:3001/users");
  //   console.log(res);
  // }

  public render() {
    return (
      <div>
        <h2>hello</h2>
      </div>
    );
  }
}
