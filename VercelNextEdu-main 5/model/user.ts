export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  _id:string;
  lecture:string;
};




export type LoadPdf={
  url:string;
  PageWidth:number;
  ReduxpageScale:number;
  ReduxpageNumber:number;
  PdfSizeRef:React.RefObject<HTMLDivElement>;
}

export type SimpleUser = Pick<AuthUser, 'username' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
  live:boolean;
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
  live:boolean;
};
