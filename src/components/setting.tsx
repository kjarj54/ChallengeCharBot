import { motion } from "framer-motion";


const Setting: React.FC<SettingsProps> = ({closeSettings}) => {
    return(
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="fixed bottom-0 right-0 w-150 h-3/4 p-4 bg-white border-t border-gray-300 z-50 flex flex-col"
        >
          <button
            onClick={closeSettings}
            className="absolute top-4 right-4 p-1 text-black bg-white rounded-full shadow-md"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 mt-8">Chat Settings</h2>
          <div className="p-4 border border-gray-300 rounded">
            <p>Aquí puedes configurar las opciones del chat.</p>
          </div>
        </motion.div>
    );
};

export default Setting;