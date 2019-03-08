class UrlParams {
  private paramsStr: string = window.location.search || window.location.hash || '';
  params: any = Object.create({});
  constructor () {
    this.params = this.setParams();
  }
  getParam(param: string) {
    try {
      if(this.paramsStr != '') {
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
}
export default new UrlParams()
