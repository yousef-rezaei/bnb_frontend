"use client";
import {  useEffect, useState, useRef } from "react";
import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket,{ReadyState} from "react-use-websocket";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";


interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    conversation
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const myUser = conversation.users?.find((user) => user.id == userId);
    const otherUser = conversation.users?.find((user) => user.id !== userId)
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws://127.0.0.1:8000/ws/chat/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        console.log("WebSocket connection state:", readyState);
    }, [readyState]);

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                create_by: myUser as UserType,
                conversationId: conversation.id,
            }
            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }
        scrollToBottom();
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        console.log('sendMessage1');
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: 'Yousef',//myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id,
            }
        });
        setNewMessage('');
        console.log('sendMessage2');
        setTimeout(() => {
            scrollToBottom();
        }, 50); // Simulate a delay for the message to appear
        console.log('sendMessage3');
    }
    const  scrollToBottom = () => {
        console.log('scrollToBottom');
        if(messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }
    return(
        <>
            <div
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4"
             >
            </div>

            {realtimeMessages.map((message, index) => (

                <div 
                    key={index}
                    className={`w-[80%] py-4 px-6 rounded-xl ${message.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                >
                    <p className="font-bold text-gray-500">{message.name}</p>
                    <p>{message.body}</p>
                </div>
            ))}

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input 
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value = {newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton 
                    label="Send"
                    className="w-[100px]"
                    onClick={sendMessage}
                />
            </div>
        </>
    )
}
export default ConversationDetail;