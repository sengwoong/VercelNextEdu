import {Message}from "../typings"

const fetcherMessages = async ()=>{
  const protocol = window.location.protocol;
  const host = window.location.host.split('/')[0];
  const res = await fetch(`${protocol}://${host}/api/getNewMessage`,
{
    method: 'GET'
  });
  
  
    const data = await res.json()
    const messages: Message[] = data.messages;
    console.log(`${host}은==host`)
    console.log( "window.location.host")
    console.log( window.location.host)

    return messages

}

export default fetcherMessages;