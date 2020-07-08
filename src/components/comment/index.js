import React, { memo, useCallback, createContext } from 'react'
import styles from './style'
import PropTypes from 'prop-types'
import { likeIconConfig } from './config'
import { connect } from 'react-redux'
import useTheme from 'hooks/useTheme'
import { computeClockYear } from 'tools/media'

function Comment(props) {
    const
        { list, title, showMore, themeName } = props,
        { onLike, onReply, onMore, onClikeUser } = props,
        theme = useTheme(themeName),
        proxyHandle = useCallback((e) => {
            const
                el = e.target,
                commentId = el.getAttribute('data-comment-id'),
                nickname = el.getAttribute('data-nickname'),
                isLike = el.getAttribute('data-like')
            if (nickname && onReply) onReply(commentId, nickname)
            if (isLike && onLike) onLike(commentId, isLike === 'true')
        }, [onReply, onLike])

    if (!list.length) return <></>
    return (
        <div className={`${styles.wrap} ${theme.fontColor_v1} `}>
            <header className={`${theme.border_v1}`}>{title}</header>
            <ol
                onClick={proxyHandle}
            >
                {
                    list.map(item => (
                        <li
                            key={item.commentId}
                            className={`${theme.border_v1} ${styles.item}`}
                        >
                            <img src={item.user.avatarUrl} />
                            <article>
                                <header>
                                    <span className={`pointer ${theme.color}`}>
                                        {item.user.nickname}：
                                    </span>
                                    {item.content}
                                </header>
                                {
                                    item.beReplied.length ?
                                        <ol className={styles.reply}>
                                            {
                                                item.beReplied.map(bp => (
                                                    <li
                                                        className={theme.back_v1}
                                                        key={bp.beRepliedCommentId}
                                                    >
                                                        <span className={`pointer ${theme.textHover_v2}`}>
                                                            <span className={theme.color}>@ </span>
                                                            <span>{bp.user.nickname}</span>
                                                            ：
                                                        </span>
                                                        <span>
                                                            {bp.content}
                                                        </span>
                                                    </li>
                                                ))
                                            }
                                        </ol>
                                        : null
                                }
                                <footer>
                                    <span>{computeClockYear(item.time)}</span>
                                    <div className={styles.icons}>
                                        <span
                                            className={`${likeIconConfig.className} ${styles.like} pointer `
                                                + (item.liked ? theme.color : '')
                                            }
                                            data-like={item.liked}
                                            data-comment-id={item.commentId}
                                            dangerouslySetInnerHTML=
                                            {{ __html: likeIconConfig.icon + `(${item.likedCount || 0})` }}
                                        >
                                        </span>
                                        <span
                                            className={`pointer ${styles.share}`}
                                        >
                                            分享
                                            </span>
                                        <span
                                            className={`pointer ${styles.reply}`}
                                            data-comment-id={item.commentId}
                                            data-nickname={item.user.nickname}
                                        >
                                            回复
                                        </span>
                                    </div>
                                </footer>

                            </article>
                        </li>
                    ))
                }
                {
                    showMore ?
                        <li
                            className={`${styles.more} ${theme.textHover_v1} pointer`}
                            onClick={onMore && onMore}
                        >
                            显示更多
                        </li> : null
                }
            </ol>
        </div>
    )
}

Comment.propTypes = {
    themeName: PropTypes.string,

    list: PropTypes.array,
    title: PropTypes.string,
    pageCount: PropTypes.number,    /* 每页数量 */
    showMore: PropTypes.bool,
    onClikeUser: PropTypes.func,
    onLike: PropTypes.func,
    onReply: PropTypes.func,
    onMore: PropTypes.func,
}

const mapState = state => ({ themeName: state.getIn(['theme', 'name']) })

export default connect(mapState, null)(memo(Comment))
export { default as CommentInput } from './comment-input'