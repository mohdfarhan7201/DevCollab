import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { io } from "socket.io-client";

import { useAuth } from "./AuthContext";


const SocketContext =
  createContext(null);



export const SocketProvider = ({
  children,
}) => {


  const {
    user,
    isAuthenticated,
  } = useAuth();



  const socketRef =
    useRef(null);



  const [socket, setSocket] =
    useState(null);



  const [onlineUsers, setOnlineUsers] =
    useState([]);



  const [typingUsers, setTypingUsers] =
    useState([]);




  useEffect(() => {


    if (
      !isAuthenticated ||
      !user?._id
    ) {

      return;

    }





    const SOCKET_URL = (
      import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace("/api/v1", "")
        : "http://localhost:8000"
    );

    const socketInstance =
      io(
        SOCKET_URL,
        {
          withCredentials: true,
        }
      );





    socketRef.current =
      socketInstance;



    setSocket(
      socketInstance
    );






    socketInstance.on(
      "connect",
      () => {


        socketInstance.emit(
          "join",
          user._id
        );


      }
    );







    socketInstance.on(
      "online-users",
      (users) => {


        setOnlineUsers(users);


      }
    );







    socketInstance.on(
      "typing:start",
      ({ from }) => {


        setTypingUsers(
          prev => {


            if (
              prev.includes(from)
            ) {

              return prev;

            }


            return [
              ...prev,
              from
            ];


          }
        );


      }
    );







    socketInstance.on(
      "typing:stop",
      ({ from }) => {


        setTypingUsers(
          prev =>
            prev.filter(
              id => id !== from
            )
        );


      }
    );







    return () => {


      socketInstance.disconnect();


      socketRef.current =
        null;


      setSocket(null);


    };



  }, [
    isAuthenticated,
    user?._id
  ]);







  const startTyping = (
    receiverId
  ) => {


    socketRef.current?.emit(
      "typing:start",
      {
        to: receiverId,
      }
    );


  };






  const stopTyping = (
    receiverId
  ) => {


    socketRef.current?.emit(
      "typing:stop",
      {
        to: receiverId,
      }
    );


  };







  const emit = (
    event,
    payload
  ) => {


    socketRef.current?.emit(
      event,
      payload
    );


  };







  const on = (
    event,
    callback
  ) => {


    socketRef.current?.on(
      event,
      callback
    );


  };

  const off = (
    event,
    callback
  ) => {

    socketRef.current?.off(
      event,
      callback
    );
  };

  return (

    <SocketContext.Provider

      value={{
        socket,
        onlineUsers,
        typingUsers,
        startTyping,
        stopTyping,
        emit,
        on,
        off,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {

  const context =
    useContext(
      SocketContext
    );

  if (!context) {
    throw new Error(
      "useSocket must be used inside SocketProvider"
    );
  }
  return context;
};