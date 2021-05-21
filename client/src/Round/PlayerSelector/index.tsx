import Selector from "../../common/Selector";
import styled from "styled-components";
import { Round, holes, useAppState } from "../../state";
import { ReactComponent as Clubface } from '../../common/assets/clubface.svg';
import { silver } from "../../common/stylevars";

const height = 100

const Player = styled.div`
  height: ${height}px;
  line-height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  max-width: 100px;
  padding: 7px 0;
  border-bottom: 1px solid ${silver};
  
  p {
    font-size: 17px;
  }

  & > p.strokes {
    font-size: 19px;
    font-weight: 700;
    margin-left: 10px;
  }
`

const ClubfaceIcon = styled(Clubface)`
  width: 22px;
`

export default function PlayerSelector() {

  const [{round: state}, reduceState] = useAppState()
  
  const elements = Object.values(state.players).map(({id, firstName, lastName}) => ({
    id,
    key: `${id}player`,
    element: <Player>
      <Row>
        <p>{firstName} {lastName.slice(0, 1)}.</p>
      </Row>
      <Row>
        <ClubfaceIcon />
        <p className={"strokes"}>{state.players[id].strokes}</p>
      </Row>
    </Player>
  }));

  const setCurrent = (value: Round['currentPlayer']) => reduceState<Round>(['round'], (state) => {

    const currentStroke = state.scoresByHole[state.currentHole][value] || holes[state.currentHole].par

    console.log({
      ...state,
      strokeSelectorPristine: true,
      currentPlayer: value,
      currentStroke
    })

    return {
      ...state,
      strokeSelectorPristine: true,
      currentPlayer: value,
      currentStroke
    }
  })

  const setPristine = (value: Round['playerSelectorPristine']) => reduceState(['round', 'playerSelectorPristine'], () => value)

  return (
    <Selector
      name="playerselector"
      pristine={state.playerSelectorPristine}
      current={state.currentPlayer}
      setCurrent={setCurrent}
      setPristine={setPristine}
      height={`${height}px`}
      width={"auto"}
      elements={elements} />
  )
}