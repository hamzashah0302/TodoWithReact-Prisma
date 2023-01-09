
const httpHeader = () => {
    let token = ''
    if (localStorage.getItem('user_data'))
        token = JSON.parse(localStorage.getItem('user_data')).token
    return {
        headers: {
            "x-access-token": token
        }
    }

};

export default httpHeader;