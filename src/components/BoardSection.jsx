import { Square } from "./square"
export function BoardSection({board, updateBoard}) {
    return (
        <section className="game">
      {
        board.map((square, index) => {
          return (
            <Square 
              key={index} // mejor siempre el identificador unico
              index={index}
              updateBoard={updateBoard} // le pasamos la funcion, no la ejecucion (), para que se ejecute
              // cuando queramos, no cada vez que se renderiza
              >
                {square}
              </Square>
          )
        })
      }
    </section>
    )
}