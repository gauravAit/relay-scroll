const attachRelativeScroller = (child1, child2, parentNode) => {
    parentNode = $(parentNode);
    child1 = $(child1);
    child2 = $(child2);
    const parentHeight = parentNode.outerHeight();
  
    const getPosRelToParent = (elem) => {
      const parentPos = parentNode.offset();
      const elemPos = elem.offset();
      return {
        left: elemPos.left - parentPos.left,
        top: elemPos.top - parentPos.top,
      };
    };
  
    const getChildInitialState = child => {
      return {
        node: child,
        initialRelTop: getPosRelToParent(child).top,
        initialRelBottom: parentHeight - (getPosRelToParent(child).top + child.outerHeight()),
        initialPosition: child.css('position') || 'initial',
      };
    };
  
    const child1State = getChildInitialState(child1);
    const child2State = getChildInitialState(child2);
    let prevScrollTop = 0;
    let currentScrollTop;
    parentNode.css({
      position: 'relative',
    });
    
    const handleChildrenPositions = () => {
      const ch1Pos = getPosRelToParent(child1);
      const ch2Pos = getPosRelToParent(child2);
      ch1Pos.bottom = parentHeight - (ch1Pos.top + child1.outerHeight());
      ch2Pos.bottom = parentHeight - (ch2Pos.top + child2.outerHeight());
      currentScrollTop = parentNode.scrollTop();
      
      if (currentScrollTop > prevScrollTop) {
        handleScrollDown(ch1Pos, ch2Pos);
      } else {
        handleScrollUp(ch1Pos, ch2Pos);
      }
      prevScrollTop = parentNode.scrollTop();
    };
  
    const handleScrollUp = (ch1Pos, ch2Pos) => {
      if (ch1Pos.top > child1State.initialRelTop) {
        child1State.node.css({
          transform: `translate3d(0, ${parentNode.scrollTop()}px, 0)`,     
        });
      }
      if (ch2Pos.top > child2State.initialRelTop) {
        child2State.node.css({
          transform: `translate3d(0, ${parentNode.scrollTop()}px, 0)`,     
        });
      }
    };
  
    const handleScrollDown = (ch1Pos, ch2Pos) => {
        if ((ch1Pos.bottom == 0) && (ch2Pos.bottom == 0)) {
          return;
      }
      if (ch1Pos.bottom > 0) {
        fixToBottom(child1State);
      }
      if (ch2Pos.bottom > 0) {
        fixToBottom(child2State);
      }
    };
  
    const fixToBottom = childObj => {
      if (childObj.initialRelBottom >= 0) {
        childObj.node.css({
          transform: `translate3d(0, ${parentNode.scrollTop()}px, 0)`,
        });
        return;   
      }
      childObj.node.css({
        transform: `translate3d(0, ${parentNode.scrollTop() +  (parentHeight - child1.outerHeight())}px, 0)`,
      });
    };
  
    parentNode.scroll(handleChildrenPositions);
  };
  //attachRelativeScroller($('.ch-1')[0], $('.ch-1')[1], $('.parent-container')[0]);
  

  export default attachRelativeScroller;