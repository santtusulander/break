import { omit } from 'lodash'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {v4} from 'uuid'
import styled from "styled-components"
import Modal from '../common/Modal'
import PulseButton from '../common/PulseButton'
import RadioButton from "../common/RadioButton"
import { persimon, pop, loafer, silver } from '../common/stylevars'

import { ReactComponent as Female } from '../common/assets/female.svg';
import { ReactComponent as Male } from '../common/assets/male.svg';
import { ReactComponent as Tee } from '../common/assets/tee.svg';
import { ReactComponent as Trash } from '../common/assets/trash.svg';
import { ReactComponent as Plus } from '../common/assets/plus.svg';
import golfGreen from '../common/assets/green.png';
import Card from '../common/Card'
import Container from '../common/Container'

const Hero = styled.div`
  overflow: auto;
  padding: 20px;
  background: ${pop};
  color: ${loafer};
  h2 {
    margin: 0;
  }
  h4 {
    margin-top: 2px;
  }
`

const SetupRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
`

const RoundInfoCard = styled(Card)`
  padding: 20px 0 10px 0;
`

const TeeThumbnail = styled.div`
  height: 33px;
  width: 33px;
  background: ${({color}: {color: string}) => color};
  border-radius: 20px;
  box-shadow: 0px 0px 5px #d1d1d1;
`

const ModalContainer = styled(Card)`
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: none;
  justify-content: center;
  padding: 20px 0;
`

const TeeColorButton = styled(PulseButton)`
  padding-top: 36%;
  border-radius: 100px;
  width: 36%;
  background-color: ${({color = "#FFF"}: any) => color};
  border: none;
  margin: 7px;
  box-shadow: 0px 0px 9px #999999;
`

const TeeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  `

const TeeIcon = styled(Tee)`
  width: 15px;
  margin: 0 10px 0 5px;
  align-self: flex-end;
  color: ${({color = "#848484"}) => color};
`

const FemaleIcon = styled(Female)`
  width: 17px;
  color: #848484;
`

const MaleIcon = styled(Male)`
  width: 17px;
  color: #848484;
`

const GreenImg = styled.img`
  width: 35px;
`

const TrashIcon = styled(Trash)`
  width: 17px;
  color: ${persimon};
`

const PlusIcon = styled(Plus)`
  width: 17px;
  color: ${pop};
`

const GroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const GroupCell = styled(Card)`
  display: flex;
  min-height: 70px;
  justify-content: center;
  align-items: center;
  width: 48%;
  margin: 5px 0;
  padding: 0;
`

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 4;
  padding: 7px;

  & > p {
    word-break: break-word;
    margin: 5px 0;
  }
`

const UndoWing = styled.div`
  height: 100%;
  background: ${silver};
  border-left: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  flex: 1;
`

const RadioItem = styled(RadioButton)`
  flex: 1;
  height: 40px;
  border-radius: 40px;
  border: none;
`

const Divider = styled.div`
  margin: 20px 40px 10px 40px;
  height: 1px;
  border-top: 1px solid ${silver};
`

const GoButton = styled(PulseButton)`
  height: 50px;
  background: ${pop};
  position: fixed;
  left: 4vw;
  width: 92vw;
  bottom: 4vw;
`

export default function Setup() {

  const [state, setState] = useState({
    firstHole: 1,
    lastHole: 18,
    teeboxWomen: 'red',
    teeboxMen: 'yellow',
  })

  const history = useHistory()
  const [players, setPlayer] = useState<{[id: string]: {firstName: string, lastName: string, id: string, hcp: number}}>({})
  const [teeModalType, setTeeModal] = useState<void | string>(undefined)

  const toggleTeeModal = (teeboxType: string | void) => () => setTeeModal(teeboxType)
  
  const setValue = (...args: [string, string | number][]) => () => setState((state) =>
    args.reduce((acc, [path, value]) => ({
    ...acc,
    [path]: value
    }), state))
  
  const setTeeColor = (path: any, value: any) => () => {
    setValue([path, value])()
    toggleTeeModal()()
  }
  
  const addPlayer = () => {
    const id = v4();
    setPlayer((state) => ({
      ...state,
      [id]: {firstName: "Heikki", id, lastName: "Kakko", hcp: 54}
    }))
  }
  
  const removePlayer = (id: string) => {
    setPlayer((state) => omit(state, id))
  }

  const beginRound = () => {
    console.log('Async call, Starting round...')
    history.push('/round')
  }
  
  const playersArray = Object.values(players)

  return (
    <>
      <Hero>
          <h2>Golf Pirkkala</h2>
          <h4>Vanha kenttä</h4>
        <p>Stroke play individual, {state.lastHole - state.firstHole + 1} holes</p>
      </Hero>
      <Container>
      <Modal visible={!!teeModalType}>
          <ModalContainer>
            <TeeColorButton color="white" active={state.teeboxMen === "white"} onClick={setTeeColor(teeModalType, 'white')} />
            <TeeColorButton color="yellow" active={state.teeboxMen === "yellow"} onClick={setTeeColor(teeModalType, 'yellow')} />
            <TeeColorButton color="blue" active={state.teeboxMen === "blue"} onClick={setTeeColor(teeModalType, 'blue')} />
            <TeeColorButton color="red" active={state.teeboxMen === "red"} onClick={setTeeColor(teeModalType, 'red')} />
          </ModalContainer>
        </Modal>
      <RoundInfoCard>
        <SetupRow>
          <TeeContainer>
          <MaleIcon /><TeeIcon />
          <TeeThumbnail onClick={toggleTeeModal("teeboxMen")} color={state.teeboxMen}/>
          </TeeContainer>
          <TeeContainer>
          <FemaleIcon /><TeeIcon />
          <TeeThumbnail onClick={toggleTeeModal("teeboxWomen")} color={state.teeboxWomen}/>
          </TeeContainer>
        </SetupRow>
        <Divider />
        <SetupRow>
          <RadioItem color={pop} active={state.firstHole === 1 && state.lastHole === 9} onClick={setValue(['firstHole', 1], ['lastHole', 9])}>Front 9</RadioItem>
          <RadioItem color={pop} active={state.firstHole === 10 && state.lastHole === 18} onClick={setValue(['firstHole', 10], ['lastHole', 18])}>Back 9</RadioItem>
          <RadioItem color={pop} active={state.firstHole === 1 && state.lastHole === 18} onClick={setValue(['firstHole', 1], ['lastHole', 18])}>Full 18</RadioItem>
        </SetupRow>
      </RoundInfoCard>
      <GroupContainer>
        {playersArray.map((player, i) => {
          return (
            <GroupCell key={`player${i}`}>
              <PlayerInfo>
              <p>
                {player.firstName} {player.lastName}
              </p>
              <p>
                HCP {player.hcp}
              </p>
              </PlayerInfo>
              <UndoWing onClick={() => removePlayer(player.id)}>
                <TrashIcon />
              </UndoWing>
            </GroupCell>
          )
        })}
        {playersArray.length < 4 &&
          <GroupCell onClick={addPlayer}>
            <PlusIcon />
          </GroupCell>
        }
      </GroupContainer>
      <GoButton onClick={beginRound}>
        {/* <TeeIcon color={pop} /> */}
        <GreenImg src={golfGreen} alt="Go!"/>
      </GoButton>
    </Container>
    </>
  )
}