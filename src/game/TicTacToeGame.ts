/**
 * Tic Tac Toe game logic written by
 * ChatGPt3 AI https://openai.com/blog/chatgpt/
 *
 * January 2023
 */

class TicTacToeGame {
  private board: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  private currentPlayer = "X";

  private readonly playerX: string = "X";
  private readonly playerO: string = "O";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public play(row: number, col: number): boolean {
    if (!this.board[row][col]) {
      this.board[row][col] = this.currentPlayer;

      if (this.currentPlayer === this.playerX) {
        this.currentPlayer = this.playerO;
      } else {
        this.currentPlayer = this.playerX;
      }

      return true;
    }

    return false;
  }

  public getBoard(): string[][] {
    return this.board;
  }

  public getCurrentPlayer(): string {
    return this.currentPlayer;
  }

  public getWinner(): string {
    // check rows
    for (const row of this.board) {
      if (row[0] === row[1] && row[1] === row[2]) {
        return row[0];
      }
    }

    // check columns
    for (let col = 0; col < this.board.length; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col]
      ) {
        return this.board[0][col];
      }
    }

    // check diagonals
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return this.board[0][0];
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return this.board[0][2];
    }

    return "";
  }
}

/*
Example usage (also by ChatGpt3):

const game = new TicTacToe();

game.play(0, 0); // returns true
game.play(0, 1); // returns true
game.play(0, 2); // returns true

console.log(game.getBoard()); // prints the current state of the board
console.log(game.getCurrentPlayer()); // prints the current player
console.log(game.getWinner()); // prints the winner

*/

export { TicTacToeGame };
