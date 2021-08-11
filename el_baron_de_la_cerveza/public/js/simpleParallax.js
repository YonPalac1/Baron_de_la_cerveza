var image = document.getElementsByClassName('thumbnail');
    new simpleParallax(image, {
      delay: .1,
      transition: 'cubic-bezier(0,0,0,1)',
      overflow: true
    });