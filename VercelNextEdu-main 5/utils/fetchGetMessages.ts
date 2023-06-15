import { Message } from "@/types/typing";


const fetcherGetMessages = async ()=>{
  const protocol = window.location.protocol;

  const res = await fetch(`${protocol}/api/getNewMessage`,
{
    method: 'GET'
  });
  
  
    const data = await res.json()
    const messages: Message[] = data.messages;


    return messages

}

export default fetcherGetMessages;