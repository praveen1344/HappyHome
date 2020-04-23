const User = {
    user:{
        type: undefined
    },
    modalWindowProps:{
        isOpen: false,
        message: "",
        isSuccess: true,
        redirectLink: undefined
    },
    showSpinner: false,
    isLoggedIn: false,
    userDetails: {
        name: ''
    }
}

export default User;