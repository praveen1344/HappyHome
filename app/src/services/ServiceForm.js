let serviceObject = {
    name: {
        identifier: 'name',
        type: 'text',
        label: 'Service Name',
        value: undefined
    },
    description: {
        identifier: 'description',
        type: 'text',
        label: 'Service Description',
        value: undefined
    },
    location:{
        identifier: 'location',
        type: 'text',
        label: 'Enter Service Location ',
        value: undefined
    },
    date:{
        identifier: 'date',
        label: 'Enter Servicing Date',
        type: 'datepicker',
        value: undefined
    },
    category:{
        identifier: 'category',
        type: 'text',
        label: 'Choose Category',
        value: {"id":1,"serviceCategoryName":"Plumbing","serviceCategoryDescription":"Services related to plumbing"},
        options: [{"id":1,"serviceCategoryName":"Plumbing","serviceCategoryDescription":"Services related to plumbing"},{"id":2,"serviceCategoryName":"Pet Services","serviceCategoryDescription":"Services related to Pets"},{"id":3,"serviceCategoryName":"Carpentry","serviceCategoryDescription":"Services related to Carpentry"},{"id":4,"serviceCategoryName":"House Cleaning","serviceCategoryDescription":"Services related to Cleaning"},{"id":5,"serviceCategoryName":"Beauty Services","serviceCategoryDescription":"Services related to Beauty"},{"id":6,"serviceCategoryName":"Other","serviceCategoryDescription":undefined}],
        dropDownValues: [{"id":1,"serviceCategoryName":"Plumbing","serviceCategoryDescription":"Services related to plumbing"},{"id":2,"serviceCategoryName":"Pet Services","serviceCategoryDescription":"Services related to Pets"},{"id":3,"serviceCategoryName":"Carpentry","serviceCategoryDescription":"Services related to Carpentry"},{"id":4,"serviceCategoryName":"House Cleaning","serviceCategoryDescription":"Services related to Cleaning"},{"id":5,"serviceCategoryName":"Beauty Services","serviceCategoryDescription":"Services related to Beauty"},{"id":6,"serviceCategoryName":"Other","serviceCategoryDescription": undefined}]
                            .map((ele) => ele.serviceCategoryName + (ele.serviceCategoryDescription != undefined ? (": " + ele.serviceCategoryDescription) : ""))
    },
    otherCategory:{
        identifier: 'otherCategory',
        type: 'text',
        label: 'Specify Other',
        value: undefined,
        toBeDisplayed: false
    },
    price:{
        identifier: 'price',
        type: 'number',
        label: 'Price Range',
        value: {"id":1,"serviceCategoryName":"< $10"},
        options: [{"id":1,"serviceCategoryName":"< $10"},{"id":2,"serviceCategoryName":"$10-$25"},{"id":3,"serviceCategoryName":"$25-50$"},{"id":4,"serviceCategoryName":"$50-$75"},{"id":5,"serviceCategoryName":"$75-$100"},{"id":6,"serviceCategoryName":"> $100"}],
        dropDownValues: [{"id":1,"serviceCategoryName":"< $10"},{"id":2,"serviceCategoryName":"$10-$25"},{"id":3,"serviceCategoryName":"$25-50$"},{"id":4,"serviceCategoryName":"$50-$75"},{"id":5,"serviceCategoryName":"$75-$100"},{"id":6,"serviceCategoryName":"> $100"}]
                            .map((ele) => ele.serviceCategoryName )
    },
    email:{
        identifier: 'email',
        label: 'Registered Email',
        value: undefined,
        type: 'email',
        isDisabled: true
    },
    status:{
        identifier: 'status',
        type: 'checkbox',
        label: 'Service Status',
        value: false
    },
    time:{
        identifier: 'time',
        type:'select',
        options:[{"id":1,"serviceCategoryName":'10AM-11AM'},{"id":2,"serviceCategoryName":'11AM-12PM'},{"id":3,"serviceCategoryName":'12PM-1PM'},{"id":4,"serviceCategoryName":'1PM-2PM'},{"id":5,"serviceCategoryName":'2PM-3PM'},{"id":6,"serviceCategoryName":'3PM-4PM'},{"id":7,"serviceCategoryName":'4PM-5PM'},{"id":8,"serviceCategoryName":'5PM-6PM'}],
        dropDownValues: [{"id":1,"serviceCategoryName":'10AM-11AM'},{"id":2,"serviceCategoryName":'11AM-12PM'},{"id":3,"serviceCategoryName":'12PM-1PM'},{"id":4,"serviceCategoryName":'1PM-2PM'},{"id":5,"serviceCategoryName":'2PM-3PM'},{"id":6,"serviceCategoryName":'3PM-4PM'},{"id":7,"serviceCategoryName":'4PM-5PM'},{"id":8,"serviceCategoryName":'5PM-6PM'}]
                            .map((ele) => ele.serviceCategoryName),
        mandatory: true,
        value: undefined
    },
    isFormSubmitted: false
}

const servicePostRequestObject = {
    "serviceCategory": undefined,
    "serviceCategoryOther": undefined,
    "serviceDate": undefined,
    "serviceDescription": undefined,
    "serviceLocation": undefined,
    "serviceName": undefined,
    "servicePrice": 0,
    "serviceStatus": undefined,
    "serviceTime": undefined,
    "userEmail": undefined
}

export {serviceObject,servicePostRequestObject};

// "serviceCategory": "string",
//   "serviceCategoryOther": "string",
//   "serviceDate": "2020-04-24T02:27:04.597Z",
//   "serviceDescription": "string",
//   "serviceLocation": "string",
//   "serviceName": "string",
//   "servicePrice": 0,
//   "serviceStatus": "string",
//   "serviceTime": "string",
//   "userEmail": "string"