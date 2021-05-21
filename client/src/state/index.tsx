import {update, PropertyPath, get} from 'lodash'
import React, { ReactNode, useContext, useState } from 'react'

/* STATE TYPES */

export type Round = {
  currentHole: number,
  currentPlayer: string,
  players: {[id: string]: Player},
  scoresByHole: {[holeIndex: string]: {[playerId: string]: number}},
  currentStroke: number,
  strokeSelectorPristine: boolean,
  holeSelectorPristine: boolean,
  playerSelectorPristine: boolean
}

export type Player = {
  id: string,
  tee: string,
  handicap: number,
  firstName: string,
  lastName: string,
  strokes: number,
  hcpRound: boolean,
  score: string | number
}

export interface State {
  round: Round
}

export const holes = [
  {
    number: 9,
    par: 4
  },
  {
    number: 10,
    par: 5
  },
  {
    number: 11,
    par: 3
  },
  {
    number: 12,
    par: 4
  },
  {
    number: 13,
    par: 4
  },
  {
    number: 14,
    par: 3
  },
]

export const players: Player[] = [
  {
    id: "01",
    firstName: "Tim",
    lastName: "OnValkeamerilaakso",
    tee: "white",
    handicap: 33,
    hcpRound: false,
    score: 0,
    strokes: 0
  },
  {
    id: "02",
    firstName: "Heikki",
    lastName: "Mällinen",
    tee: "white",
    handicap: 33,
    hcpRound: false,
    score: 0,
    strokes: 0
  },
  {
    id: "03",
    firstName: "Pallis-Pekka-Kulleriina",
    lastName: "Ruokanen",
    tee: "white",
    handicap: 33,
    hcpRound: false,
    score: 0,
    strokes: 0
  },
  {
    id: "04",
    firstName: "Petriina",
    lastName: "Konstanen",
    tee: "white",
    handicap: 33,
    hcpRound: false,
    score: 0,
    strokes: 0
  }
]

export const initialState: State = {
  round: {
    scoresByHole: holes.reduce((acc, hole, i) => ({...acc, [i]: {}}), {}) as {[holeIndex: string]: {[playerId: string]: number}},
    players: players.reduce((acc, player) => ({...acc, [player.id]: player}), {}),
    currentHole: 0,
    currentPlayer: "01",
    currentStroke: holes[0].par,
    strokeSelectorPristine: true,
    holeSelectorPristine: true,
    playerSelectorPristine: true
  }
}

/* UTILITY TYPES */

export type Reducer<T> = (state: T) => T

export type ReduceState = <T>(path: PropertyPath | void, payload: Reducer<T>) => void

type UseAppStateR = [State, ReduceState]

/* HERE'S THE DEAL */

// Context where the application state lives
const StateContext = React.createContext<UseAppStateR>([
  initialState,
  (path, reducer) => {/*noop*/}
])

// A custom hook used to access StateProvider's tooling
export function useAppState() {
  return useContext(StateContext)
}

// State provider, exposing application state and means to easily reduce it anywhere.
export const StateProvider = ({children}: {children: ReactNode}) => {

  const [state, setState] = useState(initialState)

  // With this, any part of the state is easily reducable with zero boilerplate. Exposed via this provider.
  function reduceState(path: PropertyPath | void, reducer: (state: any) => any) {


    return setState((state) => {

      const stateToReduce = path ? {...get(state, path)} : {...state}

      const payload = reducer(stateToReduce)

      const updatedState: State = path ? update({...state}, path, () => payload) : payload

      return updatedState
    })
  }

  return (
    <StateContext.Provider value={[state, reduceState]}>
      {children}
    </StateContext.Provider>
  )
}
