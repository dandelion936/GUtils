class Device {
  getIP () {
    const ip = new IP()
    return new Promise((resolve) => {
      ip.getIp().then((value:any) => {
        resolve(value)
      })
    })
  }
}
class IP extends Device {
  displayAddrs:string[] = []
  getIp () {
    let RTCPeerConnection:any = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    let _this = this
    try {
      if (RTCPeerConnection) {
        let rtc = new RTCPeerConnection({
          iceServers: []
        });
        if (1 || window.mozRTCPeerConnection) {
          rtc.createDataChannel('', {
            reliable: false
          })
        }
        return new Promise((resolve) => {
          let flage = true
          rtc.onicecandidate = function (evt:any) {
            if (evt.candidate) {
              _this.grepSDP('a=' + evt.candidate.candidate)
              if (flage) {
                resolve(_this.displayAddrs)
                flage = !flage
              }
            }
          }
          rtc.createOffer((offerDesc:any) => {
            _this.grepSDP(offerDesc.sdp);
            if (!flage) {
              resolve(_this.displayAddrs)
            }
            rtc.setLocalDescription(offerDesc)
          }, function (e:any) {
            console.warn('offer failed', e)
          })
        })
      } else {
        throw '请使用主流浏览器：chrome,firefox,opera,safari'
      }
    }
    catch (err) {
      return err
    }
  }
  updateDisplay (newAddr: any) {
    var addrs = Object.create(null)
    addrs['0.0.0.0'] = false
    if (newAddr in addrs) {
      return 123;
    } else {
      addrs[newAddr] = true
    }
    this.displayAddrs = Object.keys(addrs).filter(function (k:string) {
      return addrs[k]
    })
    for (var i = 0; i < this.displayAddrs.length; i++) {
      if(this.displayAddrs[i].length > 16) {
        this.displayAddrs.splice(i,1)
        i --
      }
    }
  }
  grepSDP (sdp:any):any {
    sdp.split('\r\n').forEach((line:any) => {
      if (~line.indexOf('a=candidate')) {
        var parts = line.split(' '),
        addr = parts[4],
        type = parts[7]
        if ( type === 'host') {
          this.updateDisplay(addr)
        }
      } else if (~line.indexOf('c=')) {
        var parts = line.split(' '),
        addr = parts[2]
        this.updateDisplay(addr)
      }
    });
  }

}
export default new Device()
