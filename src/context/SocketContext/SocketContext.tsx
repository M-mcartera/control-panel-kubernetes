import React, { createContext, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

interface SocketContextProps {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextProps>({ socket: null })

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io('http://localhost:3000') // Replace with your server URL

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      console.log('Connected to socket.io server!')
      localStorage.setItem('socketId', socket.id)
    })
    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContext
