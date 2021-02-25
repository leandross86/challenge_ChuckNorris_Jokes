import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Input, MenuItem, FormControl, Select, Box } from '@material-ui/core'


import api from '../service/api'
import logo from '../img/parMais.png'

import LoadContent from '../components/loadContent'
import Button from '../components/Button'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 296,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row',
  },
  inputEmpty: {
    marginTop: theme.spacing(3.3),
    marginLeft: theme.spacing(2),
    minWidth: 296,
    marginRight: 16,
    fontSize: 14,
    fontWeight: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    minWidth: 296,
    justifyContent: 'space-around',
    borderRadius: 10,
    boxShadow: 3,
    marginLeft: theme.spacing(1),
    fontFamily: 'Mulish'
  },
}))

function Home({ onClick }) {
  const classes = useStyles()

  const [jokes, setJokes] = useState([{}])
  const [jokeValue, setJokeValue] = useState('')
  const [jokeCategory, setJokeCategory] = useState('')
  const [listCategories, setListCategories] = useState('')
  const [load, setLoad] = useState(false)

  const handleChange = (event) => {
    setListCategories(event.target.value)
  }

  const handleSearch = (event) => {
    setJokeValue(event.target.value)
  }


  useEffect(() =>{
    setLoad(true)
    api.get(`jokes/search?query=${jokeCategory}`).then(
      res => {
        setJokes(res.data.result)
        setLoad(false)
        console.log(res.data)
      },
    )
  }, [jokeCategory])

  useEffect(() => {
    api.get(`jokes/categories`).then(
      response => {
        setListCategories(response.data)
      }
    )
  }, [listCategories])

  return (
    <div className='container'>
      <div className='title'>
        <img src={logo}alt="Logo ParMais"/>
        <h1>ParMais - Desafio ChuckNorris</h1>
      </div>
      <div className='content'>
        <div className='search-content'>
          <Input 
            type="text"
            value={jokeValue}
            onChange={handleSearch}
            placeholder="Search"
            className={classes.inputEmpty}
          />
          <FormControl className={classes.formControl}>
            <Select
              value={jokeCategory}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'Mulish': 'Without label' }}
            >
              <MenuItem value="" disabled>
                Any
              </MenuItem>
              <MenuItem value={listCategories}>{listCategories[0]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[1]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[2]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[3]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[4]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[5]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[6]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[7]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[8]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[9]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[10]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[11]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[12]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[13]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[14]}</MenuItem>
              <MenuItem value={listCategories}>{listCategories[15]}</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
          <Button
            onClick={ e => setJokeCategory(jokeValue)}
          >
            Pesquisar
          </Button>
        {!load ? jokes.map((joke, index) => (
          <div className='box-container'>
            <div
              key={index}
            >
              {/* <img src={joke.icon_url} alt={joke.value}/> */}
              {joke.value}
            </div>
          </div>
        )): <LoadContent />}




    </div>
  )
}

export default Home