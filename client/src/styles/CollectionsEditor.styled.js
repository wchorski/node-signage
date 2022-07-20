import styled from 'styled-components'


export const StyledCollectionsEditor = styled.div`

  border: solid white 3px;
  padding: 1rem;

  .col-list{
    li{
      label{
        display: none;
      }
    }
  }

  input[type="checkbox"].toggle {
    opacity: .1;
    position: absolute;
    cursor: pointer;
    left: -9000px;
    top: -9000px;
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
      content: "";
      width: 2em;
      height: 2em;
      border-radius: 1em;
      background-color: grey;
      position: absolute;
      transition: 200ms ease-in-out;
    }
  }

  input[type="checkbox"].toggle:checked + label {

    color: var(--color-highlight);

    ::after{
      transform: translateX(115%);
      background-color: var(--color-highlight);
    }
  }


  form{
    flex-direction: row;
    justify-content: left;
    /* padding: 1rem; */

    input{
      border-radius: 10px 0 0 10px;
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

