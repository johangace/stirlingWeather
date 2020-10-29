import React from 'react'
import styled from 'styled-components'
import ResultFadeIn from './ResultFadeIn'
import { BiSad } from 'react-icons/bi'
const NotFoundWrapper = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto 0;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  position: relative;
  border-radius: 10px;
  top: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`

const NotFoundText = styled.span`
  color: #ffffff;
  font-size: 17px;
`

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotFoundText>
        😞 Sorry, we couldn't find your city. Are you sure it is located on this
        planet? 👀
      </NotFoundText>
    </NotFoundWrapper>
  )
}

export default NotFound
