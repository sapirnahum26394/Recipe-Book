import React from 'react'
import Home from './Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cuisine from './Cuisine'
import { AnimatePresence } from 'framer-motion'
import NewRecipe from './NewRecipe'
import Recipe from './Recipe'
import SearchResult from './SearchResult'

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>} />
            <Route path='/cuisine/:name' element={<Cuisine/>}/>
            <Route path='/recipe/:name' element={<Recipe/>}/>
            <Route path='/search/:key' element={<SearchResult/>}/>
            <Route path='/newrecipe' element={<NewRecipe/>}/>
        </Routes>
    </AnimatePresence>

  )
}

export default Pages