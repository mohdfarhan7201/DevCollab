import {
  useEffect,
  useState,
} from "react";


import {
  getConversationsApi,
  getMessagesApi,
  sendMessageApi,
} from "../api/message.api";





const useMessages = () => {



  const [
    conversations,
    setConversations
  ] = useState([]);




  const [
    messages,
    setMessages
  ] = useState([]);




  const [
    loading,
    setLoading
  ] = useState(false);







  // =====================================
  // FETCH CONVERSATIONS
  // =====================================


  const fetchConversations = async()=>{


    try{


      setLoading(true);



      const data =
        await getConversationsApi();




      setConversations(
        data.data || []
      );



    }catch(error){


      console.log(
        error.message
      );



    }finally{


      setLoading(false);


    }


  };









  // =====================================
  // FETCH MESSAGES
  // =====================================


  const fetchMessages =
    async(conversationId)=>{


      try{


        const data =
          await getMessagesApi(
            conversationId
          );



        setMessages(
          data.data || []
        );



      }catch(error){


        console.log(
          error.message
        );


      }


    };









  // =====================================
  // SEND MESSAGE API
  // =====================================


  const sendMessage =
    async(payload)=>{


      try{


        const data =
          await sendMessageApi(
            payload
          );




        if(data.data){


          setMessages(
            (prev)=>[

              ...prev,

              data.data,

            ]
          );


        }



        return data.data;



      }catch(error){


        console.log(
          error.message
        );


      }


    };









  useEffect(()=>{


    fetchConversations();



  },[]);








  return {


    conversations,


    messages,


    setMessages,


    loading,


    fetchMessages,


    sendMessage,


  };


};





export default useMessages;