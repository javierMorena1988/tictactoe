import {useState} from "react"

import { TURNS } from "./const/const"
import { checkWinnerFrom } from "./logic/board"

import { WinnerModal } from "./components/WinnerModal"
import { BoardSection } from "./components/BoardSection"
import { SelectedSection } from "./components/SelectedSection"
import { checkEndGame } from "./logic/board"



function App() {
  // console.log(winner)
  
  //const board = Array(9).fill(null) // Cada vez que cambie, va a volver a renderizar el componente
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // ¿Cómo sabemos si tenemos un ganador? Con un nuevo estado
  const [winner, setWinner] = useState(null) // null: no hay ganador. false: empate
  // en winner podríamos usar un enum igual que en TURNS

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board] // no se muta nunca las props ni el estado, hay que crear un nuevo array
    // Puede haber problemas de renderizado, discrepancias. Siempre tiene que ser algo nuevo si lo has modificado
    // [...board] -> Copia Superficial. StructureClone(board) -> Copia profunda del array
    newBoard[index] = turn // asi, el usuario que tenia turno e hizo click en esa posicion, tenddrá X o O
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) // estamos cambiando el turno
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard) 
    // le pasamos el nuevo valor (newBoard y no board) porque si no, 
    // nos dejaría hacer una jugada más
    if(newWinner) {
      setWinner(newWinner)
      // console.log(newWinner)
      // Como la actualizacion de los estados es asincrono, sale el alert antes que el X o O 
      // alert('el ganador es ' + newWinner)
    } // chekear el empate
    else if(checkEndGame(newBoard)){
      // Vamos a ver qué hace si es empate
      console.log(winner)
      setWinner(false)
      // alert('el ganador es ' + winner) es null
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
  }

  return (
  <main className="board">
  <h1>Tic tac toe</h1>
    <section className="square" onClick={(resetGame)}>Reset del juego</section>

  {/* Sección del tablero */}
    <BoardSection
      board={board}
      updateBoard={updateBoard}
    />

{/* Sección del turno */}
    <SelectedSection  turn={turn}/>

 {/* Sección de la modal */}
    <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  )
}

export default App

// voy por: https://youtu.be/qkzcjwnueLA?si=IBcj2F8nt9yfhPBF&t=5380