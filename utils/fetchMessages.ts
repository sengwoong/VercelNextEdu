import {Message}from "../typings"

const fetcherMessages = async ()=>{

const res = await fetch(`/api/getNewMessage`,
{
    method: 'GET'
  });
  
  
    const data = await res.json()
    const messages: Message[] = data.messages;

    console.log(res)
    return messages

}

export default fetcherMessages;