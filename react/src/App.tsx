import { useState } from "react";
import { Button } from "./components/ui/button";
import SnakeGame from "./components/SnakeGame";
import HangmanGame from "./components/HangmanGame";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

function App() {
  const [selectedGame, setSelectedGame] = useState<"snake" | "hangman">("snake");
  const words = ["react", "typescript", "hangman", "developer", "frontend"];

  return (
    <div className="flex flex-col items-center p-6 relative min-h-screen bg-gradient-to-t from-green-500 to-white">
     
        <div className="top-4 left-4 absolute flex space-x-1 items-center">

            <span> <ChevronLeft  className="" size={24} /></span>
            <span><a href="/">Vissza</a></span>

        </div>
      
      <h1 className="text-3xl font-bold mb-6 text-zinc-900">React Játékok</h1>
      <div className="flex space-x-4 bg-gray-800 p-2 rounded-lg">
        <Button
          onClick={() => setSelectedGame("snake")}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all ${selectedGame === "snake" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Snake
        </Button>
        <Button
          onClick={() => setSelectedGame("hangman")}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all ${selectedGame === "hangman" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          Akasztófa
        </Button>
      </div>
      <motion.div
        key={selectedGame}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full flex justify-center mt-6"
      >
        {selectedGame === "snake" ? <SnakeGame startOnSpace={true} pointsPerApple={20} defaultHealth={5} /> : <HangmanGame words={words} maxAttempts={6}/>}
      </motion.div>
    </div>
  );
}

export default App;