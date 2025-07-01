// 'use client';
import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";
import React from "react";
import Conversation from "../components/inbox/Conversation";


export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const InboxPage = async ()  =>{
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p className="text-2xl font-bold">Please log in to view your favorites</p>
            </main>
        );
    }

    const conversations = await apiService.get('/api/chat/');

    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>
            {conversations.map((conversation: ConversationType) => {
                return (
                   <Conversation
                   key={conversation.id}
                   userId={userId}
                   conversation={conversation}
                   />
                );
            })}
            
        </main>
    )
}
export default InboxPage;