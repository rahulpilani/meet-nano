// Listen to content.js events
chrome.extension.onMessage.addListener(  
    function(request, sender, sendResponse) {
      var scene = "Cocoa Beach";
      getOnState();
      if (request.inMeeting) {
        turnOn();
        if (!request.isCameraOff) {
          if (!request.isMicrophoneMuted) {
            scene = "Backlight";
          } else {
            scene = "Cameraon";
          }
        } else if (!request.isMicrophoneMuted) {
            scene = "Microphone";
        } else {
            scene = "Cocoa Beach";
        }
        setScene(scene);
      } else {
        turnOff();
      }
    }
  );

  var url = "http://192.168.1.66:16021/api/v1/dXpj12OGoLW0HsINbM8jBsyT00Sq2NEy/";

  function getOnState() {
    var x = new XMLHttpRequest();
    x.open('GET', url + "state/on");
    x.send();

}
  function turnOn() {
      turn(true);

  }

  function turnOff() {
      turn(false);
  }

  function turn(on) {
      var payload = {
        "on": {
          "value": on
        }
      };
      var x = new XMLHttpRequest();
      x.open('PUT', url + "state");
      x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      x.send(JSON.stringify(payload));  
  }

  function setScene(scene) {
    var payload = {'select': scene};
    var x = new XMLHttpRequest();
    x.open('PUT', url + "effects");
    x.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    x.send(JSON.stringify(payload));
  }