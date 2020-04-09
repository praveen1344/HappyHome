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
        address1: {
            identifier: 'address1',
            label: 'Address Line 1',
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


export default SignUpForm;