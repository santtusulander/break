import React, { useState, useRef, ReactChild, memo } from "react";
import styled from "styled-components";

import useIntersect from "./useIntersect";

const Slide = styled.div<any>`
  flex: none;
  scroll-snap-align: ${(props: any) => props.horizontal ? "center" : "start"};
  scroll-snap-stop: always;
  width: 100%;
`;

interface ItemProps {
  root: IntersectionObserverInit["root"],
  pristine:SelectorProps['pristine'],
  current: SelectorProps['current'],
  id: string | number,
  isInitial: boolean,
  horizontal: SelectorProps['horizontal'] | void,
  setCurrent: SelectorProps['setCurrent'],
  canFocus: boolean,
  children: React.ReactChild
}

const Item = memo((props: ItemProps) => {

  const [ref, entry] = useIntersect({
    threshold: 0.5,
    root: props.root
  });
  
  if (entry?.target && props.isInitial && props.canFocus) {

    entry.target.scrollIntoView();

  } else if (!props.pristine && entry?.isIntersecting && props.canFocus && props.current !== props.id) {

    props.setCurrent(props.id);
  }

  return (
    <Slide horizontal ref={ref}>
      {props.children}
    </Slide>
  );
}, (prevProps, nextProps) => {
  return prevProps.pristine === nextProps.pristine
    && prevProps.current === nextProps.current
    && prevProps.isInitial === nextProps.isInitial
    && prevProps.canFocus === nextProps.canFocus
});

const Container = styled.div`
  flex: none;
  display: flex;
`;

 const HorizontalContainer = styled(Container)`
  overflow-x: scroll;
  overflow-y: hidden;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
`;

 const VerticalContainer = styled(Container)`
  overflow-x: hidden;
  overflow-y: scroll;
  flex-flow: column nowrap;
  scroll-snap-type: y mandatory;
`;

type SelectorProps = {
  current: string | number,
  name?: string,
  setCurrent: (value: any) => any,
  horizontal?: boolean,
  pristine?: boolean,
  setPristine?: (value: boolean) => any,
  elements: {id: string | number, key: string, element: ReactChild}[],
  height: number | string,
  width: number | string
}

export default memo(function Selector({
  horizontal = false,
  pristine: pristineProp,
  setPristine: setPristineProp,
  elements,
  height,
  width,
  current = "5",
  setCurrent}: SelectorProps) {
  const selfRef = useRef(null);

  const scrollEndTimeout = useRef<NodeJS.Timeout | void>(undefined)

  const [pristineState, setPristineState] = useState(true);
  const [isScrolling, setScrolling] = useState(false);
  const [isTouching, setTouching] = useState(false);

  const [pristine, setPristine] = [
    typeof pristineProp !== 'boolean'
      ? pristineState
      : pristineProp,
    setPristineProp || setPristineState
  ]

  const onScroll = () => {

    if (!isScrolling) {
      setScrolling(true);
    }

    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current);
    }

    scrollEndTimeout.current = setTimeout(onScrollEnd, 100);
  };

  const onScrollEnd = () => {

    setScrolling(false);

    if (scrollEndTimeout.current) {

      clearTimeout(scrollEndTimeout.current);
    }
  };

  const onTouchEnd = () => {
  
    setTouching(false);
  };

  const onTouchStart = () => {
    pristine && setPristine(false);
    !isTouching && setTouching(true);
  };
  
  const ContainerToTuse = horizontal ? HorizontalContainer : VerticalContainer

  return (
      <ContainerToTuse
        ref={selfRef}
        style={{height: `${height}`, width: `${width}`}}
        dir="ltr"
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}

      >
        {elements.map(({ element, key, id }) => (
          <Item
            isInitial={pristine && current === id}
            id={id}
            horizontal
            pristine={pristine}
            canFocus={!isScrolling && !isTouching}
            current={current}
            setCurrent={setCurrent}
            key={key}
            root={selfRef.current}
          >
            {element}
          </Item>
        ))}
      </ContainerToTuse>
  );
}, (prevProps, nextProps) => {
  return prevProps.current === nextProps.current && prevProps.pristine === nextProps.pristine
})
