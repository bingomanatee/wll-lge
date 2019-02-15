var Chess = require('chess.js').Chess;
var chess = new Chess();
let boards = [];
while (!chess.game_over()) {
  boards.push(chess.fen());
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
boards.push(chess.fen());
