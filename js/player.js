class Player {
	constructor(gameScreen, left, top, width, height, imgSrc){
		//gameScreen HTML element
		this.gameScreen = gameScreen;

		//Position of values
		this.left = left;//set in javascript
		this.top = top;

		//Player dimension values
		this.width = width;
		this.height = height;

		//image setting
		this.element = document.createElement("img");
		this.element.src = imgSrc;
		this.element.style.position = "absolute";

		//setting position of the player
		this.element.style.width = `${this.width}px`;
		this.element.style.height = `${this.height}px`;
		this.element.style.left = `${this.left}px`;//set in CSS
		this.element.style.top = `${this.top}px`;

		this.directionX = 0;//setting the inital values to move along x - horizontal
		this.directionY = 0;//setting the inital values to move along x - vertical

		this.gameScreen.appendChild(this.element);
	}

	move(){
		this.left += this.directionX;
		this.top += this.directionY;

		//handle the right side of the screen, so pplayer stops at the edge.
		if(this.left + this.width > this.gameScreen.offsetWidth){
			this.left = this.gameScreen.offsetWidth - this.width;
		}

		//handle the left side of the screen, so pplayer stops at the edge.
		else if(this.left <= 0){
			this.left = 0;
		}

		//handle the bottom side of screen
		if(this.top + this.height > this.gameScreen.offsetHeight){
			this.top = this.gameScreen.offsetHeight - this.height;
		}

		//handle top side of screen
		else if (this.top <= 0){
			this.top = 0;
		}

		this.updatePosition();
	}

	updatePosition() {
		this.element.style.left = `${this.left}px`;
		this.element.style.top = `${this.top}px`;
	}

	didCollide(obstacle){
		const playerRect = this.element.getBoundingClientRect();
		const obstacleRect = obstacle.element.getBoundingClientRect();

		if (
			playerRect.left < obstacleRect.right &&
			playerRect.right > obstacleRect.left &&
			playerRect.top < obstacleRect.bottom &&
			playerRect.bottom > obstacleRect.top
		  ) {
			return true;
		  } else {
			return false;
		  }
	}
}