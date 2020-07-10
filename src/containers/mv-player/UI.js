import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from './style'
import { _commentLimit, _mvCoverSize, _replyCommentConfig, _makeCommentConfig } from './config'
import PropTypes from 'prop-types'
import _icons from 'config/icons'
import { convertHugeNum } from 'tools'

import Video from '../video'
import Pagination from 'base-ui/pagination'
import Comment, { CommentInput } from 'components/comment'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'
import MvRelate from './mv-relate'

function UI(props) {
    const
        { mvData, theme, comments, briefHotComments, commentsOffset, relateMv } = props,
        { setCommentsOffset, toggleMv } = props,
        [show, setShow] = useState(true),
        [commentInputConfig, setCommentInputConfig] = useState({ show: false }),
        artists = mvData.artists,
        videoGroup = mvData.videoGroup,
        commentTotal = comments.length ? comments[0].total : 0,
        commentRef = useRef(null),
        lockCommentScroll = useRef(true),
        makeCommentHandle = useCallback(() => {
            setCommentInputConfig(_makeCommentConfig)
        }, []),
        replayHandle = useCallback((userId, userName) => {
            setCommentInputConfig(_replyCommentConfig(userId, userName))
        }, [])

    /* mv-data变化初始化 , 先锁住*/
    useEffect(() => {
        lockCommentScroll.current = true
    }, [mvData, lockCommentScroll])

    /* 评论页改变滚动条跳跃 */
    useEffect(() => {
        if (!lockCommentScroll.current)
            commentRef.current.scrollIntoView(true)
        else lockCommentScroll.current = false
    }, [commentRef, commentsOffset, lockCommentScroll])

    return (
        <OpcityWrap
            show={show}
            className={styles.wrap}
            fixed={true}
        >
            <section className={styles.left}>
                <header>
                    <span
                        onClick={e => setShow(false)}
                        dangerouslySetInnerHTML={{ __html: _icons.left.icon }}
                        className={`${_icons.left.className} ${theme.fontColor_v1} ${theme.textHover_v1}`}
                    ></span>
                    <h2>{mvData.name}</h2>
                    <ol onClick={e => console.log(e.target)}>
                        {
                            artists.map((item, index) => (
                                <li
                                    key={item.id}
                                    data-type={item.id}
                                    className={`pointer ${theme.textHover_v2}`}
                                >
                                    {item.name}
                                    {
                                        index === artists.length - 1 ? null : ' /'
                                    }
                                    &nbsp;
                                </li>
                            ))
                        }
                    </ol>
                </header>
                <Video />
                <article ref={commentRef}>
                    <CommentInput config={commentInputConfig} onClick={makeCommentHandle} />
                    <div className={commentsOffset === 0 ? '' : 'hide'}>
                        <Comment
                            list={briefHotComments}
                            title={`精彩评论(${briefHotComments.length})条`}
                            onReply={replayHandle}
                        />
                    </div>
                    <Comment
                        list={comments}
                        title={`最新评论(${commentTotal})条`}
                    />
                    <footer className={styles.pagination}>
                        <Pagination
                            pageSize={_commentLimit}
                            total={commentTotal}
                            onChange={setCommentsOffset}
                        />
                    </footer>
                </article>
            </section>
            <section className={styles.right}>
                <header className={theme.border_v1}>
                    <h2>MV介绍</h2>
                </header>
                <section className={`${styles.relateData} ${theme.fontColor_v1}`}>
                    <header >
                        <span>发布时间：{mvData.publishTime}</span>
                        <span>播放次数：{convertHugeNum(mvData.playCount)}</span>
                    </header>
                    <div>{mvData.briefDesc}</div>
                    <ol
                        className={styles.tags}
                        onClick={e => console.log(e.target)}
                    >
                        标签：{
                            videoGroup.map((item, index) => (
                                <li
                                    key={item.id}
                                    className={`pointer`}
                                    data-type-id={item.id}
                                >
                                    <span className={`${theme.color}`}>
                                        {item.name}
                                    </span>
                                    {
                                        index === videoGroup.length - 1
                                            ? null : ' / '
                                    }
                                </li>
                            ))
                        }
                    </ol>
                </section>
                <MvRelate
                    theme={theme}
                    onClick={toggleMv}
                    list={relateMv}
                    description={mvData.description}
                />
            </section>
        </OpcityWrap>
    )
}

UI.propTypes = {
    commentsOffset: PropTypes.number,
    theme: PropTypes.object,
    mvData: PropTypes.object,
    comments: PropTypes.array,
    briefHotComments: PropTypes.array,
    relateMv: PropTypes.array,
    toggleMv: PropTypes.func,
    setCommentsOffset: PropTypes.func,
}
export default UI