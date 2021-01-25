import { Http } from '../utils/http'

class Banner {
  static locationB = 'b-1'

  static getHomeLocationB () {
    return Http.request({
      url: `${Banner.locationB}.json`
    })
  }
}

export {
  Banner
}
