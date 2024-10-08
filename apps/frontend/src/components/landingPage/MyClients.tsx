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
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;

const ClientImage = styled('img')`
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
`;

function MyClients() {
  return (
    <MyClientContainer>
      {/* <div className='clients-carousel'> */}
      <ClientImage src={KPMG} alt={'Client KPMG'} style={{ maxHeight: '90px' }} />
      <ClientImage src={WWNZ} alt={'Client WWNZ}'} style={{ maxHeight: '70px' }} />
      <ClientImage src={NZSF} alt={'Client NZSF'} style={{ maxHeight: '120px' }} />
      <ClientImage src={TFF} alt={'Client TFF'} style={{ maxHeight: '70px' }} />
      <ClientImage src={briscoes} alt={'Client Briscoes'} style={{ maxHeight: '70px' }} />

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
