const assist = {
    GET_IS_LOGIN: 'user/get_is_login',
    GET_DETAIL: 'user/get_detail',
    CHANGE_USER_ID: 'user/change_user_id',
    CHANGA_TOAST: 'user/change_toast',
    CHANGE_SIGN_IN_STATE: 'user/change_sign_in_state',
    CHANGET_OTHER_USER: 'user/change_other_user',
}

export default Object.assign({
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
}, assist)