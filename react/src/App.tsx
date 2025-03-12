import { useState } from "react";
import { Button } from "./components/ui/button";
import SnakeGame from "./components/SnakeGame";
import HangmanGame from "./components/HangmanGame";

function App() {
  const [selectedGame, setSelectedGame] = useState<"snake" | "hangman" | null>("snake");

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">React Játékok</h1>
      <div className="flex gap-4 mb-6">
        <Button onClick={() => setSelectedGame("snake")}>Snake</Button>
        <Button onClick={() => setSelectedGame("hangman")}>Akasztófa</Button>
      </div>
      {selectedGame === "snake" && <SnakeGame />}
      {selectedGame === "hangman" && <HangmanGame />}
    </div>
  );
}

export default App;