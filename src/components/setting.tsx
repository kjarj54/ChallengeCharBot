import { useState } from "react";
import { motion } from "framer-motion";

const Setting: React.FC<SettingsProps> = ({ closeSettings }) => {
  const [token, setToken] = useState("");
  const [sentence, setSentence] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, sentence }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Data saved successfully");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sentence:</label>
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </form>
    </motion.div>
  );
};

export default Setting;