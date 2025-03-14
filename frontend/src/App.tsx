import { BrowserRouter as Router, Routes, Route  } from "react-router-dom"

import Home from "./pages/Home"
import Layout from "./layouts/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./routes/ProtectedRoute"
import Account from "./pages/Account"
import Place from "./pages/Place"

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/places/:id" element= {<Place />} />
            <Route 
              path="/account/:subpage?"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
        </Route>
      </Routes>
    </Router>
    
  )
}
