class Device {
  getIP () {
    let RTCPeerConnection:any = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    try {
      if (RTCPeerConnection) {
        let rtc = new RTCPeerConnection({
          iceServers: []
        });
        rtc.createDataChannel("my Channel")
        // console.log(rtc)
        rtc.createOffer = function(evt: any) {
          console.log(evt)
        }
      } else {
        throw '请使用主流浏览器：chrome,firefox,opera,safari'
      }
    }
    catch (err) {
      return err
    }
  }
}
export default new Device()
