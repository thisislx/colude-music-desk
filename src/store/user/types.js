const
    sagas = {
        SAGA_IS_LOGIN: 'user/saga_is_login',
        SAGA_CELLPHONE_LOGIN: 'user/saga_cellphone_login',
        SAGA_EMAIL_LOGIN: 'user/saga_email_login',
        SAGA_SEND_CAPTCHA: 'user/saga_send_captcha',
        SAGA_CAPTCHA_VERIFY: 'user/saga_captcha_verify',
        SAGA_LOGOUT: 'user/saga_logout',
        SAGA_GET_MY_DETAIL: 'user/saga_get_my_detail',
        SAGA_SIGN_IN: 'user/saga_sign_in',
        SAGA_GET_OTHER_USER: 'user/saga_other_user',
        SAGA_FOLLOW_STATE: 'user/saga_follow_state',
    },
    assist = {
        CHANGE_MY_DETAIL: 'user/change_my_detail',
        CHANGE_SIGN_IN_STATE: 'user/change_sign_in_state',
        CHANGET_OTHER_USER: 'user/change_other_user',
        CHANGE_LOGIN_STATE: 'user/change_login_state'
    }

export default Object.assign(sagas, assist, {
    INIT: 'user/init'
})