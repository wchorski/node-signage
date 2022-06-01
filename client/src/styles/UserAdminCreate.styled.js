import styled from 'styled-components'


export const StyledUserAdminCreate = styled.div`
  background-color: #ffffff0d;
  font-size: 30px;
  height: 30rem;
  padding: 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  z-index: 10000
  box-shadow: black 3px 3px 5px;

  .form-item{
    margin-bottom: 1rem;
  }
  svg{
    margin-right: 1rem;
  }

  transition: 1s;

  animation: popupAnim 2.5s linear ease-in-out;


  @keyframes popupAnim {
    0%{
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

`