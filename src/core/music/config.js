export { _randomIndex, _loopIndex } from 'store/music/reducer'

export const
    getBaseUrl_ = id => Number.isInteger(id)
        ? `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        : ''
