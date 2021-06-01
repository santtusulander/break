import styled from "styled-components";
import { pop, sark, silver } from '../common/stylevars';
import Card from "../common/Card";
import { ReactComponent as SearchIcon } from '../common/assets/search.svg';

export const SearchItemRow = styled.div`
  font-weight: 500;
  padding: 7px 10px;
  display: flex;
  font-weight: 400;
  justify-content: space-between;
  border-bottom: 1px solid ${silver};

  p {
    font-size: 15px;
  }
`

export const SearchItemsCard = styled(Card)`

  div:last-child {
    border: none !important;
  }
`

export const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid ${silver};
  display: block;
  font-size: 16px;
  margin: 0 10px 0 0;
  flex: 10;

  :focus {
    outline: none;
    border-bottom: 1px solid ${pop};
    transition: 0.2s;
  }
`

export const SearchInputCard = styled(Card)`
  display: flex;
  align-items: center;
`

export const SearchIconElement = styled(SearchIcon)`
  flex: 1;
  padding: 0 10px 0 10px;
  margin-bottom: 2px;
  color: ${sark};
`