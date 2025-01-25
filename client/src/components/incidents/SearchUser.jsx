import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useRequestPost } from '../../hooks/useRequestPost';
import { useState } from 'react';

const searchUserSchema = Yup.object().shape({
    nameCompleted: Yup.string().required('El campo de nombre completo es obligatorio').min(0, 'El nombre completo no debe ser menor a 15 caracteres'),
});

export const SearchUser = ({ setUserIncidentState, onActiveSearchUser }) => {
    const [ data, setData ] = useState( null );
    const { isLoading, sendRequestToServer } = useRequestPost();

    return (
        <div
            onClick={ onActiveSearchUser }
            className="h-screen w-screen fixed top-0 left-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div
                    onClick={ ( e ) => e.stopPropagation() }
                    className="h-[85%] w-11/12 flex justify-center bg-gray-100 border-2 border-gray-300 rounded-md">
                        <Formik
                            initialValues={{
                                nameCompleted: ''
                            }}
                            validationSchema={ searchUserSchema }
                            onSubmit={ async ( values ) => {
                                console.log( values );
                            }}
                        >
                            {
                                ({ handleSubmit, setFieldValue }) => (
                                    <Form className="h-10 w-11/12 flex items-center bg-gray-200 mt-5 rounded-full">
                                        <label htmlFor="inputSearchUser">
                                            <FontAwesomeIcon icon={ faSearch } className="text-gray-700 pl-3 pr-2" />
                                        </label>

                                        <Field
                                            type="text"
                                            name="nameCompleted"
                                            id="inputSearchUser"
                                            className="h-full w-full bg-transparent pl-1 box-border outline-none font-sans font-semibold placeholder:font-normal"
                                            placeholder="Buscar usuario"
                                            onChange={ event => {
                                                setFieldValue( 'nameCompleted', event.target.value );
                                                handleSubmit();
                                            }}
                                        />

                                        <ErrorMessage name="name" component="div" />
                                    </Form>
                                )
                            }
                        </Formik>
                </div>
        </div>
    )
}

SearchUser.propTypes = {
    setUserIncidentState: PropTypes.func.isRequired,
    onActiveSearchUser: PropTypes.func.isRequired
}
