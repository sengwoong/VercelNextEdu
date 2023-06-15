import { Draw } from '@/types/typing'
import { Point } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
  // 상태와 참조 변수를 초기화합니다.
  const [mouseDown, setMouseDown] = useState(false) // 마우스 클릭 상태를 저장하는 상태 변수
  const canvasRef = useRef<HTMLCanvasElement>(null) // 캔버스 엘리먼트에 대한 참조 변수
  const prevPoint = useRef<null | Point>(null) // 이전 좌표를 저장하는 참조 변수

  // 마우스 다운 이벤트 핸들러
  const onMouseDown = () => setMouseDown(true)

  // 캔버스를 지우는 함수
  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    // 마우스 이벤트 핸들러 함수
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return // 마우스 클릭이 아니면 종료

      const currentPoint = computePointInCanvas(e) // 현재 좌표 계산

      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current }) // 그리기 콜백 호출
      prevPoint.current = currentPoint // 이전 좌표 갱신
    }

    // 캔버스 내에서 좌표 계산하는 함수
    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      console.log("x")
      console.log(rect.left)
console.log(e.clientX)
console.log("y")
console.log(rect.top)
console.log(e.clientY)
      return { x, y }
    }

    // 마우스 업 이벤트 핸들러
    const mouseUpHandler = () => {
      setMouseDown(false) // 마우스 클릭 상태 변경
      prevPoint.current = null // 이전 좌표 초기화
    }

    // 이벤트 리스너 추가
    canvasRef.current?.addEventListener('mousemove', handler) // 캔버스 내에서 마우스 움직임 감지
    window.addEventListener('mouseup', mouseUpHandler) // 전역에서 마우스 업 감지

    // 이벤트 리스너 제거
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler)
      window.removeEventListener('mouseup', mouseUpHandler)
    }
  }, [onDraw])

  return { canvasRef, onMouseDown, clear } // 반환값으로 캔버스 참조 변수, 마우스 다운 이벤트 핸들러, 지우기 함수를 제공
}
