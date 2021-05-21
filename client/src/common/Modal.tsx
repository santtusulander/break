import styled from "styled-components";

export default styled.div<{visible: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  opacity: ${(props) => props.visible ? "100" : "0"};
  ${(props) => !props.visible ? "pointer-events: none;" : ""}
  align-items: center;
  background: rgba(0,0,0, 0.6);
  transition: all ease .3s;
  z-index: 1;
  justify-content: center;
`