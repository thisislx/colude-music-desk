const mvidReg = /^\w\w*$/

export const
    _commentLimit = 50,         /* 每页的数量 */
    _mvCoverSize = '?param=200y100',
    _makeCommentConfig = {
        show: true,
        type: '发表',
        placeholder: '发表我的评论',
    },
    _replyCommentConfig = (userId, userName) => ({
        show: true,
        type: '回复',
        placeholder: `回复:${userName}`,
        userId,
    }),
    isMvid_ = id => mvidReg.test(id)