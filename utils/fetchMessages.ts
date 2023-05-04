import {Message}from "../typings"

const fetcherMessages = async ()=>{
    const res = await fetch("http://localhost:3000/api/getMessages")
    const data = await res.json()
    const messages: Message[] = data.messages;

    console.log("fetcherMessagesss")
    return messages

}

export default fetcherMessages;