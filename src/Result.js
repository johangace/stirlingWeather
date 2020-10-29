import React from 'react'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import device from './responsive/Device'
import ForecastHour from './ForecastHour'
import ResultFadeIn from './ResultFadeIn'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Listeners from './model'

const Results = styled.div`
  /* display: flex; */
  /* flex-wrap: wrap; */
  justify-content: space-between;
  padding: 20px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
  overflow: hidden;
  z-index: 1000000;
`

const LocationWrapper = styled.div`
  overflow: hidden;
  z-index: 10000;
  /* margin: 20px; */
`

const CurrentWeatherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10000;
`

const WeatherIcon = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-size: 100px;
  color: #ffffff;
  z-index: 10000;
  @media ${device.tablet} {
    font-size: 100px;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`

const TemperatureWrapper = styled.div``

const WeatherDetailsWrapper = styled.div`
  display: block;
  z-index: 10000000;
  overflow: hidden;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  width: min-content;
`

const WeatherDetail = styled.div`
  z-index: 10000;
  padding: 10px;
  overflow: hidden;
  display: flex;
`

const DetailKey = styled.div`
  font-weight: bold;
  width: 100px;
`

const Forecast = styled.div`
  position: relative;
  z-index: 10000;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`

const Result = ({ weather }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
    icon,
  } = weather

  Listeners.AddListener('ChatUser', (val) => {
    this.setState({ colorContext: val })
  })

  const forecasts = forecast.map((item) => (
    <ForecastHour
      key={item.dt}
      temp={Math.floor(item.main.temp * 1) / 1}
      icon={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
      month={item.dt_txt.slice(5, 7)}
      day={item.dt_txt.slice(8, 10)}
      hour={item.dt_txt.slice(11, 13) * 1}
    />
  ))

  return (
    <Grid xl={8} lg={8} md={10} sm={12} style={{ margin: 'auto' }}>
      <Results>
        <LocationWrapper>
          <Typography>{date} </Typography>
          <Typography variant="h2">
            {city}, {country}
          </Typography>
        </LocationWrapper>
        <Grid
          xl={5}
          lg={6}
          sm={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100',
            margin: 'auto',
          }}
        >
          <Grid xl={6} lg={6} sm={12}>
            <CurrentWeatherWrapper>
              <TemperatureWrapper>
                <Typography variant={'h2'}>{Math.floor(temp)}&#176;</Typography>
              </TemperatureWrapper>
              <WeatherIcon>
                <img style={{ height: 100 }} src={icon} />
              </WeatherIcon>{' '}
            </CurrentWeatherWrapper>
            <Grid>
              <Typography variant="h6" style={{ textAlignLast: 'center' }}>
                {description}
              </Typography>
            </Grid>
          </Grid>

          <Grid xl={6} lg={6} sm={3}>
            <WeatherDetailsWrapper>
              <WeatherDetail>
                <DetailKey>Height:</DetailKey>
                <Typography>{Math.floor(highestTemp)}&#176;</Typography>
              </WeatherDetail>
              <WeatherDetail>
                <DetailKey> Wind: </DetailKey>
                <Typography>{wind}mph</Typography>
              </WeatherDetail>
              <WeatherDetail>
                <DetailKey>Sunrise: </DetailKey>
                <Typography> {sunrise}</Typography>
              </WeatherDetail>
              <WeatherDetail>
                <DetailKey>Low:</DetailKey>
                <Typography>{Math.floor(lowestTemp)}&#176;</Typography>
              </WeatherDetail>
              <WeatherDetail>
                <DetailKey>Rain</DetailKey>
                <Typography>{humidity}%</Typography>
              </WeatherDetail>
              <WeatherDetail>
                <DetailKey width={100}>Sunset: </DetailKey>
                <Typography>{sunset}</Typography>
              </WeatherDetail>
            </WeatherDetailsWrapper>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h4">Forecast:</Typography>
          <Forecast>{forecasts}</Forecast>
        </Grid>
      </Results>
    </Grid>
  )
}

Result.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string,
    country: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    main: PropTypes.string,
    temp: PropTypes.number,
    sunrise: PropTypes.string,
    sunset: PropTypes.string,
    humidity: PropTypes.number,
    wind: PropTypes.number,
    highestTemp: PropTypes.number,
    lowestTemp: PropTypes.number,
    forecast: PropTypes.array,
  }).isRequired,
}

export default Result
