import { useState } from 'react'
import styled from 'styled-components'

const SliderComponent = styled.input`
  z-index: 10;
  width: 100%;
  position: relative;
  height: 1.5rem;
  padding: 0;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-webkit-slider-thumb {
    z-index: 10;
    /* removing default appearance */
    -webkit-appearance: none;
    appearance: none;
    /* creating a custom design */
    height: 18px;
    width: 18px;
    background-color: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #e4e4e4;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    /*  slider progress trick  */
  }

  &::-webkit-slider-runnable-track {
    height: 15px;
    /* background: #e5e5e5; */
    border-radius: 10px;
  }
`
const SliderRunnerTrack = styled.div`
  z-index: 1;
  height: 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
  position: relative;
  top: -21px;
`
const SliderRunnerProgress = styled.div<{ $percentage?: number }>`
  z-index: 2;
  height: 10px;
  width: ${(props) =>
    `${props.$percentage ? props.$percentage - 1 * (props.$percentage / 100) : props.$percentage}%`};
  background-color: #1e49e2;
  border-radius: 10px 0 0 10px;
  position: relative;
  top: -31px;
`

const SliderLableDividerDiv = styled.div`
  width: calc(100% - 10px);
  display: flex;
  position: relative;
  height: 10px;
  top: -21px;
  justify-content: space-between;
  /* background-color: #32202088; */
`
const SliderLableDivider = styled.div<{ $percentage: number }>`
  display: inline-block;
  position: relative;
  height: 10px;
  margin: 0;
  padding: 0;
  /* background-color: #ac8e8e42; */
  text-align: right;
  color: #b2b2b2;
  font-weight: 700;
`

const Slider = () => {
  const min = 1
  const max = 5
  const step = 1
  const [value, setValue] = useState(1)
  const lables = Array(Math.ceil((max - min + 1) / step))
    .fill(0)
    .map((_, i) => {
      return {
        number: i * step + min,
        divider: '|',
      }
    })
  return (
    <>
      <SliderComponent
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className='custom-slider'
        id='myRange'
      />
      <SliderRunnerTrack />
      <SliderRunnerProgress $percentage={((value - min) / (max - min)) * 100} />
      <SliderLableDividerDiv
        className='mx-auto'
        style={{ height: '15px', maxHeight: '15px', overflow: 'hidden' }}
      >
        {lables.map((label, index) => {
          return (
            <SliderLableDivider key={index} $percentage={(index / (lables.length - 1)) * 100}>
              {label.divider}
              {/* <VerticalLine /> */}
            </SliderLableDivider>
          )
        })}
      </SliderLableDividerDiv>
      <SliderLableDividerDiv className='mx-auto pt-2'>
        {lables.map((label, index) => {
          return (
            <SliderLableDivider key={index} $percentage={(index / (lables.length - 1)) * 100}>
              {label.number}
            </SliderLableDivider>
          )
        })}
      </SliderLableDividerDiv>
    </>
  )
}

export default Slider
