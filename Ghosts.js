const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const $sprite = document.getElementById("sprite");

export class Ghost {
  #ghostWidth = 15;
  #ghostHeight = 15;
  
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = this.#ghostWidth;
    this.height = this.#ghostHeight;
    this.color = color;
  }

  eat(pacman) {
    if(pacman.y >= this.y + this.height &&
      pacman.y + pacman.width <= this.y &&
      pacman.x <= this.x + this.width &&
      pacman.x + pacman.width >= this.x 
    ) {
      console.log("dei")
      pacman.die();
    }
  }

  checkGhostCollision(pacmanMap, wallWidth, wallHeight) {
    let collision = false;

      for (let i = 0; i < pacmanMap.length; i++) {
        for (let j = 0; j < pacmanMap[i].length; j++) {
          const xPos = j * wallWidth;
          const yPos = i * wallHeight;

          if (pacmanMap[i][j] === "#") {
            const wallLeft = xPos;
            const wallRight = xPos + wallWidth;
            const wallTop = yPos;
            const wallBottom = yPos + wallHeight;

            // Calculate the bounding box of Pacman
            const ghostLeft = this.x;
            const ghostRight = this.x + this.width;
            const ghostUp = this.y;
            const ghostBottom = this.y + this.height;

            if (
              ghostRight > wallLeft &&
              ghostLeft < wallRight &&
              ghostUp > wallTop &&
              ghostBottom < wallBottom
            ) {
              collision = true;
              break;
            }
          }
        }
        if (collision) break;
      }

      if (collision) {
        if (this.x < canvas.width - this.width) {
          this.x = -this.x;
        } else if (this.y > 0) {
          this,y = -this.y;
        } else if (this.y < canvas.height - this.height) {
          this.y = -this.y;
        } else if (this.x > 0) {
          this.x = -this.x;
        }

        return;
      } 
  }

  draw() {
    if(this.color === "red") {
      ctx.drawImage(
        $sprite,
        680 - 224,
        248 - 184,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if(this.color === "pink") {
      ctx.drawImage(
        $sprite,
        680 - 224,
        248 - 168,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if(this.color === "blue") {
      ctx.drawImage(
        $sprite,
        680 - 224,
        248 - 152,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if(this.color === "orange") {
      ctx.drawImage(
        $sprite,
        680 - 224,
        248 - 136,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}