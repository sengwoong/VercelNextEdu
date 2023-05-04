import {Message}from "../typings"

const fetcherMessage = async ()=>{
    const res = await fetch("http://localhost:3000/api/getNewMessage")
    const data = await res.json()
    const messages: Message = data.messages;

    console.log("fetcherMessagesss")
    return messages

}

export default fetcherMessage;