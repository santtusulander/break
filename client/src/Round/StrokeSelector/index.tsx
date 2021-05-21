import Selector from "../../common/Selector";
import styled from "styled-components";
import { Round, useAppState } from "../../state";

const height = 140

const Number = styled.div`
  font-size: ${height}px;
  line-height: 95%;
  text-align: center;
`;

const numbers = Array.from<number, any>(Array(13).keys(), (i) => ({
  id: i + 1,
  key: `${i}stroke`,
  element: <Number>{i + 1}</Number>
}));

export default function StrokeSelector() {

  const [{round: state}, reduceState] = useAppState()

  const setCurrent = (value: Round['currentStroke']) => reduceState(['round', 'currentStroke'], () => value)
  const setPristine = (value: Round['strokeSelectorPristine']) => reduceState(['round', 'strokeSelectorPristine'], () => value)

  return (
    <Selector
      name="strokeselector"
      pristine={state.strokeSelectorPristine}
      current={state.currentStroke}
      setCurrent={setCurrent}
      setPristine={setPristine}
      height={`${height}px`}
      width={"auto"}
      elements={numbers} />
  )
}