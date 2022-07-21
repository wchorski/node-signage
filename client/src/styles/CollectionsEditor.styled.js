import styled from 'styled-components'


export const StyledCollectionsEditor = styled.div`

  border-bottom: solid #ffffff69 3px;
  padding: 1rem;

  .col-list{
    li{
      margin-bottom: 0.2rem;
      display: flex;

      label{
        margin: 0;
      }
    }
  }

  /* input[type="checkbox"].toggle {
    opacity: .1;
    position: absolute;
    cursor: pointer;
    left: -9000px;
    top: -9000px;

    :disabled + label {
      color: #68346873;

      ::before{
        color: #68346873;
        background-color: #68346873;
      }
      ::after{
        color: #68346873;
        background-color: #68346873;
      }
    }
  }

  input[type="checkbox"].toggle + label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    ::before{
      content: "";
      width: 4.5em;
      height: 1.2rem;
      background-color: #ffffff2b;
      border-radius: 1em;
      margin-right: .25rem;
    }

    ::after{
      content: "\\2715";
      width: 2em;
      height: 2em;
      border-radius: 1em;
      background-color: grey;

      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      transition: 200ms ease-in-out;
    }
  }

  input[type="checkbox"].toggle:checked + label {

    color: var(--color-highlight);

    ::after{
      content: "\\2713";
      color: black;
      transform: translateX(115%);
      background-color: var(--color-highlight);
    }
  } */


  form{
    flex-direction: row;
    justify-content: left;
    /* padding: 1rem; */

    input{
      border-radius: 10px 0 0 10px;
      border: solid var(--color-highlight) 3px;
      box-shadow: inset #00000069 3px 3px 4px;
      padding: .5rem;
    }

    button{
      margin: 0;
      border-radius: 0 10px 10px 0;
      margin-right: 1rem;

      svg{
        color: var(--color-highlight);
      }
    }
  }
  
`

