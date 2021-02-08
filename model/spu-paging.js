import { Page } from '../utils/pageing'

class SpuPaging {
  static getLatestPaging () {
    return new Page({
      url: 'spu/latest/test.php?v=1'
    }, 0)
  }

}

export {
  SpuPaging
}
