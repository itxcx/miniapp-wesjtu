const util = require('../../utils/util');

Page({
    data: {
        hot: '',
        new: 'top-bar-item-active',
        actsList: [],
        offset: 0,
        order: 'act.create_time',
        moreHidden: true
    },
    onLoad: function () {
        this.fetchData({
            order: this.data.order
        });
    },
    onTapTag: function (e) {
        if (e.currentTarget.id === 'hot') {
            this.setData({
                hot: 'top-bar-item-active',
                new: '',
                offset: 0,
                order: ''
            });
        } else {
            this.setData({
                hot: '',
                new: 'top-bar-item-active',
                offset: 0,
                order: 'act.create_time'
            });
        }
        this.fetchData({
            order: this.data.order
        });
    },
    fetchData: function (data) {
        this.setData({
            moreHidden: false
        });
        if (!data.offset) {
            data.offset = 0;
            this.setData({
                actsList: []
            });
        }
        wx.request({
            url: util.getActs(data),
            success: (res) => {
                this.setData({
                    actsList: this.data.actsList.concat(res.data.actsList),
                    moreHidden: true
                });
            }
        });
    },
    navigateDetail: (e) => {
        wx.navigateTo({
            url: `../detail/detail?id=${e.currentTarget.id}`
        });
    },
    lower: function (e) {
        this.setData({
            offset: this.data.offset + 10
        });
        this.fetchData({
            offset: this.data.offset,
            order: this.data.order
        });
    },
    onShareAppMessage: () => ({
        title: '同去 -「我交」',
        path: '/pages/tongqu/tongqu'
    })
});
