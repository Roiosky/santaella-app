import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';

const ShowProducts = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosInstance.get('/')
            .then(r => {
                if (r.status === 200) {
                    setItems(r.data);
                } else {
                    throw new Error(`[${r.status}] ERROR en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const editItem = (id, data) => {
        console.log('editando producto');
        axiosInstance.put(`/${id}`, data)
            .then(r => {
                if (r.status === 200) {
                    const updatedItems = items.map(item => {
                        if (item.id === r.data.id) {
                            return r.data;
                        }
                        return item;
                    });
                    setItems(updatedItems);
                } else {
                    throw new Error(`[ERROR ${r.status}] Error en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    };

    const deleteItem = (id) => {
        // Confirmación antes de eliminar
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            axiosInstance.delete(`/${id}`)
                .then(r => {
                    if (r.status === 200) {
                        setItems(items.filter(item => item.id !== id));
                    } else {
                        throw new Error(`[ERROR ${r.status}] Error en la solicitud de eliminación`);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Productos en sistema</h1>

            <div className='container mt-3'>
                {items.length > 0 ? 
                    <Table items={items} editItem={editItem} deleteItem={deleteItem} />
                    : 
                    <h2 style={{ textAlign: 'center' }}>No hay productos en el sistema</h2>
                }
            </div>
        </div>
    );
};

export default ShowProducts;
