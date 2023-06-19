import { Box, Button, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FcLikePlaceholder,FcLike } from 'react-icons/fc';
import {FaRegComment} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getblogs } from '../Redux/action';
import {ImCancelCircle} from "react-icons/im"


const BlogCard = ({data,handleEdit,handleDel}) => {
const {uname,id} = useSelector((state)=> state.reducer.user) 
const {_id,userId,name,title,content,category,date,likes,comments} = data;
const { isOpen, onOpen, onClose } = useDisclosure()
    // const [co,setCo] = useState(false)
  const [con,setCon] = useState(content)
  const [com,setCom] = useState("")
  const dispatch = useDispatch()
const [tog,setTog] = useState(false)


let temp=()=>{
  handleEdit(_id,con)
  onClose()
}

let handlelike= async()=>{
  likes.push(id)
  try {
    await axios.patch(`https://good-plum-caiman-kit.cyclic.app/blogs/update/${_id}`,{likes:likes})
    dispatch(getblogs())
  } catch (error) {
    console.log(error)
  }
  
}
let handlecomment= async()=>{
  comments.push({username:uname,comment:com})
  try {
    await axios.patch(`https://good-plum-caiman-kit.cyclic.app/blogs/update/${_id}`,{comments:comments})
    dispatch(getblogs())
  } catch (error) {
    console.log(error)
  }
  
}
    return (
    <>
    
    <Box w="100%" h="auto" border="1px solid teal" p="20px" m="auto">
      {id===userId?  <HStack>
           <Button bgColor={"pink.600"} color="white" h="25px" onClick={onOpen}>Edit</Button>
           <Button bgColor={"orange.300"} color="white" h="25px" onClick={handleDel}>Delete</Button>
       </HStack>: ""}
      
       <HStack h="100px" mt="20px">
        <Box h="100%" w="28%" border="1px solid teal" borderRadius={"50%"}>
            <Image h="100%" w="100%" borderRadius={"50%"} src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.2.1876169172.1674726478&semt=sph'></Image>
        </Box>
        <VStack>
            <Text fontWeight={"600"} fontSize={"20px"}  color="red.400">{name}</Text>
            <Text fontWeight={"600"}>{category}</Text>
            <Text fontWeight={"600"} color="blue.400">{date}</Text>
        </VStack>
       </HStack>
       <Text mt="20px" fontSize={"25px"} fontWeight={"600"}>{title}</Text>
       <Text mt="15px" fontWeight={"bold"}>{content}</Text>
       <HStack justifyContent={"space-between"} mt="15px">
        <HStack>
        {likes && likes.includes(id)?<FcLike size="2em" />:<FcLikePlaceholder onClick={handlelike} size="2em"/> }
        <Text fontWeight={"bold"} color="blue.400">{likes.length}</Text>
        <FaRegComment size="1.5em" onClick={()=> setTog(true)}/>
        <Text fontWeight={"bold"} color="blue.400" fontSize={"18px"}>{comments.length}</Text>
        </HStack>
        <Button bgColor={"brown"} color="white" onClick={()=> setTog(true)}>Add comment</Button>
       </HStack>
       <VStack w="100%"  mt="20px" alignItems={"left"} p="5px" display={tog? "block" : "none"}>
        <HStack justifyContent={"space-between"}>
        <Text fontWeight={"600"}>Comments</Text>
        <ImCancelCircle onClick={()=> setTog(false)}/>
        </HStack >
        <Box w="90%" p="10px">
        <Textarea h="10px" w="100%" placeholder='Add your comment'  onChange={(e)=> setCom(e.target.value)}></Textarea>
        <Button bgColor={"pink.600"} color="white" h="25px" onClick={handlecomment}>Add</Button>

        </Box>
        <hr />
        <VStack alignItems={"left"} overflowY={"auto"} maxH="100px">
        {comments.length>0 && comments.map((e)=>  {
         return <>
          <Text color="teal.300" fontWeight={"600"} fontSize={"1em"}>{e.username}</Text>
          <Text fontWeight={"500"}>{e.comment}</Text>
          <hr />
          </>
         })}
        </VStack>
         
       </VStack>
         
    </Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Textarea value={con} h="250px" onChange={(e)=> setCon(e.target.value)}>

          </Textarea>
          <Button bgColor={"tomato"} color="white" mt="20px" onClick={temp}>Confirm Edit</Button>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  )
}

export default BlogCard