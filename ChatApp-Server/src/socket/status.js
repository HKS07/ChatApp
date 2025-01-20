import connectedUsers from "../utils/connectedUsers.js";
export const setupStatusHandlers = (io, socket) => {
    socket.on("checkAllContactsStatus", (data) => {
        //got id from socket
        // const {socketId} = data;
        //check his contacts list
        const currentUser = connectedUsers.get(socket.id);
        const currentConnectedContacts = [];
        connectedUsers.forEach((value,key) => {
            if(currentUser.contacts.includes(value.oAuthSub))
            {
                currentConnectedContacts.push({socketId: key, ...value})
            }
        })
        // console.log(currentConnectedContacts);
        socket.emit("connectedContacts", currentConnectedContacts)
        //check if his contact list exist in coonectedUser map
        //present users data should be retured in term of oauthsub
    });
}