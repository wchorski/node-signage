import styled from 'styled-components'


export const StyledPostsList = styled.div`
  // padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  
  position: relative;
  
  .excerpt{
    margin-right: 1rem;
    margin-bottom: 1rem;
    // width: 25rem;
    // height: 20rem;
    position: relative;

    .meta-data{
      opacity: 0;
      background-color: #000000bf;
      color: white;
      border-radius: 10px 1px 1px 1px;
  
      padding: 1rem;
      position: absolute;
      // bottom: 0%;
      right: 0%;
    }
  
    &:hover{
      .meta-data{
        opacity: 1;
      }
    }

    .styledSlide{
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 20rem;
      min-height: 20rem;
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
  }


  .author{
    color: grey;
  }
  

  p{
    color: var(--color-text);
    margin-top: 1rem;

  }

  .editBtns{
    z-index: 5;
    position: absolute;
    bottom: 0;
    left: 0;

    ul{
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;

      li{
        padding: 0 .3rem;
        margin-right: .2rem;
      }

      .edit{
        background-color: var(--color-highlight);
        color: white;
        border: solid white 2px;
        border-radius: 10px;
        padding: 1rem;
      }

      #selectBox{
        height: 30px;
        width: 30px;
        border: solid var(--color-highlight) 3px;
      }
      #selectBox:checked{
        background-color: green;
      }
      #selectBox:after {
        content: "x";
        position: absolute;
        display: none;
    }
    }
  }
  
`