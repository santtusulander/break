import { ComponentProps, useRef } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const LocalButton = styled(Button)`

  @keyframes pulse {
    from {
      box-shadow: 0 0 0 0 #8dd4bf;
    }
  }
  box-shadow: 3px 3px 6px #afa9a9;
  background: transparent;
  transition: .4s;

  &:focus {
    box-shadow: 0 0 0 12px transparent;
    animation: pulse .4s;
  }
`

export default function PulseButton(props: ComponentProps<typeof Button>) {

  const focusTimeout = useRef<NodeJS.Timeout | void>(undefined)

  const onClick = (e: any) => {
    focusTimeout.current = setTimeout(() => {
      e.target.blur()
      focusTimeout.current && clearTimeout(focusTimeout.current)
    }, 400)
    props.onClick && props.onClick(e)
  }

  return (
    <LocalButton {...props} onClick={onClick}>
      {props.children}
    </LocalButton>
  )
}