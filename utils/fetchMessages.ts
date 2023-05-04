import {Message}from "../typings"

const fetcherMessages = async ()=>{
  const protocol = window.location.protocol;
  const host = window.location.host;
  const res = await fetch(`${protocol}://${host}/api/getNewMessage`,
{
    method: 'GET'
  });
  
  
    const data = await res.json()
    const messages: Message[] = data.messages;

    console.log(res)
    return messages

}

export default fetcherMessages;