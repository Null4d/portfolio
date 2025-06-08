import React, { useRef, useCallback, useEffect, useReducer } from "react";
import { SoundWrapper } from "../audio/AudioEngine";

const CELL_SIZE = 20;
const TWO_PI = 2 * Math.PI;

const initialState = {
  foodCount: 10,
  score: 0,
  gameActive: false,
  gamePaused: false,
  showEndScreen: false,
  endMessage: "",
  activeKeys: { up: false, down: false, left: false, right: false },
  direction: "right",
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        gameActive: true,
        gamePaused: false,
        showEndScreen: false,
        endMessage: "",
        foodCount: 10,
        score: 0,
      };
    case "END_GAME":
      return { ...state, gameActive: false, gamePaused: false };
    case "PAUSE_GAME":
      return { ...state, gamePaused: !state.gamePaused };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: state.score + 10,
        foodCount: state.foodCount - 1,
      };
    case "SET_DIRECTION":
      return { ...state, direction: action.payload };
    case "RESET_GAME":
      return initialState;
    case "SET_ACTIVE_KEYS":
      return {
        ...state,
        activeKeys: { ...state.activeKeys, ...action.payload },
      };
    case "SET_END_SCREEN":
      return {
        ...state,
        showEndScreen: action.show,
        endMessage: action.message || state.endMessage,
      };
    default:
      return state;
  }
};

const SnakeGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const canvasRef = useRef(null);
  const snakeRef = useRef([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const directionRef = useRef("right");
  const nextDirectionRef = useRef("right");
  const foodRef = useRef({ x: 7, y: 7 });
  const deathParticlesRef = useRef([]);
  const gameLoopRef = useRef({ id: null, lastTime: 0 });
  const restartCooldownRef = useRef(false);
  const headSizeRef = useRef(CELL_SIZE / 2.5);
  const collectedFoodTimestamps = useRef([]);

  const getRandomPosition = useCallback((max) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return Math.floor((array[0] / (0xffffffff + 1)) * max);
  }, []);

  const getRandomFloat = useCallback((min = 0, max = 1) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomValue = array[0] / (0xffffffff + 1);
    return randomValue * (max - min) + min;
  }, []);

  const getRandomInt = useCallback((min, max) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomValue = array[0] / (0xffffffff + 1);
    return Math.floor(randomValue * (max - min + 1)) + min;
  }, []);

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const gradient = context.createLinearGradient(
      0,
      0,
      0,
      context.canvas.height,
    );
    gradient.addColorStop(0, "#011627D6");
    gradient.addColorStop(1, "#02121BB5");
    context.fillStyle = gradient;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    if (deathParticlesRef.current.length === 0 && snakeRef.current.length > 1) {
      context.shadowBlur = 15;
      context.shadowColor = "#2ecc71";
      context.beginPath();
      context.lineWidth = CELL_SIZE / 1.5;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.strokeStyle = "#2ecc71";

      snakeRef.current.forEach((segment, index) => {
        const x = segment.x * CELL_SIZE + CELL_SIZE / 2;
        const y = segment.y * CELL_SIZE + CELL_SIZE / 2;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();
      context.shadowBlur = 0;

      const head = snakeRef.current[0];
      context.fillStyle = "#27ae60";
      context.beginPath();
      context.arc(
        head.x * CELL_SIZE + CELL_SIZE / 2,
        head.y * CELL_SIZE + CELL_SIZE / 2,
        headSizeRef.current,
        0,
        TWO_PI,
      );
      context.fill();

      context.shadowBlur = 10;
      context.shadowColor = "#27ae60";
      const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 1;
      context.fillStyle = "#2ecc71";
      context.beginPath();
      context.arc(
        foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
        foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
        (CELL_SIZE / 2.5) * pulse,
        0,
        TWO_PI,
      );
      context.fill();
      context.shadowBlur = 0;
    }

    deathParticlesRef.current.forEach((particle) => {
      context.globalAlpha = particle.alpha;
      context.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        (CELL_SIZE / 3) * particle.size,
        0,
        TWO_PI,
      );
      context.fill();
    });
    context.globalAlpha = 1;
  }, []);

  const spawnFood = useCallback(() => {
    if (!canvasRef.current) return;
    const maxX = Math.floor(canvasRef.current.width / CELL_SIZE);
    const maxY = Math.floor(canvasRef.current.height / CELL_SIZE);

    let newFood;
    do {
      newFood = {
        x: getRandomPosition(maxX),
        y: getRandomPosition(maxY),
      };
    } while (
      snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );

    foodRef.current = newFood;
  }, [getRandomPosition]);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ];
    directionRef.current = "right";
    nextDirectionRef.current = "right";
    deathParticlesRef.current = [];
    headSizeRef.current = CELL_SIZE / 2.5;
    collectedFoodTimestamps.current = [];
    foodRef.current = { x: 7, y: 7 };
    dispatch({ type: "RESET_GAME" });
  }, []);

  const gameOver = useCallback(() => {
    dispatch({ type: "END_GAME" });

    deathParticlesRef.current = snakeRef.current.map((segment) => ({
      x: segment.x * CELL_SIZE + CELL_SIZE / 2,
      y: segment.y * CELL_SIZE + CELL_SIZE / 2,
      velocityX: getRandomFloat(-2, 2) * 2,
      velocityY: getRandomFloat(-2, 2) * 2,
      alpha: 1,
      hue: 140 + getRandomInt(0, 20),
      size: getRandomFloat(0.5, 1),
    }));

    const animateDeath = () => {
      deathParticlesRef.current = deathParticlesRef.current
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          alpha: particle.alpha - 0.015,
          size: particle.size * 0.98,
        }))
        .filter((particle) => particle.alpha > 0);

      if (deathParticlesRef.current.length > 0) {
        requestAnimationFrame(animateDeath);
      } else {
        resetGame();
        draw();
      }
      draw();
    };

    animateDeath();
  }, [draw, resetGame]);

  const handleFoodCollection = useCallback(() => {
    headSizeRef.current = CELL_SIZE / 2;
    dispatch({ type: "UPDATE_SCORE" });

    if (state.foodCount - 1 === 0) {
      dispatch({ type: "PAUSE_GAME" });
      setTimeout(() => {
        dispatch({ type: "SET_END_SCREEN", show: true, message: "You Win!" });
        restartCooldownRef.current = true;
      }, 0);
    }

    collectedFoodTimestamps.current.push(Date.now());
    spawnFood();
    const head = snakeRef.current[0];
    snakeRef.current = [head, ...snakeRef.current];
  }, [spawnFood, state.foodCount]);

  const update = useCallback(() => {
    if (!canvasRef.current) return;

    const head = { ...snakeRef.current[0] };
    directionRef.current = nextDirectionRef.current;

    const moves = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] };
    const [dx, dy] = moves[directionRef.current];
    head.x += dx;
    head.y += dy;

    const maxX = Math.floor(canvasRef.current.width / CELL_SIZE);
    const maxY = Math.floor(canvasRef.current.height / CELL_SIZE);

    if (
      head.x < 0 ||
      head.x >= maxX ||
      head.y < 0 ||
      head.y >= maxY ||
      snakeRef.current.some(
        (segment, index) =>
          index > 0 && segment.x === head.x && segment.y === head.y,
      )
    ) {
      gameOver();
      return;
    }

    snakeRef.current = [head, ...snakeRef.current.slice(0, -1)];

    if (headSizeRef.current > CELL_SIZE / 2.5) {
      headSizeRef.current -= 0.5;
    }

    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      handleFoodCollection();
    }
  }, [gameOver, handleFoodCollection]);

  const gameLoop = useCallback(
    (currentTime) => {
      if (!gameLoopRef.current.lastTime)
        gameLoopRef.current.lastTime = currentTime;
      const deltaTime = currentTime - gameLoopRef.current.lastTime;

      if (deltaTime >= 100) {
        if (!state.gamePaused) update();
        gameLoopRef.current.lastTime = currentTime;
      }
      draw();

      if (state.gameActive) {
        gameLoopRef.current.id = requestAnimationFrame(gameLoop);
      }
    },
    [update, draw, state.gameActive, state.gamePaused],
  );

  const initGame = useCallback(() => {
    resetGame();
    dispatch({ type: "START_GAME" });
    draw();
    gameLoopRef.current.lastTime = 0;
    gameLoopRef.current.id = requestAnimationFrame(gameLoop);
  }, [draw, gameLoop, resetGame]);

  const handleKeyPress = useCallback(
    (e, isDown) => {
      const keyMap = {
        ArrowUp: "up",
        w: "up",
        W: "up",
        ArrowDown: "down",
        s: "down",
        S: "down",
        ArrowLeft: "left",
        a: "left",
        A: "left",
        ArrowRight: "right",
        d: "right",
        D: "right",
      };

      const direction = keyMap[e.key];
      if (!direction) return;

      e.preventDefault();
      dispatch({ type: "SET_ACTIVE_KEYS", payload: { [direction]: isDown } });

      if (
        isDown &&
        state.gameActive &&
        !state.gamePaused &&
        !restartCooldownRef.current
      ) {
        const opposites = {
          up: "down",
          down: "up",
          left: "right",
          right: "left",
        };
        if (direction !== opposites[directionRef.current]) {
          nextDirectionRef.current = direction;
          dispatch({ type: "SET_DIRECTION", payload: direction });
        }
      }
    },
    [state.gameActive, state.gamePaused],
  );

  const handleStartGame = useCallback(() => {
    if (!state.gameActive && !state.showEndScreen) initGame();
  }, [state.gameActive, state.showEndScreen, initGame]);

  const handlePauseToggle = useCallback(() => {
    if (state.gameActive && !state.showEndScreen)
      dispatch({ type: "PAUSE_GAME" });
  }, [state.gameActive, state.showEndScreen]);

  const handleContinue = useCallback(() => {
    dispatch({ type: "SET_END_SCREEN", show: false });
    dispatch({ type: "END_GAME" });
    restartCooldownRef.current = false;
    resetGame();
    draw();
  }, [resetGame, draw]);

  const getFoodScale = useCallback((index) => {
    const timestamp = collectedFoodTimestamps.current[index];
    if (!timestamp) return 1;
    const timeSince = Date.now() - timestamp;
    return timeSince > 500
      ? 1
      : 1 + Math.sin(timeSince * 0.01) * Math.exp(-timeSince * 0.005) * 0.3;
  }, []);

  useEffect(() => {
    const keyDownHandler = (e) => handleKeyPress(e, true);
    const keyUpHandler = (e) => handleKeyPress(e, false);

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    if (state.gameActive && !gameLoopRef.current.id) {
      gameLoopRef.current.lastTime = 0;
      gameLoopRef.current.id = requestAnimationFrame(gameLoop);
    }

    if (canvasRef.current && !state.gameActive) {
      draw();
    }

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      if (gameLoopRef.current.id) {
        cancelAnimationFrame(gameLoopRef.current.id);
        gameLoopRef.current.id = null;
      }
    };
  }, [handleKeyPress, gameLoop, state.gameActive, draw]);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 bg-teal-400 rounded-full opacity-25 w-96 h-96 blur-3xl z-1"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 rounded-full w-96 h-96 z-1 bg-blue-500/20 blur-2xl"
        aria-hidden="true"
      />

      <div className="image-corners relative z-10 flex items-center rounded-lg py-9 justify-around w-[550px] h-[475px] bg-gradient-to-r from-[#175553] to-[#43e2b321] border-primary-2 shadow-md shadow-black">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width="250"
            height="400"
            className="rounded-lg"
            aria-label="Snake game canvas"
          />

          {state.showEndScreen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-lg backdrop-blur-sm">
              <div className="text-center p-8 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-2xl border border-green-400/30 shadow-2xl">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                  {state.endMessage}
                </h2>
                <div className="mb-4">
                  <p className="text-lg text-green-300 mb-1">Final Score</p>
                  <p className="text-2xl font-bold text-primary-7">
                    {state.score}
                  </p>
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                  <span className="text-yellow-400 animate-pulse">⭐</span>
                  <span
                    className="text-yellow-400 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ⭐
                  </span>
                  <span
                    className="text-yellow-400 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ⭐
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Congratulations! You've mastered the snake!
                </p>
                <SoundWrapper>
                  <button
                    onClick={handleContinue}
                    className="px-6 py-2 bg-[#FFB93E] hover:bg-[#F8AC26] text-black rounded-md transition-colors duration-200"
                  >
                    Continue
                  </button>
                </SoundWrapper>
              </div>
            </div>
          )}

          {!state.gameActive && !state.showEndScreen && (
            <SoundWrapper>
              <button
                onClick={handleStartGame}
                className="absolute transform -translate-x-1/2 duration-100 rounded-md text-black whitespace-nowrap bottom-4 left-1/2 bg-[#FFB93E] hover:bg-[#F8AC26] px-4 py-2"
              >
                Start Game
              </button>
            </SoundWrapper>
          )}
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-auto text-primary-7 rounded-lg">
            <p className="text-base">{"// use keyboard"}</p>
            <p className="mb-2 text-base">{"// arrows or WASD"}</p>
            <div className="flex flex-col items-center pt-2 gap-2">
              <div className="flex justify-center">
                <button
                  className={`px-5 py-2 rounded-lg border border-primary-3 transition-all duration-200 flex items-center justify-center ${state.activeKeys.up ? "bg-green-500" : ""}`}
                  aria-label="Move up"
                  disabled
                >
                  <i className="text-xl icon-arrow-up" />
                </button>
              </div>
              <div className="flex gap-2">
                {["left", "down", "right"].map((dir) => (
                  <button
                    key={dir}
                    className={`px-5 py-2 rounded-lg border border-primary-3 transition-all duration-200 flex items-center justify-center ${state.activeKeys[dir] ? "bg-green-500" : ""}`}
                    aria-label={`Move ${dir}`}
                    disabled
                  >
                    <i className={`text-xl icon-arrow-${dir}`} />
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-6 text-base">{"// food left"}</p>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 bg-green-400 rounded-full transition-all duration-200 ${index < 10 - state.foodCount ? "opacity-100" : "opacity-50"}`}
                  style={{
                    transform: `scale(${getFoodScale(index)})`,
                    boxShadow:
                      index < 10 - state.foodCount
                        ? "0 0 8px rgba(46, 204, 113, 0.8)"
                        : "none",
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <SoundWrapper>
              <button
                onClick={handlePauseToggle}
                className="px-4 py-2 text-primary-7 border border-primary-7 duration-200 rounded-lg transition-colors hover:bg-white hover:text-black"
                disabled={!state.gameActive || state.showEndScreen}
              >
                {state.gamePaused ? "Resume" : "Pause"}
              </button>
            </SoundWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
