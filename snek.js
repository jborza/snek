//grid of 20x13
rows = 13;
cols = 19;

grid = [];

const NOTHING = 0;
const WALL = 1;
const FOOD = 2;
const SNAKE = 3;

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
    // for(coord in snake_coords){
    //     grid[coord.y][coord.x] = SNAKE;
    // }
}

function random_point(){
    return {x:Math.random() * cols, 
        y: Math.random() * rows};
}



function place_food(){
    var coords = random_point();
    
    food_coords.push(coords);
    // while(true){
        //...
    // }
}

function render(){
    //draw blocks
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
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

function onload(){ 
    init_canvas();
    init_level();
    init_snake();

    place_food();

    score = 12;

    render();
}