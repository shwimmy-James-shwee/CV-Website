// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled, { keyframes } from 'styled-components';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   animation: ${fadeIn} 1s ease-in-out; /* Use the fadeIn animation */
// `;

// const Title = styled.h1`
//   font-size: 5rem;
//   margin-bottom: 2rem;
//   font-family: 'Fredoka One', cursive;
// `;

// const Subtitle = styled.h2`
//   font-size: 2rem;
//   margin-bottom: 2rem;
//   font-family: 'Open Sans', sans-serif;
// `;

// const LinkText = styled.span`
//   font-size: 1.5rem;
//   font-family: 'Open Sans', sans-serif;
// `;

// const NotFoundPage: React.FC = () => {
//   return (
//     <>
//       <Container data-testid='not-found-page'>
//         <Title data-testid='title'>Oops!</Title>
//         <Subtitle data-testid='subtitle'>We couldn&apos;t find the page you were looking for</Subtitle>
//         <Link to='/'>
//           <LinkText>Go back to the homepage</LinkText>
//         </Link>
//       </Container>
//     </>
//   );
// };

// export default NotFoundPage;
