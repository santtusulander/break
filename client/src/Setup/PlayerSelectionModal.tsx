import axios from "axios"
import { useRef, useState } from "react"
import Card from "../common/Card"
import Modal from "../common/Modal"
import { ModalContainer } from "./components"

type Props = {visible: boolean}

export default function PlayerSelectionModal({visible}: Props) {

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
  <Modal visible={visible}>
    <ModalContainer>
      <input value={searchValue} onChange={onChange} />
      {candidates.map((candidate) => {
        return (
          <div>

          <p>{candidate.fullName}</p>
          <p>HCP {candidate.hcp}</p>
          <p>{candidate.clubabbrev}</p>
          </div>
        )
      })}
    </ModalContainer>
  </Modal>)
}