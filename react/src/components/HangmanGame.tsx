import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const MAX_ATTEMPTS = 6;

interface HangmanProps {
  words: string[];
  maxAttempts: number;
}

const HangmanGame: React.FC<HangmanProps> = ({ words, maxAttempts }: HangmanProps) => {

  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  

  const handleGuess = useCallback((letter: string) => {
    if (gameOver || guessedLetters.includes(letter)) return;
    
    setGuessedLetters(prev => [...prev, letter]);
    
    if (!word.includes(letter)) {
      setAttempts(prev => {
        const updated = prev + 1;
        if (updated >= maxAttempts) setGameOver(true);
        return updated;
      });
    }
  }, [guessedLetters, word, gameOver, maxAttempts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setAttempts(0);
    setGameOver(false);
  };

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const isWordGuessed = !displayWord.includes("_");

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-yellow-400">Hangman</h1>
      <p className="text-lg mb-2">Attempts left: <span className="font-bold text-red-500">{maxAttempts - attempts}</span></p>
      <svg width="200" height="250" className="mb-6">
        {/* Állvány */}
        <line x1="50" y1="220" x2="150" y2="220" stroke="white" strokeWidth="4" />
        <line x1="100" y1="220" x2="100" y2="50" stroke="white" strokeWidth="4" />
        <line x1="100" y1="50" x2="150" y2="50" stroke="white" strokeWidth="4" />
        <line x1="150" y1="50" x2="150" y2="70" stroke="white" strokeWidth="4" />

        {/* Akasztott figura */}
        {attempts > 0 && <circle cx="150" cy="90" r="20" stroke="white" strokeWidth="4" fill="none" />} {/* Fej */}
        {attempts > 1 && <line x1="150" y1="110" x2="150" y2="170" stroke="white" strokeWidth="4" />} {/* Törzs */}
        {attempts > 2 && <line x1="150" y1="130" x2="130" y2="150" stroke="white" strokeWidth="4" />} {/* Bal kar */}
        {attempts > 3 && <line x1="150" y1="130" x2="170" y2="150" stroke="white" strokeWidth="4" />} {/* Jobb kar */}
        {attempts > 4 && <line x1="150" y1="170" x2="130" y2="200" stroke="white" strokeWidth="4" />} {/* Bal láb */}
        {attempts > 5 && <line x1="150" y1="170" x2="170" y2="200" stroke="white" strokeWidth="4" />} {/* Jobb láb */}
      </svg>
      <p className="text-3xl font-mono mb-6 tracking-widest flex gap-2">
  {word.split("").map((letter, i) => (
    <motion.span
      key={i}
      animate={{ opacity: guessedLetters.includes(letter) ? 1 : 0.3 }}
      className="border-b-2 border-gray-600 px-2"
    >
      {guessedLetters.includes(letter) ? letter.toUpperCase() : "_"}
    </motion.span>
  ))}
</p>
      <div className="grid grid-cols-9 gap-3 max-w-md">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <motion.button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
            className={`font-bold py-2 px-3 rounded transition-all
      ${guessedLetters.includes(letter)
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"}
    `}
            whileTap={{ scale: guessedLetters.includes(letter) ? 1 : 0.9 }}
          >
            {letter.toUpperCase()}
          </motion.button>
        ))}
      </div>
      {(gameOver || isWordGuessed) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-2xl font-bold p-4 bg-gray-800 rounded-lg shadow-lg text-center flex flex-col"
        >
          {isWordGuessed ? <span className="text-green-500">Congratulations! You guessed the word!</span> : <span className="text-red-500">Game Over! The word was "{word}".</span>}
          <Button onClick={resetGame} className="mt-4 bg-secondary hover:bg-yellow-200 text-primary cursor-pointer  font-bold py-2 px-4 rounded transition-all">New Game</Button>
        </motion.div>
      )}
    </div>
  );
};

export default HangmanGame;