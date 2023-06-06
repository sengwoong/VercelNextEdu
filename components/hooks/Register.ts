export default async function RegistUser(id: string,password:string, name: string,email:string,username:string,lecture:string) {
  await fetch('/api/regUser', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id,name,email,username,password ,lecture}),
  })
}


// const uploadMessageToUpstash = async () => {
//   await fetch("/api/addMessage", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message }),
//   });
// };