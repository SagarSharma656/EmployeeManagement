

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

export const validateMobile = (mob) => {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(mob)
}