import {Message} from "../typings";

const fetcherMessage = async () => {
  const protocol = window.location.protocol;
  const host = window.location.host.split('/')[0];
  const res = await fetch(`${protocol}://${host}/api/getNewMessage`, {
    method: 'POST',
  });
  const data = await res.json();
  const messages: Message = data.messages;

  console.log("fetcherMessages");
  return messages;
};

export default fetcherMessage;
