import styled from 'styled-components'


export const StyledSlide = styled.div`

  // border-radius: 20px;
  // padding: 3rem;
  background-color: grey;
  // margin: .1rem;

  aspect-ratio: 16 / 9;
  display: flex;
  width: 100%;
  position: relative

  &:hover{
    box-shadow: black 2px 2px 12px;
  }

  .meta-data{
    font-size: 10px;
    color: rgba(255, 255, 255, 0.514);
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    right: 0;

    &:hover{
      background-color: black;
    }
  }

  .template{

    &--1{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      h2{
        font-size: 5rem;
        color: white;
        text-shadow: 6px 6px 13px #000000;

        text-align: center;
        margin-bottom: 2rem;
      }

      .slide-content{
        background-color: #ffffffcc;
        min-height: 8rem;

        p {
          color: black;
          font-size: 2rem;
  
          text-align: center;
          padding: 4rem 4rem;
        }
      }
    }

`