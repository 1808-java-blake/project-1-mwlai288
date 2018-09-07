import axios from "axios";
import * as React from "react";

export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: {}
    };
  }

  public async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios.get(`http://localhost:3001/users/${id}`);
    this.setState({
      users: res.data
    });
  }

  public render() {
    return (
      <div>
        Welcome: {this.state.users.first_name}
        <td>{this.state.users.username}</td>
      </div>
    );
  }
}
