import React from 'react'
import { useDrag } from 'react-dnd'

export default function CourseElement() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'course',
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>
  )
}