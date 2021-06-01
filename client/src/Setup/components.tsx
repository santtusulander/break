import styled from "styled-components"
import PulseButton from '../common/PulseButton'
import RadioButton from "../common/RadioButton"
import { persimon, pop, loafer, silver } from '../common/stylevars'

import { ReactComponent as Female } from '../common/assets/female.svg';
import { ReactComponent as Male } from '../common/assets/male.svg';
import { ReactComponent as Tee } from '../common/assets/tee.svg';
import { ReactComponent as Trash } from '../common/assets/trash.svg';
import { ReactComponent as Plus } from '../common/assets/plus.svg';
import Card from '../common/Card'
import { SearchInputCard } from "../common/SearchCard";

export const Hero = styled.div`
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

export const SetupRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
`

export const RoundInfoCard = styled(Card)`
  padding: 20px 0 10px 0;
`

export const TeeThumbnail = styled.div`
  height: 33px;
  width: 33px;
  background: ${({color}: {color: string}) => color};
  border-radius: 20px;
  box-shadow: 0px 0px 5px #d1d1d1;
`

export const ModalContainer = styled(SearchInputCard)`
  box-shadow: none;
`

export const TeeColorButton = styled(PulseButton)`
  padding-top: 36%;
  border-radius: 100px;
  width: 36%;
  background-color: ${({color = "#FFF"}: any) => color};
  border: none;
  margin: 7px;
  box-shadow: 0px 0px 9px #999999;
`

export const TeeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  `

export const TeeIcon = styled(Tee)`
  width: 15px;
  margin: 0 10px 0 5px;
  align-self: flex-end;
  color: ${({color = "#848484"}) => color};
`

export const FemaleIcon = styled(Female)`
  width: 17px;
  color: #848484;
`

export const MaleIcon = styled(Male)`
  width: 17px;
  color: #848484;
`

export const GreenImg = styled.img`
  width: 35px;
`

export const TrashIcon = styled(Trash)`
  width: 17px;
  color: ${persimon};
`

export const PlusIcon = styled(Plus)`
  width: 17px;
  color: ${pop};
`

export const GroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const GroupCell = styled(Card)`
  display: flex;
  min-height: 70px;
  justify-content: center;
  align-items: center;
  width: 48%;
  margin: 5px 0;
  padding: 0;
`

export const PlayerInfo = styled.div`
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

export const UndoWing = styled.div`
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

export const RadioItem = styled(RadioButton)`
  flex: 1;
  height: 40px;
  border-radius: 40px;
  border: none;
`

export const Divider = styled.div`
  margin: 20px 40px 10px 40px;
  height: 1px;
  border-top: 1px solid ${silver};
`

export const GoButton = styled(PulseButton)`
  height: 50px;
  background: ${pop};
  position: fixed;
  left: 4vw;
  width: 92vw;
  bottom: 4vw;
`