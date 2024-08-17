import { motion } from "framer-motion";


const Chat: React.FC<ChatProps> = ({closeChat,messages,handleSendMessage,input, setInput}) => {
    return(
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 z-50"
        >
          <button
            onClick={closeChat}
            className="absolute top-4 right-4 p-1 text-black bg-white rounded-full shadow-md"
          >
            ×
          </button>
          <div className="flex-1 overflow-y-scroll p-4 border border-gray-300 mt-8">
            {messages.map((msg, index) => (
              <div key={index} className="my-2 p-2 bg-gray-200 rounded">
                {msg}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l"
            />
            <button type="submit" className="p-2 bg-white text-black rounded-r shadow-md">
              Send
            </button>
          </form>
        </motion.div>
    );
};

export default Chat;