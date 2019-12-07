import * as React from "react";
import { Alert } from "react-bootstrap";
import { RootState, AlertsActions } from "../../redux/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { doRemoveAlert } from "../../redux/actions/alerts";

class AlertMessage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { show: true };

    this.handleDismiss = this.handleDismiss.bind(this);
  }
  handleDismiss() {
    // setTimeout(() => {
    //   this.setState({ show: false });
    // }, 3000);
  }
  render() {
    return (
      <div>
        {this.props.alerts.map((alert: any) => (
          <Alert
            dismissible
            style={{ bottom: "-240px" }}
            key={alert.id}
            variant="primary"
            onClose={() => this.props.onRemoveAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  alerts: state.alertsState.alerts
});

const mapDispatchtoProps = (dispatch: Dispatch<AlertsActions>) => ({
  onRemoveAlert: (id: string) => dispatch(doRemoveAlert(id))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(AlertMessage);
