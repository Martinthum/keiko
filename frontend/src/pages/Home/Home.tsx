import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import { Loader } from "../../components/Loader"
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export const Home = () => {
  interface PokemonInfo {
    id: number
    name: string
    height: number
    weight: number
  }

  const [pokemonFilterValue, setFilterValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [pokemonList, updatePokemonList] = React.useState<PokemonInfo[]>([])

  const filterPokemonsByName = (pokemons: PokemonInfo[], name: string) => {
    updatePokemonList(pokemons.filter(pokemon => pokemon.name.includes(name)))
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
    filterPokemonsByName(pokemonList, pokemonFilterValue)
  }

  const params = useParams()
  const page: string = params.page || ""
  const pageup: boolean = parseInt(page) < 10
  const pagedown: boolean = parseInt(page) > 0

  const fetchPokemons = async () => {
    const url = "http://localhost:8000/pokemons?page=" + page
    console.log(url)
    const response = await fetch(url, { headers: { accept: "application/json" } })
    /*throw new Error("oh, no!")*/
    setIsLoaded(true)
    return response.json()
  }

  useEffect(() => {
    fetchPokemons()
      .catch(() => console.log("arg"))
      .then(pokemonData => updatePokemonList(pokemonData))
    setTimeout(() => setIsLoading(false), 100)
  }, [page])

  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <input className={styles.input} onChange={onInputChange} value={pokemonFilterValue} />
      <h1>Pokédex</h1>
      {pagedown ? <Link to={`/pokedex/${+page - 1}`}>←</Link> : <div></div>}
      {pageup ? <Link to={`/pokedex/${+page + 1}`}>→</Link> : <div></div>}

      <div className="pokedex">
        {isLoading ? (
          <Loader />
        ) : isLoaded ? (
          pokemonList.map(({ name, id, height, weight }) => {
            return <Pokemon name={name} number={id} height={height} weight={weight} key={id} />
          })
        ) : (
          <p>Erreur de chargement</p>
        )}
      </div>
    </div>
  )
}
