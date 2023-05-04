import {Message}from "../typings"

const fetcherMessage = async ()=>{
    const host = window.location.host;
    const res = await fetch(`/api/getNewMessage`,{
        method: 'POST',
    });
    const data = await res.json()
    const messages: Message[] = data.messages;

    console.log(res)
    return messages

}



export default fetcherMessage;