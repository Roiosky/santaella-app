import React from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';

const Table = ({ items, editItem, deleteItem }) => {
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'center' }}>Modificar</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <ItemTable
                        key={i}
                        item={item}
                        editItem={editItem}
                        deleteItem={deleteItem} // Pasando deleteItem
                    />
                ))}
            </tbody>
        </TableBs>
    );
};

export default Table;
