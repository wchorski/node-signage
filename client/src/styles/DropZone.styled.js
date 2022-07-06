import styled from 'styled-components'


export const StyledDropZone = styled.div`

  padding: 1rem;
  border: dashed hsl(0deg 0% 100% / 56%) 2px;
  background-color: hsl(0deg 0% 100% / 10%);
  margin-bottom: 1rem;

  &:hover{
    cursor: pointer;
    border: dotted hsl(0deg 0% 100% / 56%) 2px;
    background-color: hsl(0deg 0% 100% / 20%);
  }

  .filePreview{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .imgFrame{
      border: double grey 3px;
      margin: 0 1rem 1rem 0;
    }
  }
  
`

