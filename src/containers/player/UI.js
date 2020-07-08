/* eslint-disable react/prop-types */
import React, { useRef, useState, useCallback, useEffect } from 'react'
import styles from './style'
import { _shrinkIconConig, _hotCommentsConfig, _commentsConfig, _commentInputCofig } from './config'
import { computeArtist } from 'tools/media'
import CD from 'base-ui/cd'
import Lyric from 'components/lyric'
import Comment, { CommentInput } from 'components/comment'
import Pagination from 'base-ui/pagination'
import OpcityWrap from 'base-ui/fixed-wrap/opcity'

function UI(props) {
    const
        {
            playing,
            commentsPageCount,
            currentPlayTime,
            currentSong,
            currentSongId,
            lyric,
            comments,
            briefHotComments,
            theme
        } = props,
        {
            likeCommentHandle,
            toSource,
            exitedHandle,
            doubleClickLyricHandle,
            setCommentsPageCount,
            makeComment,
            replyComment,
        } = props,
        [isShow, setShow] = useState(true),
        [commentInputConfig, setCommentInputConfig] = useState(Object.prototype),
        commentRef = useRef(null),
        lockCommentScroll = useRef(true),  /* 每次歌曲初始化锁定评论滚动 */
        currentComment = comments[commentsPageCount] || [],
        commentTotal = currentComment[0] ? currentComment[0].total : 0,
        makeCommentHandle = useCallback(() => {
            setCommentInputConfig(_commentInputCofig.make)
        }, []),
        replyHandle = useCallback((commentId, nickname) => {
            setCommentInputConfig({
                ..._commentInputCofig.reply,
                commentId,
                placeholder: _commentInputCofig.reply.placeholder + nickname
            })
        }, []),
        submitEntry = useCallback(content => {     /* @回复某人 @发送新评论 */
            const { type, commentId } = commentInputConfig
            if (type === _commentInputCofig.make.type) makeComment(currentSongId, content)
            else if (type === _commentInputCofig.reply.type)
                replyComment(currentSongId, content, commentId)
        }, [commentInputConfig, makeComment, replyComment, currentSongId])

    /* 切换歌曲锁定滚动条 */
    useEffect(() => {
        lockCommentScroll.current = true
    }, [currentSongId, lockCommentScroll])

    /* 歌词滚动到顶部 */
    useEffect(() => {
        if (lockCommentScroll.current) lockCommentScroll.current = false
        else commentRef.current.scrollIntoView(true)
    }, [commentRef, commentsPageCount, lockCommentScroll])

    return (
        <OpcityWrap
            show={isShow}
            className={styles.wrap}
        >
            <header>
                {/* 缩小 */}
                <button
                    onClick={e => setShow(false)}
                    className={`${_shrinkIconConig.className} ${theme.fontColor_r1}` +
                        ` ${styles.shrink} ${theme.back_r4} ${theme.boxShadow_v1}`}
                    dangerouslySetInnerHTML={{ __html: _shrinkIconConig.icon }}
                >
                </button>

                <section className={styles.cd}>
                    <CD
                        img={currentSong.al.picUrl}
                        state={playing}
                    />
                    <footer className={styles.cdBtn}>
                        <button className={`${theme.border_v1} ${theme.back_r1} pointer`}>喜欢</button>
                        <button className={`${theme.border_v1} ${theme.back_r1} pointer`}>收藏</button>
                        <button className={`${theme.border_v1} ${theme.back_r1} pointer`}>分享</button>
                    </footer>
                </section>
                <section className={styles.headerR}>
                    <h1>
                        {currentSong.name}
                    </h1>
                    <section className={styles.otherData}>
                        <span className={`no-wrap`}>专辑:
                                <span className={`pointer ${theme.fontColor_v2}`}>
                                {currentSong.al.name}
                            </span>
                        </span>
                        <span className={`no-wrap ${styles.artist}`}>歌手:
                                <span className={`pointer ${theme.fontColor_v2}`}>
                                {computeArtist(currentSong.ar)}
                            </span>
                        </span>
                        <span className={`no-wrap`}>来源:
                                <span
                                className={currentSong.source.id + 1
                                    ? `${theme.fontColor_v2} pointer `
                                    : `${theme.fontColor_v1} not-allowed`
                                }
                                onClick={toSource}
                            >
                                {currentSong.source.name}
                            </span>
                        </span>
                    </section>
                    <section className={styles.lyric}>
                        <Lyric
                            lyric={lyric}
                            playtime={currentPlayTime}
                            onDoubleClick={doubleClickLyricHandle}
                        />
                    </section>
                </section>
            </header>
            <footer >
                <section className={styles.footerL}>
                    <CommentInput
                        config={commentInputConfig}
                        onSubmit={submitEntry}
                        onClick={makeCommentHandle}
                    />
                    <article
                        className={styles.comment}
                        ref={commentRef}
                    >
                        {
                            commentsPageCount
                                ? null
                                : <Comment
                                    list={briefHotComments}
                                    title={`${_hotCommentsConfig.title}(${briefHotComments.length})`}
                                    showMore={briefHotComments[0] && briefHotComments[0].more}
                                    onMore={e => console.log('onMore()')}
                                    onReply={replyHandle}
                                />
                        }
                        <Comment
                            list={comments[commentsPageCount] || []}
                            title={`${_commentsConfig.title}(${commentTotal})`}
                            onReply={replyHandle}
                            onLike={likeCommentHandle}
                        />
                        <footer className={styles.pagination}>
                            <Pagination
                                defaultValue={commentsPageCount}
                                total={commentTotal}
                                pageSize={_commentsConfig.pageSize}
                                onChange={setCommentsPageCount}
                            />
                        </footer>
                    </article>
                </section>
                <section className={styles.footerR}>推荐歌单</section>
            </footer>
        </OpcityWrap>
    )
}

export default UI