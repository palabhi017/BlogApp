import { Box, Button, Heading, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {
const [title,setTitle] = useState("")
const [content,setContent] = useState("")
const [category,setCategory] = useState("")
const {name,id} = useSelector((state)=> state.reducer.user) 
const toast = useToast()
const navigate = useNavigate()



let getcurdate=()=>{
    const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; 
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;
return formattedToday
}
let addblog= async()=>{
let obj={
    userId: id,
    name:name,
    title:title,
    content:content,
    category:category,
    date: getcurdate(),
    likes:[],
    comments: []
}

    try {
        let res = await axios.post(`http://localhost:8080/blogs/add`,obj)
        let data = res.data
        if(data==="blog added successfully"){
            toast({
                position: 'top',
                title: 'blog added successful',
                description: "Your blog created successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              navigate("/blogs")
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
     <Heading textAlign={"center"} color="tomato">Create New Blog</Heading>
      <Box w="40%" h="auto" m="auto" mt="100px" borderRadius={"5px"} p="30px" border={"2px solid blue"}>
        <Text>Title</Text>
        <Input placeholder='Enter title' onChange={(e)=> setTitle(e.target.value)}></Input>
        <Text>Content</Text>
        <Textarea placeholder='Enter Content' onChange={(e)=> setContent(e.target.value)}></Textarea>
        <Text>Category</Text>
        
        <Select onChange={(e)=> setCategory(e.target.value)} placeholder='choose category'>
            <option value="Business">Business</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Entertainment">Entertainment</option>
        </Select>
        <Button bgColor="tomato" color="white" mt="20px" onClick={addblog}>Create</Button>
      </Box>
    </>
  )
}

export default NewBlog