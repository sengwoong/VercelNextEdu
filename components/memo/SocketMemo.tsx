'use client'

import { FC, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useDraw } from '../hooks/useDraw'
import { drawLine } from '@/utils/drawLine'
import { ChromePicker } from 'react-color'

const socket = io('http://localhost:3001')

interface pageProps {}

type DrawLineProps = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}
type Props={
  PdfWidth:number;
  Page:number
}

const SocketMemo: FC<pageProps&Props> = ({PdfWidth ,Page}:Props) => {
  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    socket.emit('client-ready')

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state')
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      drawLine({ prevPoint, currentPoint, ctx, color })
    })

    socket.on('clear', clear)

    return () => {
      socket.off('draw-line')
      socket.off('get-canvas-state')
      socket.off('canvas-state-from-server')
      socket.off('clear')
    }
  }, [canvasRef])

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', { prevPoint, currentPoint, color })
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  return (
    <div className='absolute left-0  top-16  z-10  bg-transparent flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={PdfWidth*Page  }
        height={PdfWidth*1.5}
  
        className='border border-black rounded-md '
      />
        {/* <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        
        <button
          type='button'
          className='p-2 rounded-md border border-black'
          onClick={() => socket.emit('clear')}>
          Clear canvas
        </button> */}
      </div>
   
    </div>
  )
}

export default SocketMemo
