import React, { useState } from 'react'
import {Box, Button, Heading, Input, Text,useToast,HStack,Image, Stack} from "@chakra-ui/react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { user } from '../Redux/action'
import LoginImg from "../Images/loginimg.jpg"

const Signin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let handlelogin= async()=>{
    try {
       let res = await axios.post(`http://localhost:8080/user/login`,{email,password})       
      let data = res.data
      dispatch(user({id:data.id,uname:data.name}))
      if(data.msg==="login successful"){
        toast({
            position: 'top',
            title: 'login successful',
            description: "Your are loged in successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          navigate("/blogs")
      }else{
        toast({
            position: 'top',
            title: 'login unsuccessful',
            description: "wrong Details",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
      }

    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
   
     <Box w="100%" h={{base:"100vh",md:"200vh",lg:"100vh"}} bgColor={"#8BC6EC"} p={{base:"10px",md:"10px",lg:"40px"}} backgroundImage={"linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"}>
         <Box w="98%" h={{base:"95vh",md:"180vh",lg:"90vh"}} m="auto" bgColor={"white"} borderRadius={"10px"}  boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px">
              <Stack w="100%" h="100%" direction={{base:"column",md:"column",lg:"row"}} pt="40px" >
                  <Box w={{base:"100%",md:"100%",lg:"50%"}} h={{base:"100%",md:"100%",lg:"80%"}} display={{base:"none",md:"inline",lg:"90vh"}} bgImage={LoginImg} bgSize={"cover"}> 
                   
                  </Box>   
                  <Box w={{base:"100%",md:"100%",lg:"40%"}} h={{base:"100%",md:"100%",lg:"90%"}} m="auto" gap="0px" border="1px solid teal" borderRadius={"10px"} mt="100px" p="30px">
                  <Heading color="#693fee" textAlign={"center"}>Welcome to <Text color="#27dec0" fontSize={"45px"}> Blog<Text as="span" color="#333">Shlog</Text></Text> </Heading>
                  <Text fontSize={"30px"} mt="20px" color="#27dec0" fontWeight={"bold"}>Email</Text>
                  <Input placeholder='Enter email' w="90%" onChange={(e)=>setEmail(e.target.value) }></Input>
                  <Text fontSize={"30px"} mt="20px" color="#333"  fontWeight={"bold"}>Password</Text>
                  <Input placeholder='Enter Password' w="90%" onChange={(e)=>setPassword(e.target.value) }></Input>
                    <Button bgColor={"#27dec0"} w="40%" fontWeight={"bold"} fontSize={"20px"} mt="30px" onClick={handlelogin}>Sign Up</Button>
                   <Text fontSize={"18px"} mt="30px" fontWeight="600">Not a member yet? </Text>
                    </Box>  
              </Stack>
         </Box>
     </Box>
    </>
  )
}

export default Signin