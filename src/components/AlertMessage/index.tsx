import * as React from "react";
import { RootState, AlertsActions } from "../../redux/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doRemoveAlert } from "../../redux/actions/alerts";
import { Affix, Alert } from "antd";

class AlertMessage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { show: true };
  }

  render() {
    return (
      <Affix offsetBottom={25}>
        {this.props.alerts.map((alert: any) => (
          <Alert
            message="Success"
            closable
            key={alert.id}
            type="success"
            showIcon
            onClose={() => this.props.onRemoveAlert(alert.id)}
            description={alert.message}
          ></Alert>
        ))}
      </Affix>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  alerts: state.alertsState.alerts
});

const mapDispatchtoProps = (dispatch: Dispatch<AlertsActions>) => ({
  onRemoveAlert: (id: string) => dispatch(doRemoveAlert(id))
});

export default connect(mapStateToProps, mapDispatchtoProps)(AlertMessage);
