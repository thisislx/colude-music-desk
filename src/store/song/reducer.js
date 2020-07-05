import types from './types'
import { fromJS } from 'immutable'

export const initState = {
    currentLyric: 'loading...',
    lyricCaches: { /* id: lyric */ },
    comments: {
        /*  页数: [] */
    },
    briefHotComments: [],
}

const initState_imm = fromJS(initState)

export default (state = initState_imm, { value, type }) => {
    switch (type) {
        case types.CHANGE_CURRENT_LYRIC:
            return state.set('currentLyric', value)

        case types.ADD_LYRIC_CACHES:
            return state.setIn(['lyricCaches', value[0]], value[1])

        case types.CHANGE_BRIEF_HOT_COMMENTS:
            return state.set('briefHotComments', value)

        case types.UPDATE_COMMENTS:
            return state.setIn(['comments', value[0]], value[1])

        case types.CLEAR_ALL_COMMENTS:
            return state.merge({
                comments: initState_imm.get('comments'),
                hotComments: initState_imm.get('briefHotComments'),
            })

        case types.TOGGLE_COMMENT_LIKE: {
            const
                index = state.getIn(['comments', value[0]])
                    .findIndex(item => item.get('commentId') == value[1]),
                comment = state.getIn(['comments', value[0], index])

            return state.setIn(['comments', value[0], index],
                comment
                    .set('liked', value[2])
                    .set('likedCount', comment.get('likedCount') + (value[2] ? 1 : -1))
            )
        }

        default: return state
    }
}