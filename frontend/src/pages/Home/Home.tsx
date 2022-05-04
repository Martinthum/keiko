import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import { Loader } from "../../components/Loader"
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
export const ThemeContext = React.createContext("light")

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
  const [filteredList, updateFilteredList] = React.useState<PokemonInfo[]>([])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  const params = useParams()
  const page = params.page || ""

  const pageup: boolean = parseInt(page) < 10
  const pagedown: boolean = parseInt(page) > 0

  useEffect(() => {
    const filterPokemonsByName = (pokemons: PokemonInfo[], name: string) => {
      updateFilteredList(pokemons.filter(pokemon => pokemon.name.includes(name)))
    }
    filterPokemonsByName(pokemonList, pokemonFilterValue)
  }, [pokemonFilterValue, pokemonList])

  useEffect(() => {
    const fetchPokemons = async () => {
      const url = "http://localhost:8000/pokemons?page=" + page
      console.log(url)
      const response = await fetch(url, { headers: { accept: "application/json" } })
      /*throw new Error("oh, no!")*/
      setIsLoaded(true)
      return response.json()
    }
    fetchPokemons()
      .catch(() => console.log("arg"))
      .then(pokemonData => {
        updatePokemonList(pokemonData)
        updateFilteredList(pokemonData)
      })
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
      <ThemeContext.Provider value="dark">
        <div className="pokedex">
          {isLoading ? (
            <Loader />
          ) : isLoaded ? (
            filteredList.map(({ name, id, height, weight }) => {
              return (
                <div className="pokedexBox" key={id}>
                  <Pokemon name={name} number={id} height={height} weight={weight} />
                </div>
              )
            })
          ) : (
            <p>Erreur de chargement</p>
          )}
        </div>
      </ThemeContext.Provider>
    </div>
  )
}
