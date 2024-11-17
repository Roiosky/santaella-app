import React from 'react'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import { axiosInstance } from '../../services/axios.config';
import Swal from 'sweetalert2';

// Valores iniciales del formulario
const initialCredentials = {
    name: '',
    description: '',
    provider: '',
    stock: '',
    price: ''
};

// Esquema de validación con Yup
const formSchema = Yup.object().shape({
    name: Yup.string().min(4, 'nombre demasiado corto').max(20, 'nombre demasiado largo').required('el campo es obligatorio'),
    description: Yup.string().min(10, 'descripcion demasiado corta').max(100, 'descripcion demasiado larga').required('el campo es obligatorio'),
    provider: Yup.string().required('el campo es obligatorio'),
    stock: Yup.number().required('el campo es obligatorio'),
    price: Yup.number().required('el campo es obligatorio')
});

const FormCreateProduct = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axiosInstance.post('/', values);

            if (response.status === 201) {
                // Mostrar alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto creado con éxito!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Resetear el formulario
                resetForm();
            } else {
                throw new Error(`[${response.status}] error en la solicitud`);
            }
        } catch (err) {
            console.error('Error al crear el producto:', err);

            // Mostrar alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el producto',
                text: err.message || 'Hubo un problema al intentar guardar el producto. Por favor, intenta nuevamente.',
                confirmButtonText: 'Cerrar'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='container'>
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormBs.Group className='mb-3'>
                            <label htmlFor='name'> Nombre del producto </label>
                            <Field id='name' type='text' placeholder='Buzo' name='name' className='form-control field-input'/>
                            <ErrorMessage name='name' component='div' className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='description'> Descripción </label>
                            <Field id='description' type='text' placeholder='Buzo cómodo ideal para invierno' name='description' className='form-control field-input'/>
                            <ErrorMessage name='description' component='div' className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='provider'> Proveedor </label>
                            <Field id='provider' type='text' placeholder='Proveedor del producto' name='provider' className='form-control field-input'/>
                            <ErrorMessage name='provider' component='div' className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='stock'> Stock </label>
                            <Field id='stock' type='number' placeholder='5' name='stock' className='form-control field-input'/>
                            <ErrorMessage name='stock' component='div' className="text-danger" />
                        </FormBs.Group>

                        <FormBs.Group className='mb-3'>
                            <label htmlFor='price'> Precio </label>
                            <Field id='price' type='number' placeholder='8000' name='price' className='form-control field-input'/>
                            <ErrorMessage name='price' component='div' className="text-danger" />
                        </FormBs.Group>

                        <Button className='btn btn-primary' type="submit" disabled={isSubmitting}>Cargar producto</Button>
                        {isSubmitting && <p>Enviando producto...</p>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;
