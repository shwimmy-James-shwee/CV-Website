import KPMG from '../../assets/images/KPMG.png';
import NZSF from '../../assets/images/NZSF.png';
import WWNZ from '../../assets/images/WWNZ.png';
import TFF from '../../assets/images/TFF.png';
import briscoes from '../../assets/images/briscoes.jpg';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

const MyClientContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  /* margin-bottom: 100px; */
`;

const ClientImageWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
  /* background-color: lightblue; */
  /* height: 150px; */
`;

const ClientImage = styled('img')`
  -webkit-filter: var(--mui-imageContrast-primary); /* Safari 6.0 - 9.0 */
  filter: var(--mui-imageContrast-primary);
`;

function MyClients() {
  return (
    <MyClientContainer>
      <ClientImageWrapper>
        {/* <div className='clients-carousel'> */}
        <ClientImage src={KPMG} alt={'Client KPMG'} style={{ maxHeight: '90px' }} />
        <ClientImage src={WWNZ} alt={'Client WWNZ}'} style={{ maxHeight: '70px' }} />
        <ClientImage src={NZSF} alt={'Client NZSF'} style={{ maxHeight: '120px' }} />
        <ClientImage src={TFF} alt={'Client TFF'} style={{ maxHeight: '70px' }} />
        <ClientImage src={briscoes} alt={'Client Briscoes'} style={{ maxHeight: '70px' }} />

        {/* </div> */}
      </ClientImageWrapper>
    </MyClientContainer>
  );
}

export default MyClients;

// wwnz x
// briscoes
// tff x
// nzsf x
// KPMG x
