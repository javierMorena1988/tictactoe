import {useState} from "react"

// Lo primero que vamos a crear son los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}

// Lo segundo, vamos a crear el tablero

// const board = Array(9).fill(null) // Lo metemos dentro de la funcion App y lo usamos como un estado

// Vamos a crear el cuadrado del tablero, el componente Square:
// children: lo que tiene que tener dentro del tablero X o O
// updateBoard: una forma de actualizar el tablero
// index: 

const Square = ({ children, isSelected,  updateBoard, index}) => {
  const className= `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

// Todas las combinaciones ganadoras (TODO: estudiar como hacerlo más óptimo)
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  //const board = Array(9).fill(null) // Cada vez que cambie, va a volver a renderizar el componente
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // ¿Cómo sabemos si tenemos un ganador? Con un nuevo estado
  const [winner, setWinner] = useState(null) // null: no hay ganador. false: empate
  // en winner podríamos usar un enum igual que en TURNS

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

  const updateBoard = (index) => {

    // no actualizamos esta posición si ya tiene algo
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board] // no se muta nunca las props ni el estado, hay que crear un nuevo array
    // Puede haber problemas de renderizado, discrepancias. Siempre tiene que ser algo nuevo si lo has modificado
    // [...board] -> Copia Superficial. StructureClone(board) -> Copia profunda del array
    newBoard[index] = turn // asi, el usuario que tenia turno e hizo click en esa posicion, tenddrá X o O
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn) // estamos cambiando el turno
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
      // Como la actualizacion de los estados es asincrono, sale el alert antes que el X o O 
      // alert('el ganador es ' + newWinner)
    } // chekear el empate
  }

  console.log(board)
  return (
  <main className="board">
  <h1>Tic tac toe</h1>
    <section className="game">
      {
        board.map((_, index) => {
          return (
            <Square 
              key={index} // mejor siempre el identificador unico
              index={index}
              updateBoard={updateBoard} // le pasamos la funcion, no la ejecucion (), para que se ejecute
              // cuando queramos, no cada vez que se renderiza
              >
                {board[index]}
              </Square>
          )
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  </main>
  )
}

export default App