import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import device from './responsive/Device'

const ForecastContainer = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  display: 'block';
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 140px;
  }
`
const Weather = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: center;
`
const ForecastHour = (props) => {
  const { temp, month, day, hour, icon } = props

  return (
    <ForecastContainer>
      {' '}
      <Weather>
        <Typography color="#fffff" variant="h4">
          {temp}&#176;
        </Typography>{' '}
        <img src={icon} />
      </Weather>
      <Typography align="center" variant="h6">
        {month}.{day}
      </Typography>
      <Typography align="center">{hour}:00</Typography>
    </ForecastContainer>
  )
}

ForecastHour.propTypes = {
  temp: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
}

export default ForecastHour
