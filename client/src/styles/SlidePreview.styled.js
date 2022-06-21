import styled from 'styled-components'


export const StyledSlidePreview = styled.div`

  // border-radius: 20px;
  // padding: .3rem;
  background-color: black;
  // margin: .1rem;

  

  &:hover{
    box-shadow: black 2px 2px 12px;
  }

  &.meta-data{
    font-size: 10px;
    color: rgba(255, 255, 255, 0.514);
    margin: 0;
    padding: 0;
  }

  h2{
    font-size: 2rem;
    color: white;
    text-shadow: 6px 6px 13px #000000;

    text-align: center;
    margin-bottom: 2rem;
  }

  .slide-content{
    background-color: #ffffff7a;
    min-height: 1rem;

    p {
      color: black;
      font-size: 1rem;

      text-align: center;
      padding: 1rem 1rem;
    }
  }

`