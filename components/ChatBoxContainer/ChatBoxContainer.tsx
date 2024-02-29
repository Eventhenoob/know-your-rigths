"use client";
import React, { useState } from 'react'
import ChatBox from '../ChatBox'
import ChatButton from '../ChatButton'

const ChatBoxContainer = () => {
    const [isVisible, setIsVisible] = useState(false)
    
  return (
    <>
        <ChatBox isVisible={isVisible} />
        <ChatButton isVisible={isVisible} toggleChatbox={() => setIsVisible((prev) => !prev)} />
    </>
  )
}

export default ChatBoxContainer