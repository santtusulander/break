import axios from "axios"
import { useRef, useState } from "react"
import styled from "styled-components"
import * as SC from "./components"
import Modal from "../common/Modal"
import * as Common from "../common/SearchCard"
import { Button } from "../common/Button"
import { ReactComponent as Check } from '../common/assets/check.svg';
import { pop } from "../common/stylevars"

type Props = {
  visible: boolean,
  addPlayer: (player: any) => any,
  removePlayer: (id: string) => any,
  toggleVisible: () => any
  players: any[]
}

const LocalModal = styled(Modal)`
  flex-direction: column;
  background: rgba(0,0,0,0.95);
  div {
    box-shadow: none;
  }

  > div {
    width: 92vw;
    margin: 7px 0;
    max-height: 35vh;
    overflow-y: scroll;
  }
`

const CheckIcon = styled(Check)`
  width: 50px;
  color: ${pop};
  position: fixed;
  top: 90vh;
`

export default function PlayerSelectionModal({visible, toggleVisible, players, addPlayer, removePlayer}: Props) {

  const [candidates, setCandidates] = useState<any[]>([])
  const [searchValue, setSearch] = useState('')
  const fetchTimeout = useRef<NodeJS.Timeout | void>()

  const onChange = (e: any) => {

    setSearch(e.target.value)
    
    if (e.target.value?.length < 3) {
      return
    }

    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current)
    }

    fetchTimeout.current = setTimeout(async () => {
      const {data: candidates} = await axios.get(`/users/name/${e.target.value}`)
      setCandidates(candidates)
    }, 600)
  }

  return (
  <LocalModal visible={visible}>
    <SC.GroupContainer>
      {players.map((player, i) => {
        return (
          <SC.GroupCell key={`player${i}`}>
            <SC.PlayerInfo>
            <p>
              {player.firstName} {player.lastName}
            </p>
            <p>
              {player.clubabbrev}, HCP {player.hcp}
            </p>
            </SC.PlayerInfo>
            <SC.UndoWing onClick={() => removePlayer(player.id)}>
              <SC.TrashIcon />
            </SC.UndoWing>
          </SC.GroupCell>
        )
      })}
    </SC.GroupContainer>
    {players.length < 4 &&
    <>
    <Common.SearchInputCard>
      <Common.SearchIconElement />
      <Common.SearchInput value={searchValue} onChange={onChange} placeholder="Search for players"/>
    </Common.SearchInputCard>
    {!!candidates.length && searchValue.length > 2 &&
      <Common.SearchItemsCard>
        {[...candidates, ...candidates, ...candidates].map((candidate) => {
          return (
            <Common.SearchItemRow onClick={() => addPlayer(candidate)}>
            <div>
              <p>{candidate.fullName}</p>
              <p style={{fontSize: "11px"}}>HCP {candidate.hcp}</p>
            </div>
            <p>{candidate.clubabbrev}</p>
            </Common.SearchItemRow>
          )
        })}
      </Common.SearchItemsCard>
    }
    </>
    }
    <CheckIcon onClick={toggleVisible}/>
  </LocalModal>)
}