import React, { useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import styled from "styled-components";
import { createHash } from "crypto";

const FormInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 270px;
    height: 420px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin: 30px;
    margin-bottom: 130px;
    padding: 10px;
    box-shadow: 2px 2px darkgray;
    color:black;
`

const ErrorMsg = styled.div`
    color: red;
    font-size: 0.8rem;
`

const Checkbox = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
    font-size: 0.8rem;
    text-align: center;

`

const UserForm = ({values, errors, touched, status})=> {

    const [users, setUsers] = useState ([]);

    return (
        <>
            <FormInput>
                <Form>
                    <Field type='text' name='name' placeholder='User name' />
                    {touched.name && errors.name && (<ErrorMsg>{errors.name}</ErrorMsg>)}
                    <Field type='email' name='email' placeholder='Email' />
                    {touched.email && errors.email && (<ErrorMsg>{errors.email}</ErrorMsg>)}
                    <Field type='password' name='password' placeholder='Password' />
                    {touched.password && errors.password && (<ErrorMsg>{errors.password}</ErrorMsg>)}
                    <Checkbox>
                        <label>
                        Make me an offer I can't refuse
                        <Field type="checkbox" name="tos" checked={values.tos} />
                        {touched.tos && errors.tos && (<ErrorMsg>{errors.tos}</ErrorMsg>)}
                        </label>
                    </Checkbox>
                    <button>Log In</button>
                </Form>
            </FormInput>
        </>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('User name required!'),
        email: Yup.string().required('Not a valid email!'),
        password: Yup.string().required('Incorrect password!'),
        tos: Yup.bool().oneOf([true],('Trust me...'))
      }),

})(UserForm);

export default FormikUserForm;