import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };

interface SnakeGameProps {
  defaultHealth: number,
  pointsPerApple: number,
  startOnSpace: boolean
}

const SnakeGame: React.FC<SnakeGameProps> = ({defaultHealth, pointsPerApple, startOnSpace}: SnakeGameProps) => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 0, y: -1 });
  const [isRunning, setIsRunning] = useState(!startOnSpace);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(defaultHealth);
  const [showPoints, setShowPoints] = useState<{ x: number; y: number } | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isRunning && event.code === "Space") {
        setIsRunning(true);
      }
      switch (event.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning || showGameOver) return;
    const moveSnake = () => {
      setSnake((prev) => {
        let newHead = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };
        
        // Falból való kijutás esetén a másik oldalon jelenjen meg
        if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
        if (newHead.x >= GRID_SIZE) newHead.x = 0;
        if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
        if (newHead.y >= GRID_SIZE) newHead.y = 0;

        // Ha a kígyó saját magába ütközik
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setLives((prevLives) => {
            if (prevLives - 1 <= 0) {
              setShowGameOver(true);
              setIsRunning(false);
              return 0;
            }
            return prevLives - 1;
          });
          setSnake(prev.slice(0, -1)); // Csökkentsük a kígyó hosszát
          return prev.slice(0, -1);
        }
        
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
          setScore((prev) => prev + pointsPerApple);
          setShowPoints({ x: food.x, y: food.y });
          setTimeout(() => setShowPoints(null), 800);
          return [newHead, ...prev]; // Snake grows
        }
        
        return [newHead, ...prev.slice(0, -1)];
      });
    };
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, isRunning, food, showGameOver]);

  return (
    <div className="relative w-[400px] h-[400px] border border-gray-500 bg-gray-900 rounded-lg shadow-lg p-2">
      {!isRunning && !showGameOver && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
          Nyomd meg a SPACE-t a kezdéshez
        </div>
      )}
      <div className="absolute top-2 left-2 bg-gray-800 text-white p-2 rounded shadow text-sm">
        <p className="font-semibold">❤️ Életek: {lives}</p>
        <p className="font-semibold">⭐ Pont: {score}</p>
      </div>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="absolute bg-green-500 w-5 h-5 rounded"
          style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
        />
      ))}
      <div
        className="absolute bg-red-500 w-5 h-5 rounded"
        style={{ left: `${food.x * 20}px`, top: `${food.y * 20}px` }}
      />
      {showPoints && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="absolute text-yellow-400 font-bold text-lg"
          style={{ left: `${showPoints.x * 20}px`, top: `${showPoints.y * 20}px` }}
        >
          +{pointsPerApple}
        </motion.div>
      )}
      {showGameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex rounded-lg items-center justify-center bg-black bg-opacity-80 text-white text-3xl font-bold"
        >
          GAME OVER
        </motion.div>
      )}
    </div>
  );
};

export default SnakeGame;