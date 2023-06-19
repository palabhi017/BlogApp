import React, { useEffect } from 'react'
import {Box, HStack, VStack} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getblogs } from '../Redux/action'
import BlogCard from './BlogCard'
import axios from 'axios'
const Blogs = () => {
const blogs = useSelector((state)=> state.reducer.blogs)
    const navigate = useNavigate()
const dispatch = useDispatch()
let edit = async(_id,con)=>{

    try {
      await axios.patch(`https://good-plum-caiman-kit.cyclic.app/blogs/update/${_id}`,{content:con})
      dispatch(getblogs())
    } catch (error) {
      console.log(error)
    }
  }
  let del = async(_id)=>{

    try {
      await axios.delete(`https://good-plum-caiman-kit.cyclic.app/blogs/delete/${_id}`)
      dispatch(getblogs())
    } catch (error) {
      console.log(error)
    }
  }
  
useEffect(()=>{
    dispatch(getblogs())
    
},[])
  return (
   <>
    <HStack w="100%" h="80px" justifyItems={"right"}>
        <Box bgColor="blue.400" w="20%" h="50px" color="white" fontWeight={"bold"} p="10px 30px" onClick={()=> navigate("/newblog")} cursor={"pointer"}>Create Blog</Box>
        <Box bgColor="red.300" w="20%" h="50px" color="white" fontWeight={"bold"} p="10px 30px" cursor={"pointer"}>Reset Password</Box>
    </HStack>
    <VStack w="30%" m="auto" gap="30px">

    {blogs.length>0 && blogs.map((e)=> <BlogCard key={e._id} data={e} handleEdit={edit} handleDel={del}/>)}
    </VStack>
   </>
  )
}

export default Blogs