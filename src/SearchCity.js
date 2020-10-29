import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'
import device from './responsive/Device'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const SearchBar = styled.form`
  top: ${({ showResult }) => (showResult ? '0%' : '30%')};
  position: relative;
  margin: auto;
  max-width: 300px;
  transition: 0.8s 0.5s;
  @media ${device.laptopL} {
    max-width: 600px;
  }
  @media ${device.desktop} {
    max-width: 700px;
  }
`

const SearchInput = styled.input`
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`

const IconBtn = styled.span`
  display: block;
  position: absolute;
  top: 15%;
  left: 4px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  @media ${device.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${device.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`

const SearchCity = ({ submit, value, change, showResult }) => {
  return (
    <>
      <SearchBar showResult={showResult} onSubmit={submit}>
        <SearchInput
          type="text"
          value={value}
          placeholder="Enter a Location"
          onChange={change}
        />
        <IconBtn>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </IconBtn>
      </SearchBar>
    </>
  )
}

SearchCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
}

export default SearchCity
