MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var inMeeting = false;
var isMicrophoneMuted = false;
var isCameraOff = false;

var observer = new MutationObserver(function(mutations, observer) {
    var microphoneButton = document.querySelector(".nod4rf div.U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.A00RE.M9Bg4d");
    var cameraButton = document.querySelector(".SfBQ6c div.U26fgb.JRY2Pb.mUbCce.kpROve.uJNmj.A00RE.M9Bg4d");
    var inMeetingInternal = microphoneButton != null || cameraButton != null;
    var isMicrophoneMutedInternal = microphoneButton != null && microphoneButton.attributes['data-is-muted'] != null && microphoneButton.attributes['data-is-muted'].value == 'true';
    var isCameraOffInternal = cameraButton != null && cameraButton.attributes['data-is-muted'] != null && cameraButton.attributes['data-is-muted'].value == 'true';
    
    var changed = false;
    if (inMeeting != inMeetingInternal) {
        inMeeting = inMeetingInternal;
        changed = true;
    }

    if (isMicrophoneMuted != isMicrophoneMutedInternal) {
        isMicrophoneMuted = isMicrophoneMutedInternal;
        changed = true;
    }

    if (isCameraOff != isCameraOffInternal) {
        isCameraOff = isCameraOffInternal;
        changed = true;
    }

    if (changed) {
        var payload = {'inMeeting': inMeeting, 'isMicrophoneMuted': isMicrophoneMuted, 'isCameraOff': isCameraOff}
        console.log(payload);
        chrome.extension.sendMessage(payload);
    }
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});

