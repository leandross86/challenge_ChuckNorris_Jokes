import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'


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
    minWidth: 296,
    marginRight: 16,
    fontSize: 14,
    fontWeight: 400,
  },
  inputLabeForm: {
    fontSize: 14,
    marginLeft: theme.spacing(2),
    
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
  const [query, setQuery] = useState('')
  const [load, setLoad] = useState(false)

  const handleChange = (event) => {
    setJokeValue(event.target.value)
  }

  const handleSearch = (event) => {
    setListCategories(event.target.value)
  }


  useEffect(() =>{
    setLoad(true)
    api.get(`jokes/search?query=${jokeCategory}`).then(
      res => {
        setJokes(res.data.result)
        setLoad(false)
        setJokeValue('')
        console.log(res.data)
      },
    )
  }, [jokeCategory])

  useEffect(() => {
    api.get(`jokes/categories`).then(
      response => {
        setListCategories(response.data)
        // console.log(response.data)
      }
    )
  }, [listCategories])

  useEffect(() => {
    api.get(`jokes/search?query=${query}`).then(
      response => {
        setQuery(response.data)
        // console.log(response.data)
      }
    )
  }, [query])

  
  return (
    <div className='container'>
      <div className='title'>
        <img src={logo}alt="Logo ParMais"/>
        <h1>ParMais - Challenge ChuckNorris Joker</h1>
      </div>
      <div className='content'>
        <div className='search-content'>
          <Input 
            type="text"
            value={jokeValue}
            onChange={handleChange}
            placeholder="Search"
            className={classes.inputEmpty}
          />
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabeForm} id="demo-mutiple-name-label">Categories</InputLabel>
            <Select
              value={jokeCategory}
              onChange={handleSearch}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'Mulish': 'Without label' }}
            >
              <MenuItem value="Any"> Any </MenuItem>
              { listCategories
               ? listCategories.map(listCategory => (
                 <MenuItem value={listCategories}>{listCategory}</MenuItem>
              )) 
                : null
              }
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
              {joke.value}
            </div>
          </div>
        )): <LoadContent />}




    </div>
  )
}

export default Home