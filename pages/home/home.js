import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'
import { SpuPaging } from '../../model/spu-paging'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        categoryC: [],
        activityD: null,
        themeE: null,
        themeESpu: null,
        themeF: null,
        themeG: [],
        themeH: null,
        spuPaging:null,
        loadingType: 'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initAllData()
        this.initBottomSpuList()
    },
    async initAllData () {
        const theme = new Theme()
        await theme.getThemeNames();
        const themeA = await theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        const categoryC = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        const themeE = await theme.getHomeLocationE()
        const themeF = await theme.getHomeLocationF()
        const themeG = await Banner.getHomeLocationG()
        const themeH = await theme.getHomeLocationH()
        let themeESpu = null
        if (themeE.online) {
            themeESpu = await theme.getHomeThemeESpu(themeE)
            if (themeESpu.spu_list.length>8) {
                themeESpu.spu_list = themeESpu.spu_list.slice(0,8)
            }
        }

        this.setData({
            themeA,
            bannerB,
            categoryC,
            activityD,
            themeE,
            themeESpu,
            themeF,
            themeG,
            themeH
        })
    },
    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging();
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        console.log(data.items,'data.items')
        // 调用 lin-ui 的方法把数据传递给瀑布流组件
        wx.lin.renderWaterFlow(data.items)

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }

        // 调用 lin-ui 的方法把数据传递给瀑布流组件
        wx.lin.renderWaterFlow(data.items)

       if (!this.data.spuPaging.moreData) {
           this.setData({
               loadingType: 'end'
           })
       }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
