/* eslint-disable react/prop-types */
import React, { memo, useEffect, useMemo, useCallback } from 'react'
import styles from './style'
import { actionsCreator as bannerAc } from 'store/banner'
import { actionsCreator as songMenuAc } from 'store/song-menu'
import { connect } from 'react-redux'
import _paths from 'config/paths'
import { _recommendSongId } from 'config/song-menu'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'

import Slide from 'base-ui/slide'
import SongMenu, { SongMenuItem } from 'components/song-menu'
import everyday_img from 'assets/imgs/everyday-recommend.jpg'

function Recommend(props) {
    const
        { isLogin, themeName } = props,
        {
            banners_imm,
            recommendSongMenu_imm } = props,
        {
            getBanners,
            getRecommendSongMenu,
        } = props,
        history = useHistory(),
        theme = useTheme(themeName),
        banners = useMemo(() => banners_imm.toJS(), [banners_imm]),
        recommendSongMenu = useMemo(() => recommendSongMenu_imm.toJS(), [recommendSongMenu_imm]),
        toSongDetail = useCallback(id => {
            history.push(_paths.playlist + id)
        }, [history])

    useEffect(() => {
        getRecommendSongMenu(isLogin)
    }, [isLogin, getRecommendSongMenu])

    useEffect(() => {
        getBanners()
    }, [])

    return (
        <>
            <Slide height={16} list={banners} />
            <section className={`${styles.songMenu}`}>
                <h1 className={`${theme.border_v1} ${theme.fontColor_v2}`}>推荐歌单</h1>
                <SongMenu onClick={toSongDetail}>
                    {
                        isLogin ? <SongMenuItem
                            id={_recommendSongId}
                            img={everyday_img}
                            name={'每日推荐'}
                        /> : null
                    }

                    {
                        recommendSongMenu.map(item => (
                            <SongMenuItem
                                key={item.id}
                                id={item.id}
                                count={item.playcount}
                                img={item.picUrl || item.coverImgUrl}
                                name={item.name}
                            />
                        ))
                    }
                </SongMenu>
            </section>
        </>
    )
}



const
    mapState = state => {
        const
            themeName = state.getIn(['theme', 'name']),
            isLogin = state.getIn(['user', 'isLogin']),
            banners_imm = state.getIn(['banner', 'songBanners']),
            songMenu = state.get('songMenu'),
            recommendSongMenu_imm = songMenu.get('recommendMenu')

        return {
            isLogin,
            themeName,
            banners_imm,
            recommendSongMenu_imm,
        }
    },
    mapDispatch = dispatch => ({
        getBanners() {
            dispatch(bannerAc.getBanners())
        },
        getRecommendSongMenu(isLogin) {
            dispatch(songMenuAc.getRecommendMenu(isLogin))
        }
    })

export default connect(mapState, mapDispatch)(memo(Recommend))