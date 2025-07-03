import { getUserId } from "@/app/lib/actions";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import React from "react";
import apiService from "@/app/services/apiService";
import { UserType } from "../page";
import { getAccessToken } from "@/app/lib/actions";

export type MessageType = {
    id: string;
    name : string;
    body: string;
    conversationId: string;
    sent_to : UserType;
    created_by: UserType;
}

const ConversationPage = async({params}: {params : {id:string}}) =>{
     const userId = await getUserId();
    const token = await getAccessToken();

    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p className="text-2xl font-bold">Please log in to view your favorites</p>
            </main>
        );
    }

    const conversation = await apiService.get(`/api/chat/${params.id}/`);
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    )
}
export default ConversationPage;