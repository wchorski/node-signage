import styled from 'styled-components'


export const StyledCollectionPreview = styled.div`

  // background-color: whitesmoke;
  border: solid grey 2px;
  margin-bottom: 1rem;

  // width: 25%
  padding: 1rem;

  // display: flex;
  // flex-wrap: wrap;

  h3{
    color: white;
  }

  .collectionBlock{
    display: flex;
    flex-wrap: wrap;
    min-height: 3rem;

    // border: solid black 1px;
    padding: .1rem;
    box-shadow: #2f26237a 1px 1px 2px; 
    width: 800px;

    &:hover{
      background-color: #c5beba8f;
    }

    .styledSlide{ 
      width: 44%;
      margin: .1rem;

      h2{
        font-size: 1rem;
        padding: 0;
        margin: 0;
      }
      .slide-content{
        min-height: 0;

        p{
          padding: 0;
          margin: 0;
          font-size: .3rem;
        }
      }
    }
  }


`