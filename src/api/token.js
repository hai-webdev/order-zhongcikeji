import axios from "axios";


export default async ({id}) =>{
    const result = await axios.get(`/api.php?f=token&id=${id}`)
    if(result.data.status){
        return result.data.info;
    }
}