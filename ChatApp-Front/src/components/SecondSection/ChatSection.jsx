import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import UserLable from "./UsersLabel";
const ChatSection = () => {
  const [category, setCategory] = useState("All");
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    const loadContacts = async () => {
      const contactFromDB = await fetchContacts(); 
      
      if (contactFromDB) {
        setContacts(contactFromDB); 
      }
    };

    loadContacts(); 
  }, []); 

  const fetchContacts = async () => {
    try {
      const userId = "67322c23acd7521854ca5eac";
      const response = await fetch(`http://localhost:8080/contact/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data?.contacts; // Return the contacts data
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      return [];
    }
  };
  const handleCategory = (cat) => {
    setCategory(cat);
  };
  return (
    <div className="w-[446px] bg-customBlack text-white">
      <div className="text-2xl font-bold mx-5 my-2 py-2">Chats</div>
      <div className="flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
        <div className="mx-2 text-2xl text-customDarkWhite">
          <IoIosSearch />
        </div>
        <input
          className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex px-1 py-2 mx-2 mt-1">
        <div
          onClick={() => handleCategory("All")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "All"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          All
        </div>
        <div
          onClick={() => handleCategory("Unread")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "Unread"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Unread
        </div>
        <div
          onClick={() => handleCategory("Favourites")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "Favourites"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Favourites
        </div>
      </div>
      <div className="max-h-[580px] overflow-y-scroll custom-scrollbar">
        {contacts
          ? contacts.map((contact) => {
              return <UserLable   key={contact} {...contact}/>;
            })
          : {}}
      </div>
    </div>
  );
};

export default ChatSection;
