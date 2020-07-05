import React, { memo, useMemo, useEffect, useState, useRef, useCallback } from 'react'
import styles from './style'
import { _commentLimit, _mvCoverSize } from './config'
import PropTypes from 'prop-types'
import { computeClockMin } from 'tools/media'
import { convertHugeNum } from 'tools'
import _icons from 'config/icons'

import Video from '../video'
import Pagination from 'base-ui/pagination'
import Comment, { CommentInput } from 'components/comment'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'

function UI(props) {
    const
        { mvData, theme, comments, briefHotComments, commentsOffset, relateMv } = props,
        { setCommentsOffset, toggleMv } = props,
        [show, setShow] = useState(true),
        artists = mvData.artists,
        videoGroup = mvData.videoGroup,
        commentTotal = comments.length ? comments[0].total : 0,
        commentRef = useRef(null),
        lockCommentScroll = useRef(true),
        relateMvClickHandle = useCallback(e => {
            const
                el = e.target,
                mvid = el.getAttribute('data-mv-id'),
                userid = el.getAttribute('data-user-id')
            if (mvid) toggleMv(mvid)
        }, [toggleMv])

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
            state={['top']}
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
                                        index === artists.length - 1
                                            ? null : ' /'
                                    }
                                        &nbsp;
                                </li>
                            ))
                        }
                    </ol>
                </header>
                <main>
                    <Video />
                </main>
                <article ref={commentRef}>
                    <CommentInput />
                    <div className={commentsOffset === 0 ? '' : 'hide'}>
                        <Comment
                            list={briefHotComments}
                            title={`精彩评论(${briefHotComments.length})条`}
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
                <footer>
                    <h2>相关推荐</h2>
                    <ol
                        className={styles.relateMv}
                        onClick={relateMvClickHandle}
                    >
                        {
                            relateMv.map(mv => (
                                <li
                                    key={mv.id}
                                >
                                    <aside>
                                        <img
                                            className='pointer'
                                            data-mv-id={mv.id}
                                            src={mv.cover + _mvCoverSize}
                                        />
                                        <span className={`${theme.back_v2} ${theme.fontColor_r4}`}>
                                            {convertHugeNum(mv.playCount)}
                                        </span>
                                    </aside>
                                    <section className={`${theme.fontColor_v1}`}>
                                        <p
                                            className={`${theme.fontColor_v2} pointer ${theme.textHover_v2}`}
                                            data-mv-id={mv.id}
                                        >
                                            {mv.name}
                                        </p>
                                        <span data-mv-id={mv.id}>
                                            {computeClockMin(mv.duration)}
                                        </span>
                                        <div className={styles.creators}>
                                            by：{mv.artists.map(item => (
                                            <span
                                                className={`pointer ${theme.textHover_v1}`}
                                                key={item.id}
                                                data-user-id={item.id}
                                            >
                                                {item.name}
                                            </span>
                                        ))}
                                        </div>
                                    </section>
                                </li>
                            ))
                        }
                    </ol>
                </footer>
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