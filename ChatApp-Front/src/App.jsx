import { useState } from "react"
import MessageSection from "./components/MessageSection"
import NotificationSection from "./components/NotificationSection"
import DynamicSection from "./components/DynamicSection"

function App() {
  const [activeComponent, setActiveComponent] = useState('ChatSection');
  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  }
  return (
    <div className="bg-[#262524] m-0 p-0">
      <div className="p-4 flex flex-row  min-h-screen"> 
        <NotificationSection activeComponent={activeComponent} onComponentChange={handleComponentChange}/>
        <DynamicSection activeComponent={activeComponent}/>
        <MessageSection/>
      </div>
    </div>
  )
}

export default App
