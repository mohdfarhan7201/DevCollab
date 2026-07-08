const { Server } = require("socket.io");

const {
  sendMessageService,
} = require("../services/message.service");


let io;


// userId -> socketId
const onlineUsers = new Map();



// =====================================
// INIT SOCKET
// =====================================

const initSocket = (httpServer) => {


  io = new Server(httpServer, {

    cors: {

      origin: [
        process.env.CORS_ORIGIN,
        "http://localhost:5174",
      ].filter(Boolean),

      credentials: true,

    },

  });




  io.on("connection", (socket) => {


    console.log(
      "Socket Connected:",
      socket.id
    );



    // =====================================
    // USER JOIN
    // =====================================


    socket.on(
      "join",
      (userId) => {


        socket.userId =
          userId.toString();



        onlineUsers.set(

          socket.userId,

          socket.id

        );



        io.emit(

          "online-users",

          [...onlineUsers.keys()]

        );



        console.log(

          `User Joined: ${socket.userId}`

        );


      }
    );





    // =====================================
    // SEND MESSAGE
    // =====================================


    socket.on(

      "message:send",

      async ({

        receiverId,

        text,

      }) => {


        try {



          if (!socket.userId) {

            return;

          }





          const message =

            await sendMessageService({

              senderId:
                socket.userId,

              receiverId,

              text,

            });






          const receiverSocket =

            onlineUsers.get(

              receiverId.toString()

            );





          if (receiverSocket) {


            io.to(receiverSocket)

              .emit(

                "message:receive",

                message

              );


          }





          socket.emit(

            "message:sent",

            message

          );




        } catch (error) {



          console.log(

            "Socket Message Error:",

            error.message

          );


        }


      }

    );







    // =====================================
    // START TYPING
    // =====================================


    socket.on(

      "typing:start",

      ({ to }) => {


        const receiverSocket =

          onlineUsers.get(

            to.toString()

          );



        if (receiverSocket) {


          io.to(receiverSocket)

            .emit(

              "typing:start",

              {

                from:
                  socket.userId,

              }

            );


        }


      }

    );








    // =====================================
    // STOP TYPING
    // =====================================


    socket.on(

      "typing:stop",

      ({ to }) => {


        const receiverSocket =

          onlineUsers.get(

            to.toString()

          );



        if (receiverSocket) {


          io.to(receiverSocket)

            .emit(

              "typing:stop",

              {

                from:
                  socket.userId,

              }

            );


        }


      }

    );







    // =====================================
    // DISCONNECT
    // =====================================


    socket.on(

      "disconnect",

      () => {


        if (socket.userId) {



          onlineUsers.delete(

            socket.userId

          );



          io.emit(

            "online-users",

            [...onlineUsers.keys()]

          );




          io.emit(

            "typing:stop",

            {

              from:
                socket.userId,

            }

          );



          console.log(

            `User Disconnected: ${socket.userId}`

          );


        }



        console.log(

          "Socket Disconnected:",

          socket.id

        );


      }

    );



  });




  return io;


};







// =====================================
// GET IO
// =====================================


const getIO = () => {


  if (!io) {


    throw new Error(

      "Socket.io not initialized"

    );


  }


  return io;


};






// =====================================
// GET RECEIVER SOCKET
// =====================================


const getReceiverSocket = (

  userId

) => {


  return onlineUsers.get(

    userId.toString()

  );


};






module.exports = {

  initSocket,

  getIO,

  getReceiverSocket,

};