export const sizeOnKeyStroke = () => {

  document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    // console.log(event.target);
    autoExpand(event.target);
  }, false);
  let autoExpand = function (target) {
  
    // console.log(target);
    // Reset target height
    target.style.height = 'inherit';
  
    // Get the computed styles for the element
    let computed = window.getComputedStyle(target);
  
    // Calculate the height
    let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  
    target.style.height = height + 'px';
  
  }
  
  
}

export const sizeOnPageLoad = () => {
  const contentBoxes = document.getElementsByClassName('content')
  if (!Array.isArray(contentBoxes) || !contentBoxes.length) {
    contentBoxes[0].style.height = (contentBoxes[0].scrollHeight + 10)+'px'
  }
}

