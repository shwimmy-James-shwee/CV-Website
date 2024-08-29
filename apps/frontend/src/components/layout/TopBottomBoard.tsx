import React from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

interface TopBottomBoardProps {
  topContent?: React.ReactNode
  bottomContent?: React.ReactNode
  maxTopHeightPercentage?: number
}
const TopRow = styled(Row)<{ $maxHeight?: number }>`
  width: 100%;
  /* max-width: 750px; */
  max-height: ${(props) => props.$maxHeight ?? 40}%;
  padding: 2rem 1rem;
  flex-shrink: 0;
  overflow-y: auto;
`
const TopCol = styled(Col)`
  max-width: 1400px;
`

const BottomRow = styled(Row)`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  /* max-width: 750px; */
`

const BottomCol = styled(Col)`
  max-width: 750px;
`

function TopBottomBoard({
  topContent,
  bottomContent,
  maxTopHeightPercentage,
}: TopBottomBoardProps) {
  return (
    <>
      <TopRow data-testid='top-bottom-board-top-row' $maxHeight={maxTopHeightPercentage}>
        <TopCol className='mx-auto' data-testid='top-bottom-board-top-col'>
          {topContent}
        </TopCol>
      </TopRow>

      <BottomRow className='mt-3' data-testid='top-bottom-board-bottom-row'>
        <BottomCol className='mx-auto py-5' data-testid='top-bottom-board-bottom-col'>
          {bottomContent}
        </BottomCol>
      </BottomRow>
    </>
  )
}

export default TopBottomBoard
