import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AlertContext } from './AlertContext';
import styled from 'styled-components';

const AlertDiv = styled.div`
  transition: top 0.3s ease-in-out;
  top: 1rem;
  position: fixed;
  width: 95vw;
  max-width: 1080px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
`;
function AlertComponent() {
  const { alerts, removeAlert } = useContext(AlertContext);
  if (!alerts) return <></>;

  function showAlerts() {
    return (
      <AlertDiv>
        {alerts.map((alert, index) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { alertContent, ...otherAlert } = alert;
          return (
            <div key={index} className='pb-1' data-testid='the-alert'>
              <Alert
                {...otherAlert}
                onClose={() => {
                  removeAlert(alert);
                }}
                dismissible
                transition
                className='my-1 pt-2 pb-3'
              >
                {alert?.header && <Alert.Heading>{alert.header}</Alert.Heading>}
                {alert?.alertContent && <>{alert.alertContent}</>}
              </Alert>
            </div>
          );
        })}
      </AlertDiv>
    );
  }

  return alerts.length ? <>{showAlerts()}</> : <></>;
}
export default AlertComponent;
