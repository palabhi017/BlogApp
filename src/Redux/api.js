import axios from "axios"


export const getAllblogs= async()=>{
    try {
        let res = await axios.get(`https://good-plum-caiman-kit.cyclic.app/blogs?title=&category=&sort=date&order=1&page=1&limit=10`)
        console.log(res.data)
        return res.data.blog
    } catch (error) {
        console.log(error)
    }
}