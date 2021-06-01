import { omit } from 'lodash'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Modal from '../common/Modal'
import { pop } from '../common/stylevars'

import * as SC from './components'
import golfGreen from '../common/assets/green.png';
import Container from '../common/Container'
import PlayerSelectionModal from './PlayerSelectionModal'

export default function Setup() {

  const [state, setState] = useState({
    firstHole: 1,
    lastHole: 18,
    teeboxWomen: 'red',
    teeboxMen: 'yellow'
  })

  const history = useHistory()
  const [players, setPlayer] = useState<{[id: string]: {firstName: string, lastName: string, id: string, hcp: number}}>({})
  const [teeModalType, setTeeModal] = useState<void | string>(undefined)
  const [playerModalVisible, setPlayerModal] = useState<boolean>(false)
  
  const playersArray = Object.values(players)

  const toggleTeeModal = (teeboxType: string | void) => () => setTeeModal(teeboxType)
  
  const setValue = (...args: [string, any][]) => () => setState((state) =>
    args.reduce((acc, [path, value]) => ({
    ...acc,
    [path]: value
    }), state))
  
  const setTeeColor = (path: any, value: any) => () => {
    setValue([path, value])()
    toggleTeeModal()()
  }
  
  const togglePlayerSelection = () => {
    setPlayerModal(state => !state)
  }
  
  const removePlayer = (id: string) => {
    setPlayer((state) => omit(state, id))
  }
  
  const addPlayer = (player: any) => {
    if (playersArray.length >= 4) {

      return
    }

    setPlayer((state) => ({...state, [player.id]: player}))
  }

  const beginRound = () => {
    console.log('Async call, Starting round...')
    history.push('/round')
  }

  return (
    <>
    <PlayerSelectionModal
      toggleVisible={togglePlayerSelection}
      visible={playerModalVisible}
      addPlayer={addPlayer}
      removePlayer={removePlayer}
      players={playersArray}
      />
      <SC.Hero>
          <h2>Golf Pirkkala</h2>
          <h4>Vanha kenttä</h4>
        <p>Stroke play individual, {state.lastHole - state.firstHole + 1} holes</p>
      </SC.Hero>
      <Container>
      <Modal visible={!!teeModalType}>
          <SC.ModalContainer>
            <SC.TeeColorButton color="white" active={state.teeboxMen === "white"} onClick={setTeeColor(teeModalType, 'white')} />
            <SC.TeeColorButton color="yellow" active={state.teeboxMen === "yellow"} onClick={setTeeColor(teeModalType, 'yellow')} />
            <SC.TeeColorButton color="blue" active={state.teeboxMen === "blue"} onClick={setTeeColor(teeModalType, 'blue')} />
            <SC.TeeColorButton color="red" active={state.teeboxMen === "red"} onClick={setTeeColor(teeModalType, 'red')} />
          </SC.ModalContainer>
        </Modal>
      <SC.RoundInfoCard>
        <SC.SetupRow>
          <SC.TeeContainer>
          <SC.MaleIcon /><SC.TeeIcon />
          <SC.TeeThumbnail onClick={toggleTeeModal("teeboxMen")} color={state.teeboxMen}/>
          </SC.TeeContainer>
          <SC.TeeContainer>
          <SC.FemaleIcon /><SC.TeeIcon />
          <SC.TeeThumbnail onClick={toggleTeeModal("teeboxWomen")} color={state.teeboxWomen}/>
          </SC.TeeContainer>
        </SC.SetupRow>
        <SC.Divider />
        <SC.SetupRow>
          <SC.RadioItem color={pop} active={state.firstHole === 1 && state.lastHole === 9} onClick={setValue(['firstHole', 1], ['lastHole', 9])}>Front 9</SC.RadioItem>
          <SC.RadioItem color={pop} active={state.firstHole === 10 && state.lastHole === 18} onClick={setValue(['firstHole', 10], ['lastHole', 18])}>Back 9</SC.RadioItem>
          <SC.RadioItem color={pop} active={state.firstHole === 1 && state.lastHole === 18} onClick={setValue(['firstHole', 1], ['lastHole', 18])}>Full 18</SC.RadioItem>
        </SC.SetupRow>
      </SC.RoundInfoCard>
      <SC.GroupContainer>
        {playersArray.map((player, i) => {
          return (
            <SC.GroupCell key={`player${i}`}>
              <SC.PlayerInfo>
              <p>
                {player.firstName} {player.lastName}
              </p>
              <p>
                HCP {player.hcp}
              </p>
              </SC.PlayerInfo>
              <SC.UndoWing onClick={() => removePlayer(player.id)}>
                <SC.TrashIcon />
              </SC.UndoWing>
            </SC.GroupCell>
          )
        })}
        {playersArray.length < 4 &&
          <SC.GroupCell onClick={togglePlayerSelection}>
            <SC.PlusIcon />
          </SC.GroupCell>
        }
      </SC.GroupContainer>
      <SC.GoButton onClick={beginRound}>
        {/* <TeeIcon color={pop} /> */}
        <SC.GreenImg src={golfGreen} alt="Go!"/>
      </SC.GoButton>
    </Container>
    </>
  )
}