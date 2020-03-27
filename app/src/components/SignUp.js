import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';
import './SignUp.css';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

function SignUpComponent() {
  return (
    <>
    <div className="sign-up-title">
        <h2>Let's get you signed up.</h2>
    </div>
    <div className="sign-up-form">
    <Formik
      validationSchema={schema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
          
          // When button submits form and form is in the process of submitting, submit button is disabled
         setSubmitting(true);
        
          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            console.log(values);
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      initialValues={{
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        isSubmitting
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="firstname"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                    {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="lastname"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                    {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} controlId="validationFormikEmail">
              <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                    {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormikConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
          
        <Button className="submit-button" type="submit" disabled={isSubmitting}>Submit form</Button>
        </Form>
      )}
    </Formik>
    </div>
    </>
  );
}

export default SignUpComponent;



// import LabelInput from '../common/LabelledInput';
// import PrimaryButton from '../common/PrimaryButton';

// const SignUp = () => {
//     return (
//         <div className='app-main-page-container grid'>
//             <h1 className="page-title">New Member Signup</h1>
//             <div className="signup-form-scrollwindow">
//                 <form className="sign-up-form">
//                     <LabelInput identifier="firstname" label="First Name" type="text"/>
//                     <LabelInput identifier="lastname" label="Last Name" type="text"/>
//                     <LabelInput identifier="password" label="Password" type="password"/>
//                     <LabelInput identifier="confirmpassword" label="Re-enter Password" type="password"/>
//                     <LabelInput identifier="contact" label="Phone" type="number"/>
//                     <LabelInput identifier="address1" label="Address Line 1" type="text"/>
//                     <LabelInput identifier="address2" label="Address Line 2" type="text"/>
//                     <LabelInput identifier="city" label="City" type="text"/>
//                     <LabelInput identifier="state" label="State" type="text"/>
//                     <LabelInput identifier="zipcode" label="ZipCode" type="number"/>
//                     <PrimaryButton label="Create Account"/>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default SignUp;