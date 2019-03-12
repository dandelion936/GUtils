class GDate {
  private year: number = 0;
  private month: number = 0;
  private day: number = 0;
  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  constructor() {
    this.setTimes();
  }
  private setTimes(date?: any) {
    let time = date ? new Date(date) : new Date()
    this.year = time.getFullYear()
    this.month = time.getMonth() + 1
    this.day = time.getDate()
    this.hour = time.getHours()
    this.minute = time.getMinutes()
    this.second = time.getSeconds()
  }
  getZh(date?: any,lang?: string): string {
    this.setTimes(date)
    switch(lang) {
      case('yyyy-mm-dd hh:mm:ss'):
        return `${this.year}年${this.month}月${this.day}日 ${this.hour}时${this.minute}分${this.second}秒`
      case('yyyy-mm-dd hh:mm'):
        return `${this.year}年${this.month}月${this.day}日 ${this.hour}时${this.minute}分`
      case('yyyy-mm-dd hh'):
        return `${this.year}年${this.month}月${this.day}日 ${this.hour}时`
      case('yyyy-mm-dd'):
        return `${this.year}年${this.month}月${this.day}日`
      case('yyyy-mm'):
        return `${this.year}年${this.month}月`
      case('mm-dd hh:mm:ss'):
        return `${this.month}月${this.day}日 ${this.hour}时${this.minute}分${this.second}秒`
      case('mm-dd hh:mm'):
        return `${this.month}月${this.day}日 ${this.hour}时${this.minute}分`
      case('mm-dd hh'):
        return `${this.month}月${this.day}日 ${this.hour}时`
      case('mm-dd'):
        return `${this.month}月${this.day}日`
      case('dd hh:mm:ss'):
        return `${this.day}日 ${this.hour}时${this.minute}分${this.second}秒`
      case('dd hh:mm'):
        return `${this.day}日 ${this.hour}时${this.minute}分`
      case('dd hh'):
        return `${this.day}日 ${this.hour}时`
      case('hh:mm:ss'):
        return ` ${this.hour}时${this.minute}分${this.second}秒`
      case('hh:mm'):
        return ` ${this.hour}时${this.minute}分`
        case('mm:ss'):
        return `${this.minute}分${this.second}秒`
      default:
      return `${this.year}年${this.month}月${this.day}日 ${this.hour}时${this.minute}分${this.second}秒`
    }
  }
  getEn(date?: any,lang?: string): string {
    this.setTimes(date)
    switch(lang) {
      case('yyyy-mm-dd hh:mm:ss'):
        return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`
      case('yyyy-mm-dd hh:mm'):
        return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:`
      case('yyyy-mm-dd hh'):
        return `${this.year}-${this.month}-${this.day} ${this.hour}:`
      case('yyyy-mm-dd'):
        return `${this.year}-${this.month}-${this.day}`
      case('yyyy-mm'):
        return `${this.year}-${this.month}-`
      case('mm-dd hh:mm:ss'):
        return `${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`
      case('mm-dd hh:mm'):
        return `${this.month}-${this.day} ${this.hour}:${this.minute}:`
      case('mm-dd hh'):
        return `${this.month}-${this.day} ${this.hour}:`
      case('mm-dd'):
        return `${this.month}-${this.day}`
      case('dd hh:mm:ss'):
        return `${this.day} ${this.hour}:${this.minute}:${this.second}`
      case('dd hh:mm'):
        return `${this.day} ${this.hour}:${this.minute}:`
      case('dd hh'):
        return `${this.day} ${this.hour}:`
      case('hh:mm:ss'):
        return ` ${this.hour}:${this.minute}:${this.second}`
      case('hh:mm'):
        return ` ${this.hour}:${this.minute}:`
        case('mm:ss'):
        return `${this.minute}:${this.second}`
      default:
      return `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`
    }
  }
  getInterval(s: any, n?: any, lang?: string) {
    try {
      if(s) {
        let start: any = s ? new Date(s) : new Date()
        let end: any = n ? new Date(n) : new Date()
        let startNumber: number = start.getTime()
        let endNumber: number = end.getTime()
        let interval: number = Math.abs(startNumber - endNumber)
        return this.getIntervalZh(24*60*60*1000)
      }else {
        throw 'start time is must!'
      }
    }
    catch(err) {
      return err
    }
  }
  private getIntervalZh(interval:number):string {
    return '123'
  }
}
export default new GDate()
