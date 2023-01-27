import axios from "axios";
import safecode from "./safecode";

export default async ({ id, pageid = 1,keywords }) => {
    let safecodeData = "";
    if(keywords){
        safecodeData = await safecode("c,id,pageid,psize,keywords");
    }else {
        safecodeData = await safecode("c,id,pageid,psize");
    }
  const result = await axios.get(
    `/api.php?c=project&_safecode=${safecodeData}&id=${id}&pageid=${pageid}&psize=1000${keywords ? '&keywords=' + keywords : ''}`
  );
  if(result.data.status){
      return result.data.info
  }
};
