window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function() {
    //js in the current tab is going to refresh the page
    location.reload();
  })

  function startGame() {
    //console.log("start game");
    game = new Game();
    game.start();
  }

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown"
    ];

      if(possibleKeys.includes(key)) {
        event.preventDefault();// avoid scrolling down which is set in some browsers
      

      if(game) {
        switch(key){
          case "ArrowLeft":
            game.player.directionX = -5;
            break;
          case "ArrowUp":
            game.player.directionY = -5;
            break;
          case "ArrowRight":
            game.player.directionX = 5;
            break;
          case "ArrowDown":
            game.player.directionY = 5;
            break;
        }
      }
    }
  }

  function handleKeyup(event) {
    const key = event.key;
    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown"
    ];

      if(possibleKeys.includes(key)) {
        event.preventDefault();// avoid scrolling down which is stted in some browsers
      

      if(game) {
        switch(key){
          case "ArrowLeft":
            game.player.directionX = 0;//TO CHANGE THE MOTION HERE OF THE CAR, IT DOES NOT STOP
            break;
          case "ArrowUp":
            game.player.directionY = 0;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
  }

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};
