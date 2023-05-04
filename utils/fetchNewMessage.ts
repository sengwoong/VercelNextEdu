import {Message} from "../typings";

const fetcherMessage = async () => {
  const protocol = window.location.protocol;

  const res = await fetch(`${protocol}/api/addMessage`,{
    method: 'POST',
  });

  console.log(res);
  console.log("data");
  const data = await res.json();

  console.log(data);
  console.log("data");
  const messages: Message = data.messages;

  console.log("fetcherMessages");
  return messages;
};

export default fetcherMessage;
