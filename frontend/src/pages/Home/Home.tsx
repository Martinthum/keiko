import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"

export const Home = () => {
  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <Pokemon name="Carapuce" number={7} />
      <Pokemon name="Carabaffe" number={8} />
      <Pokemon name="Tortank" number={9} />
    </div>
  )
}
