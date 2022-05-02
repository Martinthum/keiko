import styles from "./Home.module.css"

interface Pokemon {
  name: string
  number: number
  url: string
}

const carapuce: Pokemon = {
  name: "Carapuce",
  number: 7,
  url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
}

export const Home = () => {
  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <div>
        <img src={carapuce.url}></img>
        <p>Name : {carapuce.name}</p>
        <p>Number : {carapuce.number}</p>
      </div>
    </div>
  )
}
