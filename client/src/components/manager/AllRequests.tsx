import axios from "axios";
import * as React from "react";
// export interface IAppProps {
// }

export default class AllRequests extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: []
    };
  }

  public async componentDidMount() {
    const res = await axios.get("http://localhost:3001/reimbursement");
    console.log(res);
    this.setState({
      reimbursements: res.data
    });
  }

  public render() {
    return (
      <div>
        <h2>hello</h2>

        {this.state.reimbursements.map((reimbursement: any) => {
          return (
            <ol key={reimbursement.id}>
              <li>${reimbursement.amount}</li>
              <li>{reimbursement.description}</li>
            </ol>
          );
        })}
      </div>
    );
  }
}
