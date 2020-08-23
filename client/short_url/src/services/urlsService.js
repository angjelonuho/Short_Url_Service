import Api from '@/services/Api'

export default {
    post (url) {
        return Api().post('url', url)
    },
    get(){
        return Api().get('api/getUrls')
    }
}