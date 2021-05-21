import { ComponentProps, useRef } from "react";
import styled from "styled-components";

const Button = styled.button`

  @keyframes pulse {
    from {
      box-shadow: 0 0 0 0 #8dd4bf;
    }
  }
  border-radius: 50px;
  box-shadow: 3px 3px 6px #afa9a9;
  border: 1px solid #8dd4bf;
  color: #8dd4bf;
  position: relative;
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
    <Button {...props} onClick={onClick}>
      {props.children}
    </Button>
  )
}