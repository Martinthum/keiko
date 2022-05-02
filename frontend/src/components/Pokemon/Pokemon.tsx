interface Props {
  name: string
  number: number
}

export const Pokemon = ({ name, number }: Props) => (
  <div>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}></img>
    <p>Name : {name}</p>
    <p>Number : {number}</p>
  </div>
)
