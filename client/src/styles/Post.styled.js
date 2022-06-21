import styled from 'styled-components'


export const StyledPost = styled.div`
  background-color: #9b68316b;
  padding: 1rem;
  margin: .1rem;
  border-radius: .3rem;
  min-height: 30rem;
  max-width: 40rem;
  // min-width: 10rem;
  margin: 0 auto;
  position: relative;
  box-shadow: black 3px 3px 10px;


  .form-item{
    display: flex;
  }

  .formErr{
    color: red;
  }

  svg{
    color: white;
  }
  .deleteBtn{
    svg{
      color: red; 
    }
  }

  .title{
    color: white;
    border: none;
    text-decoration: underline; 
    background-color: transparent;
  }
  input.title{
    width: 100%;
  }

  .author{
    color: grey;
    border: none;
    background-color: transparent;
    margin-bottom: .3rem;
  }

  .content{
    color: white;
    background-color: transparent;
    border: none;
    border-top: solid #162737 2px;
    max-width: 800px

    margin-top: 1rem;
    padding-top: 1rem;
    
  }

  .color{
    width: 60%;
    height: 4rem;
  }
  .color-label{
    color: white;
  }

  textarea{
    width: 100%;
    max-width: 100%;
    min-height: 10rem;
    height: inherit;
    height: 30px;
    resize: vertical;
  }

  .form-dropzone{
    flex-direction: column;
  }

  // .editBtns{
  //   // outline: solid yellow 3px;
  //   display: flex;
  //   justify-content: flex-end;
  //   align-items: center;

  //   position: block;
  //   right: 0;
  //   bottom: 0;
  //   margin-top: .1rem;

  //   a{
  //     border: solid var(--color-highlight) 1px;
  //     padding: .6rem;
  //     border-radius: 10px;
  //   }
    
  //   button{
  //     cursor: pointer;
  //     margin-right: 1rem;
  //     transition: .2s;

  //   }
  //   .deleteBtn{
  //     color: red;
  //     background-color: white;
      
  //     &:hover{
  //       color: white;
  //       background-color: red;
  //       border-bottom: red;
  //     }
  //   }
  // }
`