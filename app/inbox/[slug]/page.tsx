// import { getUserId, getAccessToken } from "@/app/lib/actions";
// import apiService from "@/app/services/apiService";
// import ConversationDetail from "@/app/components/inbox/ConversationDetail";
// import { UserType } from "../page";

// export type MessageType = {
//   id: string;
//   name: string;
//   body: string;
//   conversationId: string;
//   sent_to: UserType;
//   created_by: UserType;
// };

// export default async function Page({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;

//   const userId = await getUserId();
//   const token = await getAccessToken();

//   if (!userId || !token) {
//     return (
//       <main className="max-w-[1500px] mx-auto px-6 py-12">
//         <p className="text-2xl font-bold">You need to be authenticated...</p>
//       </main>
//     );
//   }

//   const conversation = await apiService.get(`/api/chat/${slug}/`);

//   return (
//     <main className="max-w-[1500px] mx-auto px-6 pb-6">
//       <ConversationDetail
//         token={token}
//         userId={userId}
//         messages={conversation.messages}
//         conversation={conversation.conversation}
//       />
//     </main>
//   );
// }

const ConversationPage = () =>{
  return(
    <></>
  )
}
export default ConversationPage;