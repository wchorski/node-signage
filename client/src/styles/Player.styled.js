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

  // .template{

  //   &--0{
  //     .styledSlide{
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: center;
  //     }

  //     h2{
  //       font-size: 5rem;
  //       color: white;
  //       text-shadow: 6px 6px 13px #000000;

  //       text-align: center;
  //       margin-bottom: 2rem;
  //     }

  //     .slide-content{
  //       background-color: #ffffffcc;
  //       min-height: 8rem;

  //       p {
  //         color: black;
  //         font-size: 2rem;
  
  //         text-align: center;
  //         padding: 4rem 4rem;
  //       }
  //     }
  //   }
  }

`