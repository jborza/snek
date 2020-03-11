//grid of 20x13
rows = 14;
cols = 20;

const UP = {x:0, y:-1};
const DOWN = {x:0, y:1};
const LEFT = {x:-1, y:0};
const RIGHT = {x:1, y:0};

var paused = false;
var game_over = false;

var snake_direction = RIGHT;

var snake_coords = [];

var food_coords = [];

var canvas = undefined;

const BLOCK_WIDTH = 16;
const BLOCK_HEIGHT = 16;

const PADDING_TOP = 32;
const PADDING_LEFT = 32;

var score = 0;
var frame = 0;
var ticks_per_move = 10;

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
    while(true){
        var coords = random_point();
        if(is_in_snake(coords))
            continue;
        food_coords.push(coords);
        return;
    }
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

    //gridlines
    for(var x = 0; x < cols; x++){
        ctx.moveTo(PADDING_LEFT + x*BLOCK_WIDTH, PADDING_TOP);
        ctx.strokeStyle = "#2b2c31";
        ctx.lineTo(PADDING_LEFT + x*BLOCK_WIDTH, get_canvas_height() - PADDING_TOP*2);
    }
    for(var y = 0; y < rows; y++){
        ctx.moveTo(PADDING_LEFT, PADDING_TOP+ y*BLOCK_HEIGHT);
        ctx.strokeStyle = "#2b2c31";
        ctx.lineTo( get_canvas_width() - PADDING_LEFT*2, PADDING_TOP+ y*BLOCK_HEIGHT);
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.font = "16px Comic Sans MS"; 
    ctx.fillText("Score: "+score_text(score), 10, 20);
    ctx.fillText(score_text(frame), 200, 20);

    if(game_over){
        ctx.font = "60px Comic Sans MS";
        ctx.fillText("GAME OVER", 20, 180);
    }

    if(paused){
        ctx.font = "60px Comic Sans MS";
        ctx.fillText("  PAUSE", 40, 180);
    }
}

function score_text(score){
    return score.toString().padStart(4,"0");
}

function init_canvas(){
    canvas = document.getElementById('canvas');
    //20*BLOCK_HEIGH
    canvas.width = get_canvas_width();
    canvas.height = get_canvas_height();
    canvas.style.width = canvas.width;
    canvas.style.height = canvas.height;
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



function make_coord_with_direction(previous, direction){
    return make_coord(previous.x + direction.x, previous.y+ direction.y);
}

function is_in_snake(coord){
    for(const snake_coord of snake_coords){
        if(coord.x == snake_coord.x && coord.y == snake_coord.y){
            return true;
        }
    }
    return false;
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

function get_canvas_width(){
    return PADDING_LEFT * 2 + BLOCK_WIDTH * cols;
}

function get_canvas_height(){
    return PADDING_TOP * 2 + BLOCK_WIDTH * rows;
}

function onload(){ 
    init_canvas();
    init_keys();
    init_snake();

    place_food();
    const temp = is_in_snake(make_coord(8,8));
    setInterval(tick, 1000/60);
}