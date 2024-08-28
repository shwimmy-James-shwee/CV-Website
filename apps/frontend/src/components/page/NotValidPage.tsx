import { TitleText } from '../text/TitleText'
import { BodyText } from '../text/BodyText'
import logo from '../../assets/images/logo.svg'
import styled from 'styled-components'

interface NotValidLinkPageProps {
  title?: string
  body?: string
  customLogo?: string
  children?: React.ReactNode
}

const OuterContainer = styled.div`
  text-align: center;
  margin-top: 20vh;
`

const InnerContainer = styled.div`
  background-color: var(--general-text-bg-color);
  max-width: 456px;
  padding: 84px 56px;
  border-radius: 20px;
  margin-top: 10vh;
`

function NotValidPage({ title, body, customLogo, children }: NotValidLinkPageProps) {
  return (
    <div className='not-valid-page text-center mt-5' data-testid='not-valid-page'>
      <OuterContainer className='w-100 px-2'>
        <img src={customLogo ?? logo} width={'120px'} />
        <InnerContainer className='mx-auto centre-text'>
          <svg width='41' height='41' viewBox='0 0 41 41' fill='none'>
            <path
              d='M18.8303 25.5002H22.1637V28.8335H18.8303V25.5002ZM18.8303 12.1668H22.1637V22.1668H18.8303V12.1668ZM20.4803 3.8335C11.2803 3.8335 3.83032 11.3002 3.83032 20.5002C3.83032 29.7002 11.2803 37.1668 20.4803 37.1668C29.697 37.1668 37.1637 29.7002 37.1637 20.5002C37.1637 11.3002 29.697 3.8335 20.4803 3.8335ZM20.497 33.8335C13.1303 33.8335 7.16366 27.8668 7.16366 20.5002C7.16366 13.1335 13.1303 7.16683 20.497 7.16683C27.8637 7.16683 33.8303 13.1335 33.8303 20.5002C33.8303 27.8668 27.8637 33.8335 20.497 33.8335Z'
              fill='#0C233C'
            />
          </svg>
          <TitleText data-testid='not-valid-title'>{title ?? 'Sorry, link not valid'}</TitleText>
          <BodyText className='mt-4 pb-2' data-testid='not-valid-body-text'>
            {body ??
              'The link you provide is not valid. Please reach out to your relevant contact for support if you believe this is an error.'}
          </BodyText>
          {children}
        </InnerContainer>
      </OuterContainer>
    </div>
  )
}
export default NotValidPage
