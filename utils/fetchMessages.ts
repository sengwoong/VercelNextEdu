import {Message}from "../typings"

const fetcherMessages = async ()=>{
    const host = window.location.host;
const res = await fetch(`http://${host}/api/getNewMessage`);
    const data = await res.json()
    const messages: Message[] = data.messages;

    console.log("fetcherMessagesss")
    return messages

}

export default fetcherMessages;