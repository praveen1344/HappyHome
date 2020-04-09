let SignUpForm = 
    {
        firstName: {
            identifier: 'firstName',
            label:'First Name',
            type: 'text',
            mandatory: true,
            value: '',
            isError: false,
            errorMessage: '',
            validations: {
                'maxSize':30,
                'mandatory': true
            }
        },
        lastName: {
            identifier: 'lastName',
            label: 'Last Name',
            type: 'text',
            mandatory: true,
            value: '',
            validations: {
                'maxSize':30,
                'mandatory': true
            }
        },
        email: {
            identifier: 'email',
            label: 'Email',
            type: 'text',
            mandatory: true,
            value: '',
            isError: false,
            errorMessage: '',
            validations: {
                'isEmail': true,
                'mandatory': true
            }
        },
        password: {
            identifier: 'password',
            label: 'Password',
            type: 'password',
            mandatory: true,
            value: '',
            validations: {
                'mandatory': true
            }
        },
        confirmpassword: {
            identifier: 'confirmpassword',
            label: 'Re-Enter Password',
            type: 'password',
            mandatory: true,
            value: '',
            validations: {
                'mandatory': true
            }
        },
        contact: {
            identifier: 'contact',
            label: 'Contact Information',
            type: 'number',
            mandatory: false,
            value: '',
            validation:{
                'phone': true
            }
        },
        address: {
            identifier: 'address',
            label: 'Address',
            type: 'text',
            mandatory: false,
            value: ''
        },
        bio: {
            identifier: 'bio',
            label: 'Biography',
            type: 'text',
            mandatory: false,
            value: ''
        },
        city: {
            identifier: 'city',
            label: 'City',
            type: 'text',
            mandatory: false,
            value: ''
        },
        state: {
            identifier: 'state',
            label: 'State',
            type: 'text',
            mandatory: false,
            value: ''
        },
        pincode: {
            identifier: 'pincode',
            label: 'Pincode',
            type: 'number',
            mandatory: false,
            value: '',
            validation:{
                'pincode': true
            }
        },
        isFormValid: true
    }

let UpdateProfileForm = 
    {
        firstName: {
            identifier: 'firstName',
            label:'First Name',
            type: 'text',
            mandatory: true,
            value: '',
            isError: false,
            errorMessage: '',
            validations: {
                'maxSize':30,
                'mandatory': true
            }
        },
        email: {
            identifier: 'email',
            label: 'Email',
            type: 'text',
            mandatory: false,
            value: '',
        },
        lastName: {
            identifier: 'lastName',
            label: 'Last Name',
            type: 'text',
            mandatory: true,
            value: '',
            validations: {
                'maxSize':30,
                'mandatory': true
            }
        },
        contact: {
            identifier: 'contact',
            label: 'Contact Information',
            type: 'number',
            mandatory: false,
            value: '',
            validation:{
                'phone': true
            }
        },
        address: {
            identifier: 'address',
            label: 'Address',
            type: 'text',
            mandatory: false,
            value: ' '
        },
        bio: {
            identifier: 'bio',
            label: 'Biography',
            type: 'text',
            mandatory: false,
            value: ''
        },
        dob: {
            identifier: 'dob',
            label: 'Date of Birth(YYYY/MM/DD)',
            type: 'text',
            mandatory: false,
            isError: false,
            errorMessage: '',
            value: new Date("03/25/2015"),
            validation:{
                'dob': true
            }
        },
        state: {
            identifier: 'state',
            label: 'State',
            type: 'text',
            mandatory: false,
            value: ''
        },
        pincode: {
            identifier: 'pincode',
            label: 'Pincode',
            type: 'number',
            mandatory: false,
            value: '',
            validation:{
                'pincode': true
            }
        },
        isFormValid: true
    }


export {SignUpForm,UpdateProfileForm} ;