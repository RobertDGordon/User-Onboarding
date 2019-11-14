import React, { useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import styled from "styled-components";

const FormInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 270px;
    height: 420px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin: 30px;
    margin-bottom: 130px;
    padding: 10px;
    box-shadow: 2px 2px darkgray;
`

const UserForm = ({values, errors, touched, status})=> {

    const [users, setUsers] = useState ([]);

    return (
        <>
            <FormInput>
                <Form>
                    <Field type='text' name='name' placeholder='User name' />
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
    }

})(UserForm);

export default FormikUserForm;