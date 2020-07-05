// 服务于saga
const assist = {
    CHANGE_TOAST: 'global/change_toast',
}
const sagas = {
    SAGA_SHOW_TOAST: 'global/saga_show_toast',
}
export default Object.assign({
    TOGGLE_LOADING: 'global/toggle_loading',
    SHOW_CONFIRM: 'global/show_confirm',
}, assist, sagas)