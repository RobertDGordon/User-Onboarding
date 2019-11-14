import React, { useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import styled from "styled-components";
// import { createHash } from "crypto";

const FormInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 250px;
    height: 250px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin: 30px auto;
    padding: 10px 20px;
    box-shadow: 2px 2px darkgray;
    color:black;
    button{
        margin-top: 30px;
        width: 60%;
        height: 40px;
    }
`

const ErrorMsg = styled.div`
    color: red;
    font-size: 0.8rem;
`

const Dropdown = styled.div`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin: 10px 0px;
    font-size: 0.9rem;
    text-align: center;
    .select{
        margin: 0 10px;
    }

`

const Checkbox = styled.div `
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* border: 1px solid red; */
    margin-right: 7px;
    font-size: 0.8rem;
    /* text-align: center; */
`

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
`


const UserCard = styled.div `
    display: flex;
    font-size: 1rem;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    /* text-align: center; */
    /* width: 250px; */
    /* height: 250px; */
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
    margin: 30px;
    /* margin-bottom: 130px; */
    padding: 10px 20px;
    box-shadow: 2px 2px darkgray;
    color:black;
    li {
        margin: 5px;
    }

    .heading{
        font-weight: bold;
    }
    .email {
        font-style: italic;
    }
`

const UserForm = ({values, errors, touched, status})=> {

    const [users, setUsers] = useState ([]);

    useEffect(() => {
        status && setUsers(user => [...users, status])
    },[status])

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
                    <Dropdown>
                        Know your role:
                        <Field as="select" name="role" className='select'>
                        <option value="Jabroni">Jabroni</option>
                        <option value="Dropbear">Drop Bear</option>
                        <option value="Snipe">Snipe</option>
                        </Field>
                    </Dropdown>    
                    <Checkbox>
                        <label>
                        Make me an offer I can't refuse
                        <Field type="checkbox" name="tos" checked={values.tos} />
                        {touched.tos && errors.tos && (<ErrorMsg>{errors.tos}</ErrorMsg>)}
                        </label>
                    </Checkbox>
                    <button type='submit'>Log In</button>
                </Form>
            </FormInput>
            <Cards>
            {users.map(user => (
                <UserCard key={user.id}>
                    <ul>
                        <li><span className="heading">Name:</span> {user.name}</li>
                        <li><span className="heading">Email:</span> <span className='email'>{user.email}</span></li>
                        <li><span className="heading">Role:</span> {user.role}</li>
                    </ul>
                </UserCard>
                ))}
            </Cards>
        </>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, role, tos}){
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || 'Jabroni',
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('User name required!'),
        email: Yup.string('waffle@syrup.com', 'Email is already taken').email().required('Not a valid email!'),
        password: Yup.string().min(3, 'Minimum 3 characters').required('Incorrect password!'),
        tos: Yup.bool().oneOf([true],('Trust me...'))
    }),
    handleSubmit(values, {setStatus}){
    axios.post('https://reqres.in/api/users/', values)
    .then (res =>{
        setStatus(res.data);
        console.log(res)
    })
    .catch (err => console.log(err.response))
    }
})(UserForm);

export default FormikUserForm;