/**
 * @memberof module:Functions
 * @class provide api for accessing local stored information
 */
export const storeUsername = (name) => {
    return{
        type: 'SET_USERNAME',
        data: name
    }
}

export const getUsername = () => {
    return{
        type: 'GET_USERNAME'
    }
}

export const storeName = (name) => {
    return{
        type: 'SET_NAME',
        data: name
    }
}

export const getName = () => {
    return{
        type: 'GET_NAME'
    }
}

export const storeLevel = (level) => {
    return{
        type: 'SET_LEVEL',
        data: level
    }
}

export const getLevel = () => {
    return{
        type: 'GET_LEVEL'
    }
}

export const storeHospitalId = (id) => {
    return{
        type: 'SET_HOSPITALID',
        data: id
    }
}

export const getHospitalId = () => {
    return{
        type: 'GET_HOSPITALID'
    }
}

export const storeTrustId = (id) => {
    return{
        type: 'SET_TRUSTID',
        data: id
    }
}

export const getTrustId = () => {
    return{
        type: 'GET_TRUSTID'
    }
}

export const storeExpireTime = (time) => {
    return{
        type: 'SET_EXPIRETIME',
        data: time
    }
}

export const getExpireTime = () => {
    return{
        type: 'GET_EXPIRETIME'
    }
}

export const storePassword = (pwd) => {
    return{
        type: 'SET_PASSWORD',
        data: pwd
    }
}

export const getPassword = () => {
    return{
        type: 'GET_PASSWORD'
    }
}

export const getSelection = () => {
    return{
        type: 'GET_SELECTION'
    }
}

export const storeSelection = (selection) => {
    return{
        type: 'SET_SELECTION',
        data: selection
    }
}

export const pushSelection = (selection) => {
    return{
        type: 'PUSH_SELECTION',
        data: selection
    }
}

export const getMailData = () => {
    return{
        type: 'GET_MAILDATA'
    }
}

export const storeMailData = (mails) => {
    return{
        type: 'SET_MAILDATA',
        data: mails
    }
}

export const getRedirection = () => {
    return{
        type: 'GET_REDIRECTION'
    }
}

export const storeRedirection = (url) => {
    return{
        type: 'SET_REDIRECTION',
        data: url
    }
}