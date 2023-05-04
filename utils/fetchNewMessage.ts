import {Message}from "../typings"

const fetcherMessage = async ()=>{
    const host = window.location.host;
    const res = await fetch(`https://${host}/api/getNewMessage`);
    const data = await res.json()
    const messages: Message = data.messages;
        console.log(res)
    console.log("fetcherMessagesss")
    return messages

}

export default fetcherMessage;
