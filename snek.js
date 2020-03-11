//grid of 20x13
rows = 13;
cols = 20;

grid = [];

const NOTHING = 0;
const WALL = 1;
const FOOD = 2;
const SNAKE = 3;

snake_coords = [];

var canvas = undefined;

const BLOCK_WIDTH = 8;
const BLOCK_HEIGHT = 8;

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
    snake_coords.push(make_coord(6,8));
    snake_coords.push(make_coord(6,8));
    snake_coords.push(make_coord(6,8));
    for(coord in snake_coords){
        grid[coord.y][coord.x] = SNAKE;
    }
}

function random_point(){
    return {x:Math.random() * cols, 
        y: Math.random() * rows};
}



function place_food(){
    var coords = random_point();
    while(true){
        //...
    }
}

function render(){
    //draw blocks
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    
    ctx.fillStyle = "#f39632";
    ctx.fillRect(20,20,20,20);
    // ctx.stroke();
}

function onload(){ 
    init_level();
    canvas = document.getElementById('canvas');
    render();
}