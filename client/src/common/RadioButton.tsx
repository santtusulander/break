import { ComponentProps } from "react";
import styled from "styled-components";
import { loafer, pop } from "./stylevars";

const SlashButton = styled.button`

  overflow: hidden;
  transition: 0.3s;
  border: 1px solid ${({color = pop}: any) => color};
  color: ${({color = pop, active}: any) => active ? loafer : color};
  position: relative;
  background: transparent;

  & > span {
    position: relative;
  }

  &::before {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    width: 110%;
    height: 400%;
    background: ${({color = pop}: any) => color};
    transform: ${(props: any) => props.active
      ? "translate(-50%, -50%) rotate(-45deg) scaleX(1)"
      : "translate(-50%, -50%) rotate(-45deg) scaleX(0)"};
    transition: .2s;
  }
`

export default function RadioButton(props: ComponentProps<typeof SlashButton> & {active: boolean}) {

  return (
    <SlashButton {...props}>
      <span>
        {props.children}
      </span>
    </SlashButton>
  )
}