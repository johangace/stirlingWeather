import React from 'react'
import styled from 'styled-components'
import SearchCity from './SearchCity'
import device from './responsive/Device'
import Result from './Result'
import NotFound from './NotFound'
import { OrderContext } from './Result'
import { colors } from '@material-ui/core'
import Listeners from './model'
import cloudy from './assets/cloudy.jpg'
import clear from './assets/clearsky.jpg'
import snowy from './assets/snowy.jpg'
import thunder from './assets/thunder.jpg'
import rainy from './assets/rainz.jpg'
import scattered from './assets/scattered.jpg'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
const BackgroundImg = styled.img`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  opacity: 0.3;
  margin: -20px 0;
`
const AppTitle = styled.h1`
  display: block;
  padding: 20px;
  font-size: 20px;
  color: #ffffff;
  transition: 0.3s 1.4s;
`

const WeatherWrapper = styled.div`
  /* max-width: 85%; */
  margin: auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`

class App extends React.Component {
  state = {
    value: '',
    weatherInfo: null,
    error: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleSearchCity = (e) => {
    e.preventDefault()
    const { value } = this.state
    //leaving it out for Stirling team reference
    const APIkey = 'f2fd8c9ea077f6186c348b1f2a13640e'

    const weather = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`

    Promise.all([fetch(weather), fetch(forecast)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()])
        }
        throw Error(res1.statusText, res2.statusText)
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ]
        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ]
        const currentDate = new Date()
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`
        const sunset = new Date(data1.sys.sunset * 1000)
          .toLocaleTimeString()
          .slice(0, 5)
        const sunrise = new Date(data1.sys.sunrise * 1000)
          .toLocaleTimeString()
          .slice(0, 5)

        const weatherInfo = {
          city: data1.name || 'miami',
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
          icon: `https://openweathermap.org/img/w/${data1.weather[0].icon}.png`,
        }
        Listeners.UpdateProperty('colorContext', weatherInfo.main)
        this.setState({
          weatherInfo,
          error: false,
        })
      })
      .catch((error) => {
        console.log(error)

        this.setState({
          error: true,
          weatherInfo: null,
        })
      })
  }

  render() {
    const background = Listeners.GetProperty('colorContext')
    function getBackground() {
      let weatherBackground = ''

      if (background === 'Thunderstorm') {
        weatherBackground = thunder
      } else if (background === 'Drizzle') {
        weatherBackground = rainy
      } else if (background === 'Rain') {
        weatherBackground = rainy
      } else if (background === 'Snow') {
        weatherBackground = snowy
      } else if (background === 'Clear') {
        weatherBackground = clear
      } else if (background === 'Clouds') {
        weatherBackground = cloudy
      } else if (background == null) {
        weatherBackground = cloudy
      } else {
        weatherBackground = clear
      }

      return weatherBackground
    }

    const { value, weatherInfo, error } = this.state
    return (
      <Grid>
        {' '}
        <BackgroundImg src={getBackground() || ''} />
        <AppTitle secondary showResult={(weatherInfo || error) && true}>
          <Typography variant="h4"> Stirling Weather</Typography>
        </AppTitle>
        <WeatherWrapper>
          <SearchCity
            value={value}
            showResult={(weatherInfo || error) && true}
            change={this.handleInputChange}
            submit={this.handleSearchCity}
          />
          {weatherInfo && <Result weather={weatherInfo} />}
          {error && <NotFound error={error} />}
        </WeatherWrapper>
      </Grid>
    )
  }
}

export default App
