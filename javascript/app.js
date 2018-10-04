let movetick = true;
let keys_down = {};
let bullets = [];
let bullets_fired = 0;
let player1;
let player2;
let bomb_timer = 0;
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
  lay_bomb(){
    $(`#square_${this.x}_${this.y}`).addClass('bomb');
    $(`#square_${this.x+1}_${this.y}`).addClass('bomb');
    $(`#square_${this.x-1}_${this.y}`).addClass('bomb');
    $(`#square_${this.x+1}_${this.y+1}`).addClass('bomb');
    $(`#square_${this.x}_${this.y+1}`).addClass('bomb');
    $(`#square_${this.x-1}_${this.y+1}`).addClass('bomb');
    $(`#square_${this.x+1}_${this.y-1}`).addClass('bomb');
    $(`#square_${this.x}_${this.y-1}`).addClass('bomb');
    $(`#square_${this.x-1}_${this.y-1}`).addClass('bomb');
    bomb_timer = 60;
  }
  lay_wall(){
    $(`#square_${this.x}_${this.y}`).addClass('wall');
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
    }if (keys_down[220]){
      player1.lay_bomb();
    }if (keys_down[81]){
      player2.lay_bomb();
    }if (keys_down[69]){
      player2.lay_wall();
    }if (keys_down[221]){
      player1.lay_wall();
    }
  }
}
const do_tick_loop = () => {
  if(bomb_timer > 0){
    bomb_timer--;
  }else{
    if($(`#square_${player1.x}_${player1.y}`).hasClass('bomb')){
      player2.score += 10;
    }if($(`#square_${player2.x}_${player2.y}`).hasClass('bomb')){
      player1.score += 10;
    }
    $('.bomb').addClass('explosion');
    $('.bomb').removeClass('bomb wall');
    setTimeout(() => {$(`.explosion`).addClass('smoke');$('.explosion').removeClass('explosion');},500);
    setTimeout(()=>{$('.smoke').removeClass('smoke')},7000);
  }
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
  $(`#square_${player1.x}_${player1.y}`).addClass("player1");
  $(`#square_${player2.x}_${player2.y}`).addClass("player2");
  $(`#info_player1`).html(`player1: ${player1.score}`);
  $(`#info_player2`).html(`player2: ${player2.score}`);
}
const clear_board = () => {
  $('#gameboard').html("");
  player1 = null;
  player2 = null;
  game_init();
}
const board_1 = () => {
  clear_board();
  $('#square_5_35').addClass('wall');
  $('#square_6_35').addClass('wall');
  $('#square_7_35').addClass('wall');
  $('#square_8_35').addClass('wall');
  $('#square_5_34').addClass('wall');
  $('#square_5_33').addClass('wall');
  $('#square_5_32').addClass('wall');
  $('#square_34_35').addClass('wall');
  $('#square_33_35').addClass('wall');
  $('#square_32_35').addClass('wall');
  $('#square_31_35').addClass('wall');
  $('#square_34_34').addClass('wall');
  $('#square_34_33').addClass('wall');
  $('#square_34_32').addClass('wall');
  for(i=5;i<36;i++){
    $(`#square_${i}_6`).addClass('wall');
  }
  $('#square_7_7').addClass('wall');
  $('#square_7_8').addClass('wall');
  $('#square_7_9').addClass('wall');
  $('#square_7_10').addClass('wall');
  $('#square_7_11').addClass('wall');
  $('#square_33_7').addClass('wall');
  $('#square_33_8').addClass('wall');
  $('#square_33_9').addClass('wall');
  $('#square_33_10').addClass('wall');
  $('#square_33_11').addClass('wall');
  for(i=14;i<25;i++){
    $(`#square_${i}_31`).addClass('wall');
    $(`#square_${i}_14`).addClass('wall');
  }
  for(i=14;i<28;i++){
    $(`#square_24_${i}`).addClass('wall');
  }
  for(i=31;i>17;i--){
    $(`#square_14_${i}`).addClass('wall');
  }
}
const board_2 = () => {
  clear_board();
  player2.x++;
  for(i=0;i<40;i++){
    $(`#square_${i}_${i+1}`).addClass('wall');
    $(`#square_${40-i}_${i}`).addClass('wall');
  }
  $('#square_20_20').removeClass('wall');
  $('#square_19_20').removeClass('wall');
  $('#square_20_21').removeClass('wall');
  $('#square_19_21').removeClass('wall');
}
const board_3 = () => {
  clear_board();
  player1.y++;
  i=1;
  j=37;
  while(!$(`#square_${i+3}_${j}`).hasClass('wall') ||
    !$(`#square_${i}_${j-3}`).hasClass('wall') ||
    !$(`#square_${i-3}_${j}`).hasClass('wall') ||
    !$(`#square_${i}_${j+3}`).hasClass('wall')){

    while (!$(`#square_${i+3}_${j}`).hasClass('wall')){
      $(`#square_${i}_${j}`).addClass('wall');
      i++;
    }
    while (!$(`#square_${i}_${j-3}`).hasClass('wall')){
      $(`#square_${i}_${j}`).addClass('wall');
      j--;
    }
    while (!$(`#square_${i-3}_${j}`).hasClass('wall')){
        $(`#square_${i}_${j}`).addClass('wall');
        i--;
    }
    while (!$(`#square_${i}_${j+3}`).hasClass('wall')){
        $(`#square_${i}_${j}`).addClass('wall');
        j++;
    }
  }
}
const create_buttons = () =>{
  $('#levelselect').html("");
  $('#levelselect').append('<button id="clear_board">Clear Board</button>');
  $('#clear_board').on('click', clear_board);
  $('#levelselect').append('<button id="level_1">Level 1</button>');
  $('#level_1').on('click', board_1);
  $('#levelselect').append('<button id="level_2">Level 2</button>');
  $('#level_2').on('click', board_2);
  $('#levelselect').append('<button id="level_3">Level 3</button>');
  $('#level_3').on('click', board_3);
}
const game_init = () => {
  create_buttons();
  create_board();
  create_players();
  create_key_events();
}
game_init();
