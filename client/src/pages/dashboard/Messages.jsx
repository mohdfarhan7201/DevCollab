import React, {
  useState,
} from "react";


import ConversationList from "../../components/chat/ConversationList";

import ChatWindow from "../../components/chat/ChatWindow";

import DashboardLayout from "../../layouts/DashboardLayout";


import useCurrentUser from "../../hooks/useCurrentUser";

import useMessages from "../../hooks/useMessages";



const Messages = () => {


  const { user } =
    useCurrentUser();




  const {
    conversations,
    messages,
    setMessages,
    fetchMessages,
    sendMessage,
    loading,

  } = useMessages();






  const [
    activeConversation,
    setActiveConversation
  ] = useState(null);








  const handleConversationSelect =
    (conversation)=>{


      setActiveConversation(
        conversation
      );



      fetchMessages(
        conversation._id
      );


    };









  const handleSendMessage =
    (text)=>{


      if(!activeConversation){

        return;

      }




      sendMessage({

        receiverId:
          activeConversation._id,


        text,

      });


    };









  return (

    <DashboardLayout>


      <div

        className="
        h-[calc(100vh-80px)]
        flex
        rounded-xl
        overflow-hidden
        border
        border-gray-200
        dark:border-gray-800
        "

      >





        <div className="w-[320px]">


          <ConversationList


            conversations={
              conversations
            }


            activeConversation={
              activeConversation
            }


            onSelect={
              handleConversationSelect
            }


          />


        </div>









        <ChatWindow


          conversation={
            activeConversation
          }



          messages={
            messages
          }



          setMessages={
            setMessages
          }




          currentUserId={
            user?._id
          }



        />





      </div>









      {
        loading && (

          <div className="text-sm text-gray-500 mt-2">

            Loading conversations...

          </div>

        )
      }





    </DashboardLayout>

  );


};



export default Messages;