import(/* webpackChunkName: 'region-code' */ 'assets/region-code')
    .then(res => ({ default: _regionCode } = res))

export const
    _paths = {
        playlist: '/playlist/'
    },
    _imgSizes = {
        avatar: '?param=250y250',
        back: '?param=200y200',
    },
    _myMenuTitle = {
        true: ['我创建的歌单', '我收藏的歌单'],
        false: ['歌单', '收藏'],
        propertys: ['mine', 'collect']
    }

export let _regionCode = Object.prototype



