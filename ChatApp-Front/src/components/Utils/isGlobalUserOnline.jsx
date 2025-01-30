


const isGlobalUserOnline = (socket, emailId) => {
    return new Promise((resolve) => {
      socket.emit("checkUserOnline", { email: emailId });
  
      socket.once("responseIsUserOnline", (response) => {
        resolve(response); // Resolves the promise with the event data
      });
    });
  };

export default isGlobalUserOnline;