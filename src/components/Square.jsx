// Lo segundo, vamos a crear el tablero

// const board = Array(9).fill(null) // Lo metemos dentro de la funcion App y lo usamos como un estado

// Vamos a crear el cuadrado del tablero, el componente Square:
// children: lo que tiene que tener dentro del tablero X o O
// updateBoard: una forma de actualizar el tablero
// index: 

export const Square = ({ children, isSelected,  updateBoard, index}) => {
    
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