import './App.css'
import { Route, Routes } from 'react-router-dom'
import IdentificationPage from './pages/IdentificationPage'
import LobbyPage from './pages/LobbyPage'
import GamePlayPage from './pages/GamePlayPage'
import VotingPage from './pages/VotingPage'
import ScorePage from './pages/ScorePage'
import { createContext, useReducer } from 'react'
import { socket } from './main'
import FinalScorePage from './pages/FinalScorePage'

const initialState: any = {
  player: {
    id: null,
    name: null
  },
  lobby: {
    messages: []
  },
  currentRound: {
    letter: null
  },
  scores: []
}

export const AppContext = createContext(initialState)

const appReducer = (state: any, action: { type: string, payload: any }) => {
  console.log('payload', action.payload)
  switch (action.type) {
    case 'APP_ENTER':
      return {
        ...state,
        player: action.payload.player
      }
    case 'APP_START_ROUND':
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          letter: action.payload.letter
        }
      }
    case 'APP_LOBBY_SEND_MESSAGE':
      return {
        ...state,
        lobby: {
          ...state.lobby,
          messages: [...state.lobby.messages, action.payload.message]
        }
      }
    case 'ROUND_FINISHED':
    case 'LAST_ROUND_FINISHED':
      return {
        ...state,
        currentRound: {
          letter: null
        },
        scores: action.payload.scores
      }
    default:
      return state
  }
}

function App() {
  const [app, setApp] = useReducer(appReducer, initialState)

  console.log('state', app)

  return (
    <div style={{ height: "100%" }}>
      <AppContext.Provider value={{ app, setApp }}>
        <Routes>
          <Route path='/' element={<IdentificationPage />} />
          <Route path='/lobby/' element={<LobbyPage />} />
          <Route path='/gameplay' element={<GamePlayPage />} />
          <Route path='/voting' element={<VotingPage />} />
          <Route path='/score' element={<ScorePage />} />
          <Route path='/final-score' element={<FinalScorePage />} />
        </Routes>
      </AppContext.Provider>
    </div>

  )
}

export default App
