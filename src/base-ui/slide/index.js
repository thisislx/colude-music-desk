import React, { memo, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import './style'
import { debounce } from 'tools'

function Slide(props) {
    const
        { height = 10, list = [] } = props,
        style = useMemo(() => ({ height: `${height}rem` }), [height]),
        swiperHandle = useCallback(debounce(() => {
            new Swiper('.swiper-container', {
                loop: true,     //循环
                autoplay: {      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
                    delay: 5000,
                    disableOnInteraction: false,    //户操作swiper之后，是否禁止autoplay。默认为true：停止。
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,    // 允许点击跳转
                },
                centeredSlides: true,
                slidesPerView: 1.5,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }), [])

    useEffect(() => {
        swiperHandle()
    }, [list])

    useEffect(() => {
        window.addEventListener('resize', swiperHandle)
        return () => {
            window.removeEventListener('resize', swiperHandle)
        }
    }, [swiperHandle])
    return (
        <div className={`swiper-container`} style={style} >
            <div className="swiper-wrapper">
                {
                    list.map((item, key) => (
                        <div
                            key={key}
                            className="swiper-slide" style={{ backgroundImage: `url(${item.imageUrl})` }}
                        >
                        </div>
                    ))
                }
            </div>
            <div className='swiper-pagination'></div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </div>
    )
}

Slide.propTypes = {
    height: PropTypes.number,
    list: PropTypes.array,
}
export default memo(Slide)