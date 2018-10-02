let movetick = true;
let keys_down = {};
let bullets = [];
let bullets_fired = 0;
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
class Player {
  constructor (x,y,facing,number){
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.score = 0;
    this.number = number;
  }
  willCollide(direction){
    if (direction == 'n'){
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
  fire(){
    let bullet = new Bullet(this.x,this.y,this.facing,this);
    if (this.facing == 'n'){
      bullet.y++;
    }else if (this.facing == 'e'){
      bullet.x++;
    }else if (this.facing == 's'){
      bullet.y--;
    }else if (this.facing == 'w'){
      bullet.x--;
    }
    bullets.push(bullet);
  }
}
class Bullet {
  constructor (x,y,facing,player){
    this.player = player;
    this.x = x;
    this.y = y;
    this.facing = facing;
  }
  willCollide(direction){
    if (direction == 'n'){
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
      return false;
    }
  }
  willHitPlayer(direction){
    if (direction == 'n'){
      if ($(`#square_${this.x}_${this.y+1}`).hasClass('player1')
      ||$(`#square_${this.x}_${this.y+1}`).hasClass('player2')){
        return true;
      }
    }else if (direction == 'e'){
      if ($(`#square_${this.x+1}_${this.y}`).hasClass('player1')
      ||$(`#square_${this.x+1}_${this.y}`).hasClass('player2')){
      return true;
    }
    }else if (direction == 'w'){
      if ($(`#square_${this.x-1}_${this.y}`).hasClass('player1')
      ||$(`#square_${this.x-1}_${this.y}`).hasClass('player2')){
      return true;
    }
    }else if (direction == 's'){
      if ($(`#square_${this.x}_${this.y-1}`).hasClass('player1')
      ||$(`#square_${this.x}_${this.y-1}`).hasClass('player2')){
      return true;
    }
    }else {
      return false;
    }
  }
  move(direction){
    if (this.willHitPlayer(direction)){
      this.player.score++;
      console.log(this.player.score);
    }
    if (this.willCollide(direction)){
      $(`#square_${this.x}_${this.y}`).removeClass(`bullet`);
      this.x = null;
      this.y = null;
    }
    if (direction == 'n' && !this.willCollide('n')){
      $(`#square_${this.x}_${this.y}`).removeClass(`bullet`);
      this.y++;
      this.facing = 'n';
    }
    if (direction == 'e' && !this.willCollide('e')){
      $(`#square_${this.x}_${this.y}`).removeClass(`bullet`);
      this.x++;
      this.facing = 'e';
    }
    if (direction == 's' && !this.willCollide('s')){
      $(`#square_${this.x}_${this.y}`).removeClass(`bullet`);
      this.y--;
      this.facing = 's';
    }
    if (direction == 'w' && !this.willCollide('w')){
      $(`#square_${this.x}_${this.y}`).removeClass(`bullet`);
      this.x--;
      this.facing = 'w';
    }
  }
}
const create_players = () => {
  player1 = new Player (10,10,'n',1);
  player2 = new Player (20,20,'n',2);
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
  if (movetick == true){
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
    }if (keys_down[13]){
      player1.fire(player1.facing);
    }if (keys_down[32]){
      player2.fire(player2.facing);
    }
  }
}


create_board();
create_players();
create_key_events();

const do_tick_loop = () => {
  movetick = !movetick;
  do_bullet_movement();
  do_player_movement();
  update_board();
}
const do_bullet_movement = () => {
  for (i = 0;i<bullets.length;i++){
    bullets[i].move(bullets[i].facing);
  }
}
let tick_loop = setInterval(do_tick_loop,40);
const update_board = () => {
  for (i = 0;i<bullets.length;i++){
    $(`#square_${bullets[i].x}_${bullets[i].y}`).addClass("bullet");
  }
  console.log('tick');
  $(`#square_${player1.x}_${player1.y}`).addClass("player1");
  $(`#square_${player2.x}_${player2.y}`).addClass("player2");
  $(`#info_player1`).html(`player1: ${player1.score}`);
  $(`#info_player2`).html(`player2: ${player2.score}`);
}
