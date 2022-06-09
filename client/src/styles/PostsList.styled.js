import styled from 'styled-components'


export const StyledPostsList = styled.div`
  // padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;



    width: 25rem;
    height: 20rem;

    position: relative;
    // cursor: pointer;


    // h3{
    //   text-decoration: underline; 
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   display: -webkit-box;
    //   -webkit-line-clamp: 2;
    //   -webkit-box-orient: vertical;
    // }

    .author{
      color: grey;
    }
    

    p{
      color: var(--color-text);
      margin-top: 1rem;
      
      // overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 5;
      // -webkit-box-orient: vertical;
      
    }
  
`