// import { useMsal } from '@azure/msal-react';
// import { Button, Container, Stack } from 'react-bootstrap';

// function NoAccessPage() {
//   const { instance } = useMsal();

//   const handleClick = () => {
//     instance.logoutRedirect();
//   };

//   return (
//     <div className='dashboard-page no-access-page' data-testid='no-access-page'>
//       <div className='persona-block'>
//         <div className='no-access-wrapper'>
//           <Container>
//             <h1>Sorry, you don&apos;t have access yet</h1>
//           </Container>
//         </div>
//       </div>
//       <div className='no-access-page-body'>
//         <Container>
//           <Stack gap={4} className='no-access-stack'>
//             <p className='centre-text'>
//               You do not have permission to access any projects yet. Please reach out to your relevant contact for
//               support if you believe this is an error.
//             </p>
//             <Button onClick={handleClick}>Return to Login</Button>
//           </Stack>
//         </Container>
//       </div>
//     </div>
//   );
// }
// export default NoAccessPage;
