import axios from "axios";


export default async (data) =>{
    const result = await axios.get(`/api.php?c=index&f=safecode&data=${data}`)
    if(result.data.status){
        return result.data.info;
    }
}