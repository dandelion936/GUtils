class UrlMatch {
  private search: string = window.location.search;
  private hash: string = window.location.hash;
  matchStr: string;
  constructor () {
    this.matchStr = this.setMatchStr();
  }
  getMatch(match: string) {
    try {
      if(this.matchStr != 'no search or hash') {
        switch(arguments.length) {
          case 0:
            return this.UrlMatchNoArg(this.matchStr);
          case 1:
            return this.UrlMatchOneArg(match,this.matchStr);
        }
      }else {
        throw 'no search or hash'
      }
    }
    catch (err) {
      return err
    }
  }
  private setMatchStr() {
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
  };
  private UrlMatchNoArg(matchStr: string) {
    let matchResult: any = matchStr.match(/=(\S*)/)
    try {
      if(matchResult) {
        return matchResult[1]
      }else {
        throw 'No match'
    }
    }
    catch(err) {
      return err
    }
  }
  private UrlMatchOneArg(match: string, strMatch: string) {
    let re = new RegExp(match+"=(\\S*)&");
    let re2 = new RegExp(match+"=(\\S*)");
    let matchResult: any = strMatch.match(re)
    let matchResult2: any = strMatch.match(re2)
    try {
      if(matchResult) {
        return matchResult[1].split('&')[0]
      }else if(matchResult2) {
        return matchResult2[1]
      }else {
        throw 'No match'
      }
    }
    catch(err) {
        return err
    }
  }
}
export default new UrlMatch()
