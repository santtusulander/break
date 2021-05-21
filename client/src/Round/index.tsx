import styled from 'styled-components';
import {update} from 'lodash';
import PulseButton from '../common/PulseButton';
import PlayerSelector from './PlayerSelector';
import HoleSelector from './HoleSelector';
import StrokeSelector from './StrokeSelector/index';
import { Round, holes, useAppState } from '../state';
import Card from '../common/Card';
import Container from '../common/Container';
import { pop, silver } from '../common/stylevars';
import { ReactComponent as Check } from '../common/assets/check.svg';
import { ReactComponent as Continue } from '../common/assets/continue.svg';
import { ReactComponent as Male } from '../common/assets/male.svg';
import { ReactComponent as Clubface } from '../common/assets/clubface.svg';

const ConfirmButton = styled(PulseButton)`
  width: 100%;
  background: ${({completeMode}) => completeMode ? pop : "white"};
  color: ${({completeMode}) => completeMode ? "white" : pop};
  padding: 15px 0;
`

const HolePage = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const SelectorContainer = styled(Card)<{strokeSelector?: boolean}>`
  border-radius: 70px;
  margin-left: ${({strokeSelector}) => strokeSelector ? 20 : 0}px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0 20px 0px;
`

const CheckIcon = styled(Check)`
  width: 20px;
`

const ClubfaceIcon = styled(Clubface)`
  width: 28px;
  color: ${pop};
  margin-bottom: 10px;
`

const ContinueIcon = styled(Continue)`
  width: 20px;
`

const PlayersCard = styled(Card)`
  padding: 10px;
  margin-top: 4vw;
`

const MaleIcon = styled(Male)`
  width: 15px;
  color: ${pop};
  margin-bottom: 10px;
`

const PlayerRow = styled.div<{active: boolean}>`
  display: flex;
  transition: 0.5s;
  padding: 7px 0;
  justify-content: space-between;
  border-bottom: 1px solid ${({active}) => active ? pop : silver};
`

const NameCell = styled.p`
  flex: 9;
`

const ParCell = styled.p`
  flex: 1;
  font-weight: 800;
`

const StrokesCell = styled.p`
  flex: 1;
  text-align: end;
  font-weight: 800;
`

export default function RoundPage() {

  const [{round: state}, reduceState] = useAppState()

  const playersArray = Object.values(state.players)

  const playerWithNoScore = playersArray.find(({id}) => !state.scoresByHole[state.currentHole][id])
  const onLastHole = holes.length - 1 === state.currentHole


  const changeHole = (holeIndex: number) => {

    reduceState<Round>('round', (state) => {

      const existingStrokeForPlayer = state.scoresByHole[holeIndex][state.currentPlayer]

      const currentStroke = existingStrokeForPlayer || holes[holeIndex].par
      const currentPlayer = existingStrokeForPlayer ? state.currentPlayer : playersArray[0].id

      return {
        ...state,
        currentHole: holeIndex,
        holeSelectorPristine: true,
        strokeSelectorPristine: true,
        playerSelectorPristine: true,
        currentPlayer,
        currentStroke
      }
    })
  }

  const confirmStrokes = () => {
    
    //This may come from the backend...
      
    reduceState<Round>('round', (state) => {

      const newState: Round = {
        ...state,
        strokeSelectorPristine: true,
        scoresByHole: {
          ...state.scoresByHole,
          [state.currentHole]: {
            ...state.scoresByHole[state.currentHole],
            [state.currentPlayer]: state.currentStroke
          },
        }
      }

      const strokes = Object.values(newState.scoresByHole).reduce((acc, holeScores) => acc + (holeScores[state.currentPlayer] || 0), 0)
      const playersArray = Object.values(newState.players)

      const playerWithNoScore = playersArray.find(({id}) => !newState.scoresByHole[state.currentHole][id])

      return {
      ...newState,
      currentPlayer: playerWithNoScore?.id || state.currentPlayer,
      players: update(newState.players, state.currentPlayer, (player) => ({...player, strokes})),
      currentStroke: playerWithNoScore
        ? holes[state.currentHole].par
        : state.currentStroke
    }})
  }

  return (
    <HolePage>
      <PlayersCard>

      {playersArray.map(({firstName, lastName, id}, i) => {

        const strokesPlayed: number | void = state.scoresByHole[state.currentHole][id]

        return (
        <PlayerRow
          key={id}
          active={id === state.currentPlayer}>
          <NameCell>
            {firstName} {lastName}
          </NameCell>
          <ParCell>
            E
          </ParCell>
          <StrokesCell>
            {strokesPlayed || '-'}
          </StrokesCell>
        </PlayerRow>
      )})}
      </PlayersCard>
      <div style={{display: 'flex', flex: "1", justifyContent: "flex-end"}}>
        <SelectorContainer>
          <MaleIcon />
          <PlayerSelector />
        </SelectorContainer>
        <SelectorContainer strokeSelector>
          <ClubfaceIcon />
          <StrokeSelector />
        </SelectorContainer>
      </div>
      <ConfirmButton completeMode={onLastHole || (!playerWithNoScore && state.strokeSelectorPristine)} onClick={
        playerWithNoScore || !state.strokeSelectorPristine
          ? confirmStrokes
          : onLastHole
            ? () => console.log("Finish round")
            : () => changeHole(state.currentHole + 1)}>
        {playerWithNoScore || !state.strokeSelectorPristine
          ? <CheckIcon />
          : onLastHole
            ? "Finish round"
            : <ContinueIcon />}
      </ConfirmButton>
      <HoleSelector />
    </HolePage>
  );
}
