import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'

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
        themeESpu: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initAllData()
    },
    async initAllData () {
        const theme = new Theme()
        await theme.getThemeNames();
        const themeA = await theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        const categoryC = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        const themeE = await theme.getHomeLocationE()

        console.log(themeE)
        let themeESpu = null
        if (themeE.online) {
            themeESpu = await theme.getHomeThemeESpu(themeE)
            if (themeESpu.spu_list.length>8) {
                themeESpu.spu_list = themeESpu.spu_list.slice(0,8)
            }
        }
        console.log(themeESpu)
        this.setData({
            themeA,
            bannerB,
            categoryC,
            activityD,
            themeE,
            themeESpu,
        })
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
