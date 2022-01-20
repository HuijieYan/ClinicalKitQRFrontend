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
