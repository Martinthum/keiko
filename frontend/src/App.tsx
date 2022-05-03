import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Root } from "./components/Root"
import { Home } from "./pages/Home"
import { Pokemon } from "./pages/Pokemon"

export const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </Root>
  )
}
