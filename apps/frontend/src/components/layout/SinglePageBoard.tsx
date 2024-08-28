import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap'

const SinglePageBoardBox = styled.div`
  margin: 0;
  overflow-x: auto;
  padding: 0 5px;
`
const SinglePageBoardHeader = styled.div`
  height: 125px;
`

const OuterRow = styled(Row)`
  background-color: white;
  border-radius: 10px 10px 0 0;
  padding: 0;
  margin: 0;
  border: 0;
  height: calc(100% - 125px);
`
const InnerTopRow = styled(Row)`
  max-height: 100px;
  height: 100px;
`
const InnerBottomRow = styled(Row)`
  height: calc(100% - 100px);
`

const InnerCol = styled(Col)`
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`

function SinglePageBoard({
  'data-testid': dataTestId,
  header,
  contentHeader,
  children: contentBody,
}: {
  'data-testid'?: string
  header: React.ReactNode
  contentHeader?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <SinglePageBoardBox
      className='px-md-5 px-sm-2 h-100 text-center'
      data-testid={dataTestId || 'single-page-board'}
    >
      <SinglePageBoardHeader data-testid='single-page-board-header'>{header}</SinglePageBoardHeader>
      <OuterRow xs={1} md={1} lg={1} xl={1}>
        <Col className='h-100'>
          <InnerTopRow className='pt-5'>
            <Col data-testid='single-page-board-content-header'>{contentHeader}</Col>
          </InnerTopRow>
          <InnerBottomRow className='my-auto'>
            <InnerCol
              className='my-auto mx-auto h-100 py-3'
              data-testid='single-page-board-content-body'
            >
              {contentBody}
            </InnerCol>
          </InnerBottomRow>
        </Col>
      </OuterRow>
    </SinglePageBoardBox>
  )
}

export default SinglePageBoard
