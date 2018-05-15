// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < 505){
        this.x += (150 * dt);

    }else{this.x = -90;}

        //collision
        if(this.x < player.x + 30 && this.x + 60 > player.x 
            && this.y < player.y + 60 && this.y + 40 > player.y){
            player.reset();
        score.updateMiss();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

//Called every time when player position is updated
Player.prototype.update = function() {
    //if player reaches the water
    if(this.y < 20) {
        this.reset();
        score.updateSuccess();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function(direction){
    if(direction == 'left' && this.x > 0){
        this.x -=100;
    }

    if(direction == 'right' && this.x < 400){
        this.x +=100;
    }
    
    if(direction == 'up' && this.y > 3){
        this.y -=100;
    }

    if(direction == 'down' && this.y < 400){
        this.y +=100;
    }
};

//When Player go to water when game is reset
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 320;

};

var Score = function(){
    this.success = 0;
    this.miss = 0;
};

//Update score
Score.prototype.updateSuccess = function(){
    this.success += 1;
    document.getElementById('score_success').innerHTML = this.success;
};

Score.prototype.updateMiss = function(){
    this.miss += 1;
    document.getElementById('score_misses').innerHTML = this.miss;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();
var score = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
