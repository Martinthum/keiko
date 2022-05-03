import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { PokemonDetails } from "../../components/PokemonDetails"

export const Pokemon = () => {
  interface PokemonInfo {
    id: number
    name: string
    height: number
    weight: number
  }

  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [pokemonData, updatePokemonData] = useState<PokemonInfo>({ id: 0, name: "", height: 0, weight: 0 })

  const fetchPokemon = async () => {
    const response = await fetch("http://localhost:8000/pokemon/" + params.id, {
      headers: { accept: "application/json" },
    })
    /*throw new Error("oh, no!")*/
    setIsLoaded(true)
    return response.json()
  }

  useEffect(() => {
    fetchPokemon()
      .catch(() => console.log("arg"))
      .then(pokemonData => updatePokemonData(pokemonData))
    setTimeout(() => setIsLoading(false), 100)
  }, [])

  const params = useParams()
  return (
    <div className="pokemonContainer">
      {isLoaded ? (
        <PokemonDetails
          name={pokemonData.name}
          number={pokemonData.id}
          height={pokemonData.height}
          weight={pokemonData.weight}
          key={pokemonData.id}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}
