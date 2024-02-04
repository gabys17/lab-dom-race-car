class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");

    //I am going to create a player in the future, for this moment of the code-along, I will leave it to null.

    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    ); //calling the player function - put all the parameters values
    //error player is not deffined in console - there is no reference in HTML . add reference as script at the end of html file

    //style for the game board
    this.height = 600;
    this.width = 500;

    //Obstacles
    this.obstacles = [];

    //Score
    this.score = 0;

    //Lives
    this.lives = 3;

    //variable to check if I'm in the process of creating an obstacle
    this.isPushingObstacle = false;

    //Variable to check if the game is over
    this.gameIsOver = false;
  }

  start() {
    //Sets the height and width of the game screen.
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    //Hides the start screen.
    this.startScreen.style.display = "none";

    //Shows the game screen.
    this.gameScreen.style.display = "block";

    //Starts the game loop - motion is set here, lots of frames togheter to become a video game
    this.gameLoop();
  }
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    this.player.move(); //check if the car should be moving

    //iterate over the obstacles array and make them move
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
      if (obstacle.top > this.height) {
        this.score++;

        //remove the obstacle HTML element from the HTML
        obstacle.element.remove();

        //remove the obstacle from the game class obstacles class array
        this.obstacles.splice(i, 1);
    }
    else if(this.player.didCollide(obstacle)){
        this.lives--;
         //remove the obstacle HTML element from the HTML
         obstacle.element.remove();

         //remove the obstacle from the game class obstacles class array
         this.obstacles.splice(i, 1);
    }
    }

    if (this.lives === 0) {
        this.endGame();
      }

    //if there are no obstacles, push a new one after 1 second and half
    if (!this.obstacles.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;
      setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.isPushingObstacle = false;
      }, 1500);
    }

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
  }

  endGame() {
    //change the game is over status. if its true, remember that this is going to break the animation loop
    //change the gameIsOver status
    this.gameIsOver = true;

    //remove player from html
    this.player.element.remove();
    //remove all obstacles
    this.obstacles.forEach((obstacle, index) => {
      this.obstacles.splice(index, 1); //remove javascript
      obstacle.element.remove; //remove from DOM - HTML
    });

    //hide the current game screen
    this.gameScreen.style.display = "none";
    //displays the endGame screen
    this.gameEndScreen.style.display = "block";
  }
}
