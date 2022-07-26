import styled from 'styled-components'


export const StyledPlayer = styled.div`

  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // border: dashed white 2px;


  .styledSlide{
    width: 100vw;
    height: 100vh;
  }

  .meta-data{
    opacity: 0;
    background-color: #000000bf;
    color: white;
    border-radius: 10px 1px 1px 1px;

    padding: 1rem;
    position: absolute;
    bottom: 0%;
    right: 0%;
  }

  &:hover{
    .meta-data{
      opacity: 1;
    }
  }

`