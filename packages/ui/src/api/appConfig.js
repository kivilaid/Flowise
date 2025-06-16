import client from './client'

const getAppConfig = () => client.get('/app-config')

export default {
    getAppConfig
}