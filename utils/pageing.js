import { Http } from './http.js'

/**
 * 类  无法保存数据状态   class.a = 3; class.a = 5; 这样的话
 * 对象  可以保存数据的状态 let classA = new Class();  let classB = new Class(); classA.a = 3; classB.a = 3;
 */

class Page {
  req
  start
  count
  url
  locker = false
  moreData = true   // 判断是否还有更多数据
  accumulator = []  // 每次请求的数据累加

  constructor (req, start, count = 5) {
    this.req = req
    this.start = start
    this.count = count
    this.url = req.url
  }


  async getMoreData() {
    if(!this.moreData){
      return
    }
    if(!this.getLock()){
      return
    }
    const data =await this._actualGetData()
    this.unLock()
    return data
  }

  /**
   * 获取数据
   * @private
   */
  async _actualGetData () {
    const req = this._getCurrentReq()

    let paging = await Http.request(req)

    if (!paging) {
      return null
    }

    // 判断是否有数据了
    if (paging.total == 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }

    // 判断是否还有更多数据
    this.moreData = Page._moreData(paging.total_page, paging.page)
    /**
     * 如果还有更多数据的话 就让下次的请求从 start+count开始
     */
    if (this.moreData) {
      this.start += this.count
    }

    // 把每次请求回来的数据 保存到一个数组中
    this._accumulator(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }

  }

  /**
   * 判断是否还有更多数据
   * @param totalPage  总的页数
   * @param currentPage 当前第几页
   * @returns {boolean} true 还有数据  false没有
   * @private
   */
  static _moreData (totalPage, currentPage) {
    return currentPage < totalPage - 1
  }

  /**
   * 把每次请求回来的数据 保存到一个数组中
   * @param items
   * @private
   */
  _accumulator (items) {
    this.accumulator = this.accumulator.concat(items)
  }

  /**
   * 获取当前请求的url
   * @private
   */
  _getCurrentReq () {
    let url = this.url
    const param = `start=${this.start}&count=${this.count}`

    /**
     * 判断当前的url是否有？
     */
    if (url.includes('?')) {
      url += '&' + param
    } else {
      url += '?' + param
    }

    this.req.url = url
    return this.req
  }

  /**
   * 得到锁
   * @returns {boolean}
   */
  getLock () {

    /**
     * 如果当前的锁是true 说明已经有人获取了锁 后面的人再来获取的话 就是false
     */
    if (this.locker) {
      return false
    }

    /**
     * 没有当前获取锁 那么就 让这次请求获取锁
     */
    this.locker = true
    return true
  }

  /**
   * 释放锁
   */
  unLock () {
    this.locker = false
  }

}

export {
  Page
}
