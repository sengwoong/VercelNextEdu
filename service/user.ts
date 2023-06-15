import { SearchUser } from '@/model/user';
import { client } from './senity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
  password:string;
  lecture:string
  live:boolean

};


export async function addUser({ id, username, email, name, image ,password,lecture}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    lecture,
    live:false,
    password,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}



export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}

export async function getAllUserEmail(email: string) {
  return client.fetch(
    `*[
      (_type == "user" && email == "${email}" ) 
    ]
    {

      ...
    }
    
      `
  );
}

import bcrypt from 'bcrypt';

export async function getUserEmail(Email: string, password: string) {
  console.log("server User getUserEmail")
  const user = await getUser(Email); // 이메일에 해당하는 사용자 정보 가져오기
  console.log("server User getUser")
  console.log(user[0].password)
  if (!user) {
    return null; // 사용자가 없는 경우 null 반환
  }

  const isMatch = await checkPassword(password, user[0].password); // 비밀번호 일치 여부 확인
console.log(isMatch)
  if (isMatch) {
    console.log("getUserInfo")
    console.log("==============")
 let   a = await getUserInfo(Email,user[0].password)
console.log(a)
    return getUserInfo(Email,user[0].password); // 비밀번호가 일치하는 경우 사용자 정보 반환
  }

  return null; // 비밀번호가 일치하지 않는 경우 null 반환
}

async function checkPassword(inputPassword: string, hashedPassword: string) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
}

export async function getUser(Email: string) {
  return client.fetch(
    `*[
      (_type == "user" && email == "${Email}") 
    ]
    {
      password,
      
    }`
  );
}




export async function getUserEmailOAuth(Email: string) {
  return client.fetch(
    `*[
      (_type == "user" && email == "${Email}" ) 
    ]
    {

      ...
    }
    
      `
  );
}



export async function getUserInfo(Email: string,Password:string) {
  return client.fetch(
    `
   
    *[
      (_type == "user" && email == "${Email}" && password == "${Password}")
    ] {
    ...
    }

    
      `
  );
}












//    Username/Name/Email/Image 을 받아와야함
export async function getUserByUsernameLoing(email: string) {
  return client.fetch(
    `*[_type == "user" && user == "${email}"] {
      username,
      name,
      image,
      email

   
    }`
  );
}



      

export async function searchUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
    : '';
  return client
    .fetch(
      `*[_type =="user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
    )

   
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}





export async function getUserForProfile(username: string) {
  // console.log(username+"머임")
  return client
    .fetch(
      ` 
      *[_type == "user" && username == "${username}"][0]{
             ...,
             "id":_id,
             "following": count(following),
             "followers": count(followers),
             "posts": count(*[_type=="post" && author->username == "${username}"]),
             
           }
      
      
    `

    )
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      return {
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        posts: user.posts ?? 0,
      };
    });
}














export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}



export async function follow(myId: string, targetId: string) {
  console.log("myId,targetId")
  console.log("myId,targetId")
  console.log(myId,targetId)
  return client
    .transaction() //
    .patch(myId, (user) =>

      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}



export async function setLiveStatus(userId:string,isLive: boolean) {
  return client
    .patch(userId)
    .set({ live: isLive })
    .commit();
}



