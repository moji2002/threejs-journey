const toggleFullscreen = (element) => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
  
    if (fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else {
        document.webkitExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else {
        element.webkitRequestFullscreen();
      }
    }
  };

  
  export default toggleFullscreen