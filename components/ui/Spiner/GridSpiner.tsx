import dynamic from 'next/dynamic';
import React from 'react'


//import { GridLoader } from 'react-spinners';
//로딩을 할떄 ssr을 하지않게 하기위한 설정
const GridLoader=dynamic (
  ()=>import('react-spinners').then((mod)=>mod.GridLoader),
  {ssr:false}
)
type Props={
  color?:string;
}

export default function GridSpiner({color='red'}:Props) {
  return (
    <GridLoader color={color}></GridLoader>
  )
}
