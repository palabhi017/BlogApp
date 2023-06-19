import React from 'react'
import {Routes,Route} from "react-router-dom"
import Signup from './Signup'
import Signin from './Signin'
import Blogs from './Blogs'
import NewBlog from './NewBlog'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/newblog' element={<NewBlog/>}/>
    </Routes>
  )
}

export default AllRoutes