"use client"
import React from 'react'
import { Button } from 'react-bootstrap'
interface ErrorProps{
    error:Error,
    reset:()=>void
}
type Props = {}

const error = ({error,reset}:ErrorProps) => {
  return (
    <div>
        <h1>Error Came 😵‍💫</h1>
        <p>Error hai bhai!</p>
        <Button onClick={reset}>Try again!</Button>
    </div>
  )
}

export default error