import styled from 'styled-components'


export const StyledPlayerSettings = styled.div`

  .timer{
    display: flex;
    flex-direction: column;

    position: relative;
    height: 54px;
    width: 200px;

    &:after{
      content: 'seconds';
      position: absolute;
      bottom: 1px;
      left: 0;
      width: calc(100% - 27px);
      text-align: center;
    } 

    svg{
      color: var(--color-highlight);
      font-size: 50px;
      position: block;
    }

    .iconTimer{
      position: absolute;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }


    input[type=number]{
      -moz-appearance: textfield
    }

    input{
      /* height: 54px;
      padding-left: .3rem;
      width: 3em;
      text-align: right; */
      height: 54px;
      background: #FFFFFF;
      border: 1px solid #E3E3E3;
      border-radius: 4px 0 0 4px;
      font-size: 20px;
      color: #434343;
      text-align: center;
      width: calc(100% - 27px);
      font-weight: bold;
      padding-bottom: 20px;
    }

    .input-button {
      position: absolute;
      height: 27px;
      width: 27px;
      border: 1px solid #E3E3E3;
      color: #E3E3E3;
      text-align: center;
      line-height: 27px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:hover {
        background: #fafafa69;
      }

      &.add {
        top: 0;
        right: 1px;
        border-radius: 0 4px 0 0;
        border-bottom: none;
      }
      &.remove {
        bottom: 0;
        right: 1px;
        border-radius: 0 0 4px 0;
      }
    }

    .slid-list{
      margin-top: 1em;
    }



    .slide{
      background-color: blue;
      border: dotted white 1px;
      /* height: 30px;
      width: 100%; */

      padding: 1rem;
      margin: 5px;

      position: absolute;

      display: none;

      p{
        text-align: center;
      }
    }

    .active{
      display: flex;
    }
  }
  
`

