const Message = require("../models/message.model");
const ApiError = require("../utils/apiError");



// =====================================
// SEND MESSAGE
// =====================================

const sendMessageService = async ({
  senderId,
  receiverId,
  text,
}) => {


  if(!receiverId || !text){

    throw new ApiError(
      400,
      "Receiver and message required"
    );

  }



  const message =
    await Message.create({

      sender: senderId,

      receiver: receiverId,

      text,

    });



  return message;

};








// =====================================
// GET MESSAGES
// =====================================


const getMessagesService = async (
  userId,
  otherUserId
)=>{


  const messages =
    await Message.find({

      $or:[

        {
          sender:userId,
          receiver:otherUserId,
        },


        {
          sender:otherUserId,
          receiver:userId,
        }

      ]

    })

    .sort({
      createdAt:1
    })

    .populate(
      "sender receiver",
      "name username avatar"
    );



  return messages;

};









// =====================================
// GET CONVERSATIONS
// =====================================


const getConversationsService =
async(userId)=>{


  const messages =
    await Message.find({

      $or:[

        {
          sender:userId
        },

        {
          receiver:userId
        }

      ]

    })

    .sort({
      createdAt:-1
    })

    .populate(
      "sender receiver",
      "name username avatar"
    );





  const users =
    new Map();





  messages.forEach((message)=>{


    const otherUser =

      message.sender._id.toString()
      === userId.toString()

      ? message.receiver

      : message.sender;





    if(
      !users.has(
        otherUser._id.toString()
      )
    ){


      users.set(

        otherUser._id.toString(),

        {

          _id:
            otherUser._id,

          name:
            otherUser.name,

          username:
            otherUser.username,

          avatar:
            otherUser.avatar,

          lastMessage:
            message.text,

        }

      );


    }



  });





  return Array.from(
    users.values()
  );


};






module.exports = {

  sendMessageService,

  getMessagesService,

  getConversationsService,

};