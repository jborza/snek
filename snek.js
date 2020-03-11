//grid of 20x13
rows = 14;
cols = 20;

grid = [];

const NOTHING = 0;
const WALL = 1;
const FOOD = 2;
const SNAKE = 3;

const UP = {x:0, y:-1};
const DOWN = {x:0, y:1};
const LEFT = {x:-1, y:0};
const RIGHT = {x:1, y:0};


var snake_direction = RIGHT;

var snake_coords = [];

food_coords = [];

var canvas = undefined;

const BLOCK_WIDTH = 16;
const BLOCK_HEIGHT = 16;

const PADDING_TOP = 32;
const PADDING_LEFT = 32;

var score = 0;

function init_level(){
    grid = [];
    for(var y = 0; y < rows; y++){
        grid[y] = [];
        for(var x = 0; x < cols; x++){
            grid[y][x] = NOTHING;
        }
    }
}

function make_coord(x,y){
    return {x:x, y:y};
}

function init_snake(){
    snake_coords = [];
    snake_coords.push(make_coord(6,8));
    snake_coords.push(make_coord(7,8));
    snake_coords.push(make_coord(8,8));
}

function random_point(){
    return {
        x: Math.floor(Math.random() * cols), 
        y: Math.floor(Math.random() * rows)
    };
}

function place_food(){
    var coords = random_point();
    // var coords = make_coord(10,8);
    food_coords.push(coords);
    // while(true){
        //...
    // }
}

function render(){
    //draw blocks
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,500, PADDING_TOP);
    ctx.fillStyle = "#1c1d20";
    
    ctx.fillRect(PADDING_LEFT, PADDING_TOP, cols*BLOCK_WIDTH, rows*BLOCK_HEIGHT);
    for(const coord of snake_coords){
        ctx.fillStyle = "#f39632";
        ctx.fillRect(PADDING_LEFT + coord.x * BLOCK_WIDTH, PADDING_TOP + coord.y * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);    
    }

    for(const coord of food_coords){
        ctx.fillStyle = "white";
        ctx.fillRect(PADDING_LEFT + coord.x * BLOCK_WIDTH, PADDING_TOP +  coord.y * BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT);    
    }
    
    ctx.font = "16px Comic Sans MS"; 
    ctx.fillText("Score: "+score_text(score), 10, 20);
    ctx.fillText(score_text(frame), 200, 20);

}

function score_text(score){
    return score.toString().padStart(4,"0");
}

function init_canvas(){
    canvas = document.getElementById('canvas');
    //20*BLOCK_HEIGH
    canvas.width = 512;
    canvas.height = 512;
}

const key_left = 37;
const key_right = 39;
const key_up = 38;
const key_down = 40;

const keys_to_direction = new Map();
keys_to_direction.set(key_left, LEFT);
keys_to_direction.set(key_right, RIGHT);
keys_to_direction.set(key_up, UP);
keys_to_direction.set(key_down, DOWN);


function onkey(e){
    var key = keys_to_direction.get(e.keyCode);
    if(key === undefined)
        return;
    try_change_direction(key);
}

function try_change_direction(new_direction){
    console.log("try change dir" + new_direction);
    if((new_direction === LEFT && snake_direction === RIGHT)
    || (new_direction === RIGHT && snake_direction === LEFT)
    || (new_direction === UP && snake_direction === DOWN)
    || (new_direction === DOWN && snake_direction === UP))
    return;
    snake_direction = new_direction;
    console.log("changed to "+new_direction);
}

function init_keys(){
    window.addEventListener('keydown',this.onkey,false);
}

var frame = 0;

var ticks_per_move = 10;

function make_coord_with_direction(previous, direction){
    return make_coord(previous.x + direction.x, previous.y+ direction.y);
}

function move_snake(){
    var snake_head = snake_coords[snake_coords.length - 1];
    var new_head = make_coord_with_direction(snake_head, snake_direction);
    snake_coords.push(new_head);
    //check if food eaten
    var food_block = food_coords[0];
    if(new_head.x == food_block.x && new_head.y == food_block.y){
        food_coords.shift();
        place_food();
    }
    else{    
        snake_coords.shift(); //drop the tail
    }
}

function tick(){
    frame++;
    if(frame % ticks_per_move == 0)
    {
        move_snake();
    }

    render();
}

function onload(){ 
    init_canvas();
    init_keys();
    init_level();
    init_snake();

    place_food();

    score = 12;

    setInterval(tick, 1000/60);
}