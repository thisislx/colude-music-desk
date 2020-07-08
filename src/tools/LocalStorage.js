export default class LocalStorage {
    constructor(key) {
        this.key = 'cloud-music-desk@' + key
        this.kid = null    /* 保存异步 */
    }

    get(key = '') {
        return JSON.parse(localStorage.getItem(`${this.key}/${key}`))
    }

    set(value, key = '') {
        if (this.kid) clearTimeout(this.kid)
        this.kid = setTimeout(() => {
            localStorage.setItem(`${this.key}/${key}`, JSON.stringify(value))
        }, 5000)
    }
}