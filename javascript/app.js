let keys_down = {};
let bullets = [];
let player1;
let player2;
const create_board = () => {
  for(i=0;i<40;i++){
    $('#gameboard').append(`<div class="board_column" id="column${i}"></div>`);
    for(j=40;j>0;j--){
      $(`#column${i}`).append(`<div class='gridsquare' id='square_${i}_${j}'></div>`);
    }
  }
  for(i=0;i<40;i++){
    $(`#square_${i}_1`).addClass("wall");
    $(`#square_${i}_40`).addClass("wall");
  }
  for(i=2;i<40;i++){
    $(`#square_0_${i}`).addClass("wall");
    $(`#square_39_${i}`).addClass("wall");
  }
}
class player {
  constructor (x,y,facing,number){
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.score = 0;
    this.number = number;
  }
  willCollide(direction){
    if (direction == 'n'){
      console.log('looking north');
      if ($(`#square_${this.x}_${this.y+1}`).hasClass('player1')
      ||$(`#square_${this.x}_${this.y+1}`).hasClass('player2')
      ||$(`#square_${this.x}_${this.y+1}`).hasClass('bullet')
      ||$(`#square_${this.x}_${this.y+1}`).hasClass('wall')){
        return true;
      }
    }else if (direction == 'e'){
      if ($(`#square_${this.x+1}_${this.y}`).hasClass('player1')
      ||$(`#square_${this.x+1}_${this.y}`).hasClass('player2')
      ||$(`#square_${this.x+1}_${this.y}`).hasClass('bullet')
      ||$(`#square_${this.x+1}_${this.y}`).hasClass('wall')){
      return true;
    }
    }else if (direction == 'w'){
      if ($(`#square_${this.x-1}_${this.y}`).hasClass('player1')
      ||$(`#square_${this.x-1}_${this.y}`).hasClass('player2')
      ||$(`#square_${this.x-1}_${this.y}`).hasClass('bullet')
      ||$(`#square_${this.x-1}_${this.y}`).hasClass('wall')){
      return true;
    }
    }else if (direction == 's'){
      if ($(`#square_${this.x}_${this.y-1}`).hasClass('player1')
      ||$(`#square_${this.x}_${this.y-1}`).hasClass('player2')
      ||$(`#square_${this.x}_${this.y-1}`).hasClass('bullet')
      ||$(`#square_${this.x}_${this.y-1}`).hasClass('wall')){
      return true;
    }
    }else {
      console.log('unobstructed')
      return false;
    }
  }
  move(direction){
    if (direction == 'n' && !this.willCollide('n')){
      $(`#square_${this.x}_${this.y}`).removeClass(`player${this.number}`);
      console.log("wtf")
      this.y++;
      this.facing = 'n';
    }
    if (direction == 'e' && !this.willCollide('e')){
      $(`#square_${this.x}_${this.y}`).removeClass(`player${this.number}`);
      this.x++;
      this.facing = 'e';
    }
    if (direction == 's' && !this.willCollide('s')){
      $(`#square_${this.x}_${this.y}`).removeClass(`player${this.number}`);
      this.y--;
      this.facing = 's';
    }
    if (direction == 'w' && !this.willCollide('w')){
      $(`#square_${this.x}_${this.y}`).removeClass(`player${this.number}`);
      this.x--;
      this.facing = 'w';
    }
  }
}
const create_players = () => {
  player1 = new player (10,10,'n',1);
  player2 = new player (20,20,'n',2);
}
const create_key_events = () => {

  document.addEventListener('keydown', (event) => {
    const key = event.which;
    keys_down[key] = true;
    console.log(keys_down[key]);
  })
  document.addEventListener('keyup', (event) => {
    const key = event.which;
    keys_down[key] = false;
  })
}
const do_player_movement = () => {
  if (keys_down[38]){
    player1.move('n');
  }if (keys_down[40]){
    player1.move('s');
  }if (keys_down[37]){
    player1.move('w');
  }if (keys_down[39]){
    player1.move('e');
  }if (keys_down[87]){
    player2.move('n');
  }if (keys_down[83]){
    player2.move('s');
  }if (keys_down[65]){
    player2.move('w');
  }if (keys_down[68]){
    player2.move('e');
  }
}


create_board();
create_players();
create_key_events();

const do_tick_loop = () => {
  do_player_movement();
  update_board();
}
let tick_loop = setInterval(do_tick_loop,40);
const update_board = () => {
  for (i = 0;i<bullets.length;i++){
    let x = bullets[i].x
    let y = bullets[i].y
    $(`square_${x}_${y}`).addClass("bullet");
  }
  console.log('tick');
  $(`#square_${player1.x}_${player1.y}`).addClass("player1");
  $(`#square_${player2.x}_${player2.y}`).addClass("player2");
}