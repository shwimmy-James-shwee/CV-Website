// import { useContext } from 'react';
// import { AlertContext } from './AlertContext';
// import Alert from '@mui/material/Alert';

// function AlertComponent() {
//   const { alerts, removeAlert } = useContext(AlertContext);
//   if (!alerts) return <></>;

//   function showAlerts() {
//     return (
//       <AlertDiv>
//         {alerts.map((alert, index) => {
//           // eslint-disable-next-line @typescript-eslint/no-unused-vars
//           const { alertContent, ...otherAlert } = alert;
//           return (
//             <div key={index} className='pb-1' data-testid='the-alert'>
//               <Alert
//                 {...otherAlert}
//                 onClose={() => {
//                   removeAlert(alert);
//                 }}
//               >
//                 {alert?.header && <Alert.Heading>{alert.header}</Alert.Heading>}
//                 {alert?.alertContent && <>{alert.alertContent}</>}
//               </Alert>
//             </div>
//           );
//         })}
//       </AlertDiv>
//     );
//   }

//   return alerts.length ? <>{showAlerts()}</> : <></>;
// }
// export default AlertComponent;
