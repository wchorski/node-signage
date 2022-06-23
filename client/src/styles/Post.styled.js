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

  .select-cont{
    position: relative;
    width: 300px;
    margin-bottom: 1rem;

    svg{
      position: absolute;
      top: 25%;
      right: 0;
      font-size: 30px;
      // border: 1px solid #565656;
      // background: #0e7b53;
      color: #fff;
      // padding: 11px 15px;
      margin-right: 15px;
    }

    select{
      appearance: none;
      background: #ffffff52;
      color: #fff;
      width: 100%;
      padding: 10px 20px;
      font-size: 22px;

      &:hover{
        background: var(--color-highlight);
      }

      option{
        color: #000;
        padding: 5px 10px;

        &:hover{
          background-color: var(--color-highlight);
        }
      }
    }

  }

  .dropzone-cont{
    box-shadow: black 1px 1px 2px;
    padding: .4rem;
    margin-bottom: 1rem;
  }
`