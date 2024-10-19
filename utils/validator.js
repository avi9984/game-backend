const validEmail = (Email) => {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) {
        return true;
    } else {
        return false;
    }
};

const validPwd = (Password) => {
    if (
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(
            Password,
        )
    ) {
        return true;
    } else {
        return false;
    }
};

const validPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]{1,3}[-.\s]?(\(?\d{1,4}\)?[-.\s]?){1,5}$/;
    return phoneRegex.test(phoneNumber);
};


module.exports = { validEmail, validPwd, validPhoneNumber }