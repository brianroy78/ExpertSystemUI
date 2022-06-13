import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react'

export default function CrudTable(props: any) {
    const [tableProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6">Variables</Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        {tableProps.headers.map((header: any, index: any) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableProps.rows.map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.keys(row).map((key, index) => {
                                return (
                                    <TableCell key={index} component="th" scope="row">{row[key]}</TableCell>
                                );
                            })}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}