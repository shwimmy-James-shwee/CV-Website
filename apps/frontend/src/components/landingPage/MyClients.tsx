import KPMG from '../../assets/images/KPMG.png';
import NZSF from '../../assets/images/NZSF.png';
import WWNZ from '../../assets/images/WWNZ.png';
import TFF from '../../assets/images/TFF.png';
import briscoes from '../../assets/images/briscoes.jpg';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const MyClientContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /* gap: 10px; */
`;

function MyClients() {
  return (
    <MyClientContainer>
      {/* <div className='clients-carousel'> */}
      <img src={KPMG} alt={'Client KPMG'} height={120} />
      <img src={WWNZ} alt={'Client WWNZ}'} height={100} />
      <img src={NZSF} alt={'Client NZSF'} height={150} />
      <img src={TFF} alt={'Client TFF'} height={100} />
      <img src={briscoes} alt={'Client Briscoes'} height={100} />

      {/* </div> */}
    </MyClientContainer>
  );
}

export default MyClients;

// wwnz x
// briscoes
// tff x
// nzsf x
// KPMG x
