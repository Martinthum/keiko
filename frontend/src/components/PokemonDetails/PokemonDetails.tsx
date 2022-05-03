interface Props {
  name: string
  number: number
  height: number
  weight: number
}

const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const PokemonDetails = ({ name, number, height, weight }: Props) => (
  <div className="pokemonDetails">
    <br></br>
    <p>{capitalizeFirstLetter(name)}</p>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}></img>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${number}.png`}></img>
    <br></br>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${number}.png`}></img>
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${number}.png`}
    ></img>
    <p>Number: {number}</p>
    <p>Height: {height} cm</p>
    <p>Weight: {weight} kg</p>
  </div>
)
