type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

type Point = { x: number; y: number }


export type Message= {
  id: string;
  message: string;
  created_at: number;
  userName: string;
  profilePic: string;
  email: string;
  nickName: string;
};
