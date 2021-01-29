import { Http } from '../utils/http'

class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemeNames () {
    this.themes = await Http.request({
      url: 'names.json',
      data: {
        names: `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
      }
    })
  }

  async getHomeLocationA () {
    return this.themes.find(t => t.name === Theme.locationA)
  }

  async getHomeLocationE () {
    return this.themes.find(t => t.name === Theme.locationE)
  }

  async getHomeLocationF () {
    return this.themes.find(t => t.name === Theme.locationF)
  }

  async getHomeLocationH () {
    return this.themes.find(t => t.name === Theme.locationH)
  }

  async getHomeThemeESpu (themeE) {
    if (themeE.online) {
      return this.getHomeThemeESpuList()
    }
  }

  getHomeThemeESpuList () {
    return Http.request({
      url: `${Theme.locationE}/with_spu.json`
    })
  }

}

export {
  Theme
}
