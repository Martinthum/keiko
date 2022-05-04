import { Link } from "react-router-dom"
import { Animate } from "../Animate"
import { ThemeContext } from "../../pages/Home"

interface Props {
  name: string
  number: number
  height: number
  weight: number
}
const PokemonComponent = ({ name, number, height, weight }: Props) => {
  const capitalizeFirstLetter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <div className="pokemon">
      <br></br>
      <p>{capitalizeFirstLetter(name)}</p>
      <Link to={`/pokemon/${number}`}>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}></img>
      </Link>
      <p>Number: {number}</p>
      <p>Height: {height} cm</p>
      <p>Weight: {weight} kg</p>v<ThemeContext.Consumer>{value => value}</ThemeContext.Consumer>
    </div>
  )
}

export const Pokemon = Animate<Props>(PokemonComponent)
