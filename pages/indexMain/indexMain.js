// pages/indexMain/indexMain.js
const Util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    dayType: '天',
    dateLong: 0,
    // 投入时长
    xxday: 0,
    // 费用
    xxmoney: 0,
    xxmoney1: 0,
    // 预期利率
    falseRate: 0,
    // 真实利率
    trueRate: 0,
    // 真实收益
    trueIncome: 0
  },

  // 选择时间单位
  selectDateType() {
    let that = this
    wx.showActionSheet({
      itemList: ['天', '月', '年'],
      success(res) {
        let dayType = that.data.dayType
        console.log(that.data.dayType)

        switch (res.tapIndex) {
          case 0:
            dayType = '天'
            break

          case 1:
            dayType = '月'
            break

          case 2:
            dayType = '年'
            break
        }

        that.setData({
          dayType: dayType
        })

        that.clear()
      }
    })
  },

  // 输入完调用
  inputFn(e) {
    console.log(e)
    let obj = {},
      name = e.currentTarget.dataset.name,
      val = e.detail.value

    switch (name) {
      case 'amount':
        obj = {
          amount: val
        }
        break
      case 'falseRate':
        obj = {
          falseRate: val
        }
        break
      case 'dateLong':
        obj = {
          dateLong: val
        }
        break
      case 'xxday':
        obj = {
          xxday: val
        }
        break
      case 'xxmoney':
        obj = {
          xxmoney: val
        }
        break
    }
    this.setData(obj)
    this.clear()
  },
  clear() {
    let amount = this.data.amount, //金额
      falseRate = this.data.falseRate, // 年利率
      dateLong = this.data.dateLong, // 时长
      xxday = this.data.xxday,
      xxmoney = this.data.xxmoney,
      dayType = this.data.dayType,
      minDay = 0,
      minMoney = 0

    if (amount == 0 || falseRate == 0 || dateLong == 0 || isNaN(dateLong)) { // isNaN判断是否为数字
      this.setData({
        falseIncome: 0,
        trueIncome: 0,
        trueRate: 0
      })
      return
    }

    if (dayType == '月') dateLong = dateLong * 30
    if (dayType == '年') dateLong = dateLong * 365
    if (xxmoney > 1) minMoney = xxmoney
    if (xxday > 1) minDay = xxday

    // 预期收益
    let falseIncome = amount * falseRate * 0.01 * (dateLong / 365)
    dateLong = parseInt(dateLong)
    minMoney = parseFloat(minMoney)
    falseIncome = parseFloat(falseIncome)

    // 真实收益
    let trueIncome = falseIncome - minMoney

    // 真实利率 
    let trueRate = falseRate
    if (falseIncome != trueIncome || minDay > 0) {
      trueRate = trueIncome / (amount * (dateLong + minDay) / 365) * 1000
      if (minMoney > 0) trueRate = trueRate * 0.1
      trueRate = Util.numberComma(trueRate.toFixed(2))
    }

    falseIncome = Util.numberComma(falseIncome.toFixed(2))
    trueIncome = Util.numberComma(trueIncome.toFixed(2))

    this.setData({
      falseIncome: falseIncome,
      trueIncome: trueIncome,
      trueRate: trueRate
    })
  }
})