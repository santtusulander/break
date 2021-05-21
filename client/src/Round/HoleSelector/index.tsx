import Selector from "../../common/Selector";
import styled from "styled-components";
import { Round, holes, players, useAppState } from "../../state";
import { ReactComponent as Par } from '../../common/assets/par.svg';
import Card from "../../common/Card";
import golfGreen from '../../common/assets/green.png';

const GreenImg = styled.img`
  width: 20px;
`

const Hole = styled(Card)`
  height: 30px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  line-height: 95%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & p {
    font-size: 18px;
  }

  .holePar {
    display: flex;
    align-items: center;

    & > p {
      margin-left: 5px;
    }
  }
`;

const ParIcon = styled(Par)`
  width: 20px;
`

const elements = holes.map(({number, par}, i) => ({
  id: i,
  key: `${i}hole`,
  element: <Hole>
    <div className="holePar">
      <GreenImg src={golfGreen} alt="Hole #"/>
      <p>
        {number}
      </p>
    </div>
    <div className="holePar">
      <ParIcon />
      <p>
        {par}
      </p>
    </div>
  </Hole>
}));

export default function HoleSelector() {

  const [{round: state}, reduceState] = useAppState()

  const setCurrent = (holeIndex: Round['currentHole']) => reduceState<Round>(['round'], (state) => {

    const existingStrokeForPlayer = state.scoresByHole[holeIndex][state.currentPlayer]

    const currentStroke = existingStrokeForPlayer || holes[holeIndex].par
    const currentPlayer = existingStrokeForPlayer ? state.currentPlayer : players[0].id

    return {
      ...state,
      currentHole: holeIndex,
      strokeSelectorPristine: true,
      playerSelectorPristine: true,
      currentPlayer,
      currentStroke
    }
  })
  
  const setPristine = (value: Round['holeSelectorPristine']) => reduceState(['round', 'holeSelectorPristine'], () => value)

  return (
    <Selector
      name="holeselector"
      pristine={state.holeSelectorPristine}
      current={state.currentHole}
      setCurrent={setCurrent}
      setPristine={setPristine}
      height={`auto`}
      width={"92vw"}
      horizontal
      elements={elements}/>
  )
}