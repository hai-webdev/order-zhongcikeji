import axios from "axios";
import token from "./token";

export default async ({id}) =>{
    const tokenData = await token({id});

    const result = await axios.get(`/api.php?f=phpok&token=${tokenData}`)
    if(result.data.status){
        return result.data.content;
    }
}