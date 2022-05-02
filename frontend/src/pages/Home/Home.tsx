import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import { Loader } from "../../components/Loader"
import React, { useEffect, useState } from "react"
import { ReactIntlErrorCode } from "react-intl"

export const Home = () => {
  interface Pokemon {
    name: string
    id: number
  }

  interface PokemonInfo {
    id: number
    name: string
    height: number
    weight: number
  }

  const [pokemonFilterValue, setFilterValue] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pokemonList, updatePokemonList] = React.useState<PokemonInfo[]>([])

  const filterPokemonsByName = (pokemons: Pokemon[], name: string) => {
    const filteredList = pokemons.filter(pokemon => pokemon.name.includes(name))
    return filteredList
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const filteredList = filterPokemonsByName(pokemonList, pokemonFilterValue)
  const fetchPokemons = () => {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } }).then(response =>
      response.json(),
    )
  }

  useEffect(() => {
    fetchPokemons().then(pokemonData => updatePokemonList(pokemonData))
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <input className={styles.input} onChange={onInputChange} value={pokemonFilterValue} />

      {isLoading ? (
        <Loader />
      ) : (
        filteredList.map(({ name, id }) => {
          return <Pokemon name={name} number={id} key={id} />
        })
      )}
    </div>
  )
}
