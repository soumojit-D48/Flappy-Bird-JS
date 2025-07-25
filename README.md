# 🐦 Flappy-Bird-JS

A simple implementation of the classic **Flappy Bird** game using **HTML**, **CSS**, and **JavaScript** ith the `Canvas API`.

> 🚀 Built with zero external libraries – pure vanilla JavaScript!

## 🎮 Demo

Play it live: [flappy-bird-js.vercel.app](https://flappy-bird-js-git-main-soumojit-das-projects.vercel.app/)


---

## 📁 Project Structure

```bash
Flappy-Bird-JS/
│
├── index.html          # The main HTML file
├── style.css           # Styling for the game UI
├── script.js           # Core game logic using Canvas
│
├── flappybird.png          # Bird sprite
├── flappybirdbg.png        # Background image 
├── toppipe.png             # Top pipe image
├── bottompipe.png          # Bottom pipe image
├── flappy-bird-clipart-2.jpg # Extra image (optional or unused)
│
└── README.md           # You’re reading this file

```

## 🔧 Features:
🎮 Smooth bird animation using gravity and velocity

📦 Procedural pipe generation with collision detection

💥 Game Over & Restart functionality

📊 Real-time score with high score tracking

🧠 Keyboard Controls (Space, ArrowUp, or X)

## 🕹️ How to Play
Press Space, Arrow Up, or X to flap and keep the bird flying.

Avoid hitting the pipes or falling down.

Try to get the highest score!

## 📦 How to Run Locally
Clone the repo:

bash
Copy
Edit
git clone https://github.com/soumojit-D48/Flappy-Bird-JS.git
cd Flappy-Bird-JS
Open index.html in your browser:

Simply double-click the file

OR use Live Server in VS Code

## 💡 Game Mechanics (From script.js)
Gravity: Constant force pulling bird down (gravity = 0.4)

Flap: Applies upward velocity (velocityY = -7)

Pipes move left (velocityX = -2) and generate every 1.5 seconds

Collision is detected using bounding box logic

Score increases by 0.5 per pipe passed


## 🧠 Concepts Covered
CanvasRenderingContext2D API

Event listeners (keydown)

Game loop using requestAnimationFrame

Collision detection

DOM Manipulation

Basic game physics

## 📄 License
This project is open-source and available under the MIT License.

## 🙌 Acknowledgements
Inspired by the original Flappy Bird and built purely for learning purposes ❤️
