export { randomIndex, loopIndex } from 'store/music/reducer'

export const
    getBaseUrl = id => Number.isInteger(id)
        ? `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        : ''
