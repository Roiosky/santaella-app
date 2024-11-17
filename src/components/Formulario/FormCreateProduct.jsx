import React from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css';
import { axiosInstance } from '../../services/axios.config';

const FormCreateProduct = () => {
    const initialCredentials = {
        name: '',
        description: '',
        provider: '',
        stock: '',
        price: ''
    }

    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('el campo es obligatorio'),
        description: Yup.string().min(10, 'descripcion demasiado corta').max(100, 'descripcion demasiado larga').required('el campo es obligatorio'),
        provider: Yup.string().required('el campo es obligatorio'),
        stock: Yup.number().required('el campo es obligatorio'),
        price: Yup.number().required('el campo es obligatorio')
    });

    return (
        <div className='container'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values);
                    axiosInstance.post('/', values)
                        .then(r => {
                            if (r.status === 201) {
                                console.log(r);
                                setSubmitting(false);
                            } else {
                                throw new Error(`[${r.status}] error en la solicitud`);
                            }
                        })
                        .catch(err => console.log(err));
                }}
            >
                {({values, errors, touched, isSubmitting}) => (
                    <Form>
                        <FormBs.Group className='mb-3'>
                            <label htmlFor='name'> Nombre del producto </label>
                            <Field id='name' type='text' placeholder='Buzo' name='name' className='form-control field-input'/>
                            {errors.name && touched.name && <ErrorMessage name='name' component='div' />}
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='description'> Descripción </label>
                            <Field id='description' type='text' placeholder='Buzo cómodo ideal para invierno' name='description' className='form-control field-input'/>
                            {errors.description && touched.description && <ErrorMessage name='description' component='div' />}
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='provider'> Proveedor </label>
                            <Field id='provider' type='text' placeholder='Proveedor del producto' name='provider' className='form-control field-input'/>
                            {errors.provider && touched.provider && <ErrorMessage name='provider' component='div' />}
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='stock'> Stock </label>
                            <Field id='stock' type='number' placeholder='5' name='stock' className='form-control field-input'/>
                            {errors.stock && touched.stock && <ErrorMessage name='stock' component='div' />}
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='price'> Precio </label>
                            <Field id='price' type='number' placeholder='8000' name='price' className='form-control field-input'/>
                            {errors.price && touched.price && <ErrorMessage name='price' component='div' />}
                        </FormBs.Group>

                        <Button className='btn btn-primary' type="submit">Cargar producto</Button>
                        {isSubmitting && <p> Enviando producto </p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FormCreateProduct;
