import ChatSection from "./components/ChatSection"
import MessageSection from "./components/MessageSection"
import NotificationSection from "./components/NotificationSection"

function App() {

  return (
    <div className="  bg-[#262524] m-0 p-0 ">
      <div className="p-4 flex flex-row  min-h-screen"> 
        <NotificationSection/>
        <ChatSection/>
        <MessageSection/>
      </div>
    </div>
  )
}

export default App
