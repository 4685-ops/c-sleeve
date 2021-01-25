import { Http } from '../utils/http'

class Activity {
  static locationD = 't-2'

  static async getHomeLocationD () {
    return await Http.request({
      url: 'activity.json',
      data: {
        name: `${Activity.locationD}`
      }
    })
  }

}

export {
  Activity
}
