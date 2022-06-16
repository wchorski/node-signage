import styled from 'styled-components'


export const StyledPostsList = styled.div`
  // padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  
  position: relative;
  
  .excerpt{
    margin-right: 1rem;
    width: 25rem;
    height: 20rem;
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
  
`