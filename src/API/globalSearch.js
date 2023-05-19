import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"

export async function loadOptions(searchInput) {
  try{
    const response = await axios.get(`${cred.BACKEND_URL}/globalsearch?searchInput=${searchInput}`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    const data = await response.data.searched
    // console.log(data)
    return data.map((elem) => ({ ...elem, label: elem.name, value: elem._id, image: elem.profilePhoto, position: elem.position }))
  }catch(err){
    console.log(err)
  }
}