import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Category from '../pages/Category/Category'

function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={ <Category />} />
            <Route path='/:categoryId' element={ <Category />} />
        </Routes>
    </div>
  )
}

export default AppRoutes