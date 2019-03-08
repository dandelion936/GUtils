class UrlParams {
  private search: string = window.location.search;
  private hash: string = window.location.hash;
  paramsStr: string;
  params: object;
  constructor () {
    this.paramsStr = this.setparamsStr();
    this.params = this.setParams();
  }
  getParam(param: string) {
    try {
      if(this.paramsStr != 'no search or hash') {
        if(param) {
          return this.params[param]
        }else {
          return this.params
        }
      }else {
        throw 'no search or hash'
      }
    }
    catch (err) {
      return err
    }
  }
  private setParams (): object {
    let params: object = {}
    let arr: Array<string> = this.paramsStr.split('&')
    arr.forEach(element => {
      let keyAnValue: Array<string> = element.split('=')
      if(keyAnValue[0].substr(0,1) == '?' || keyAnValue[0].substr(0,1) == '#') {
        keyAnValue[0] = keyAnValue[0].substr(1)
      }
      Object.defineProperty(params,keyAnValue[0],{
        enumerable: true,
        value: keyAnValue[1]
      })
    });
    return params
  }
  private setparamsStr () {
    try {
      if(this.search) {
        return this.search
      }else if(this.hash) {
        return this.hash
      } else {
        throw 'no search or hash'
      }
    }
    catch (err) {
      return err
    }
  }
}
export default new UrlParams()
