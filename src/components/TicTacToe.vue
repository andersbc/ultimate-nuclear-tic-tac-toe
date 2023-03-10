<template>
  <div class="tictactoe">
    <div class="board">
      <!-- for each row in game board -->
      <template v-for="(row, rowIndex) in board" v-bind:key="rowIndex">
        <!-- for each col in row -->
        <div
          v-for="(col, colIndex) in row"
          v-bind:key="colIndex"
          class="board-field"
          :class="[board[rowIndex][colIndex] ? 'board-field-occupied' : '']"
          @click="handleFieldClicked(rowIndex, colIndex)"
        >
          {{ board[rowIndex][colIndex] }}
        </div>
      </template>
    </div>
    <div class="announcement" v-if="gameOver">
      <h2 v-if="theWinner !== ''" class="winner">Boom. {{ theWinner }} won!</h2>
      <h2 v-else class="winner">Game over. It was a draw</h2>
    </div>
    <div class="restart" v-if="gameOver">
      <button
        :class="[theWinner ? 'restart-btn' : 'restart-btn-draw']"
        @click="startNewGame"
      >
        restart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TicTacToeGame } from "@/game/TicTacToeGame";
import useEmitter from "@/composables/useEmitter";

const emitter = useEmitter();

let game: TicTacToeGame;
const emptyBoard: string[][] = [[]];

const board = ref(emptyBoard);
const theWinner = ref("");
const gameOver = ref(false);
const gameStarted = ref(false);

onMounted(() => {
  startNewGame();
});

/**
 * Starts a new game
 */
const startNewGame = () => {
  // reset
  gameOver.value = false;
  gameStarted.value = true;
  theWinner.value = "";

  game = new TicTacToeGame();
  emitter.emit("gameStarted", true);
  updateBoard(game.getBoard());
};

/**
 * Updates the visual board
 * @param boardVal
 */
const updateBoard = (boardVal: string[][]) => {
  board.value = [...boardVal];
};

/**
 * Sets a winner and ends the game
 * If the argument is an empty string, nothing will be done
 *
 * @param winner
 */
const setWinner = (winner: string) => {
  if (winner === "") return;
  theWinner.value = winner;
  emitter.emit("winner", winner);
  endGame();
};

/**
 * Checks if the board has empty values
 * (i.e. if moves can still be performed)
 * @param board
 */
const hasEmptyValues = (board: string[][]) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") return true;
    }
  }
  return false;
};

/**
 * Ends the game
 */
const endGame = () => {
  gameOver.value = true;
  gameStarted.value = false;
};

/**
 * Handles a field click
 * @param row
 * @param col
 */
const handleFieldClicked = (row: number, col: number) => {
  if (!gameStarted.value || gameOver.value) return;

  const isValidMove = game.play(row, col);
  if (!isValidMove) return;

  updateBoard(game.getBoard());
  const winner = game.getWinner(); // will be empty str if no winner yet
  setWinner(winner);

  // Check if it is a draw
  if (!hasEmptyValues(game.getBoard()) && winner === "") {
    endGame();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board {
  display: inline-grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 3px;
}

.board-field {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  font-size: 3em;
  cursor: pointer;
  border-radius: 3%;
  background-color: rgba(0, 0, 0, 0.02);
}

.board-field:hover {
  background-color: transparent;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.board-field-occupied {
  background-color: rgba(0, 0, 0, 0.08);
  cursor: default;
  box-shadow: none;
}

.board-field.board-field-occupied:hover {
  background-color: rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.announcement {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

.winner {
  font-size: 42px;
  webkit-text-stroke: #ff0404;
  -webkit-text-stroke-width: thin;
}

.restart {
}

.restart-btn {
  font-size: 24px;
  color: white;
  font-weight: bold;
  border-radius: 5%;
  padding: 8px 30px;
  border: 4px solid #ffffff;
  overflow: hidden;
  background: transparent; /* Change it to transparent */
  /* remove background-opacity */
  cursor: pointer;
}

.restart-btn-draw {
  font-size: 24px;
  color: rgb(0, 0, 0);
  font-weight: bold;
  border-radius: 5%;
  padding: 8px 30px;
  border: 4px solid #000000;
  overflow: hidden;
  background: transparent; /* Change it to transparent */
  /* remove background-opacity */
  cursor: pointer;
}

#restart-btn:hover,
.restart-btn-draw:hover {
  background-color: rgba(1, 256, 1, 0.4);
}
</style>
