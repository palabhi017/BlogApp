import React, { useState } from 'react'
import {Box, Button, Heading, Input, Text,useToast} from "@chakra-ui/react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
const toast = useToast()
const navigate = useNavigate()
let handlesignup= async()=>{
 
     try {
        await axios.post(`http://localhost:8080/user/signup`,{name,email,password})       

        toast({
            position: 'top',
            title: 'Signup successful',
            description: "Your account created successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate("/login")
     } catch (error) {
        console.log(error)
     }
}


  return (
   <>
   <Heading color="pink.400" textAlign={"center"}>Sign Up</Heading>
    <Box w="30%" h="300px" m="auto" gap="10px" border="1px solid teal" borderRadius={"10px"} mt="100px" p="30px"> 
       <Text fontSize={"20px"} fontWeight={"bold"}>Name</Text>
       <Input placeholder='Enter Name' w="90%" onChange={(e)=>setName(e.target.value) }></Input>
       <Text fontSize={"20px"} fontWeight={"bold"}>Email</Text>
       <Input placeholder='Enter email' w="90%" onChange={(e)=>setEmail(e.target.value) }></Input>
       <Text fontSize={"20px"} fontWeight={"bold"}>Password</Text>
       <Input placeholder='Enter Password' w="90%" onChange={(e)=>setPassword(e.target.value) }></Input>
       <Button onClick={handlesignup}>Sign Up</Button>
    </Box>
   </>
  )
}

export default Signup