import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { insert, listVariables } from '../fetcher';
import SmallTextField from '../custom/SmallTextField';
import CustomBox from '../custom/CustomBox';
import { removeElement, replaceElement } from '../utils';

export default function VariableView() {

    const [nameVar, setName] = React.useState("")
    const [rows, setrows] = React.useState<any>([])
    const [values, setValues] = React.useState<any>([])

    const getValue = (value: any) => {
        return { __type__: 'value', name: value.name }
    }

    const insertVariable = () => {
        let variable = { __type__: 'variable', name: nameVar, options: [] }
        let options = values.map((value: any) => getValue(value))
        variable['options'] = options
        insert(variable, (json: any) => {
            fetchVariables()
            setName("")
            setValues([])
        })
    }

    const onNameTextFielChange = (event: any) => { setName(event.target.value) }
    const fetchVariables = () => { listVariables((json: any) => { setrows(json.data); }) }
    const addValue = () => { setValues(values.concat({ name: '' })) }
    const removeValue = (index: number) => { setValues(removeElement(values, index)) }
    const onChangeValue = (index: number, value: string) => { setValues(replaceElement(values, index, { name: value })) }

    useEffect(() => {
        async function componentDidMount() { fetchVariables() }
        componentDidMount()
    }, []);

    return (
        <React.Fragment>
            <CustomBox style={{ borderStyle: "solid", padding: '20px', borderWidth: '1px' }} >
                <SmallTextField
                    label="Nombre de la Variable"
                    value={nameVar}
                    onChange={onNameTextFielChange}
                />
                <Button variant="outlined" onClick={insertVariable}>submit</Button>
                <TableContainer component={Paper}>
                    <Typography variant="h6">Valores</Typography>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell><Button onClick={addValue} variant="outlined">+</Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.map((row: any, index: number) => (
                                <TableRow
                                    key={index.toString()}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <SmallTextField
                                            value={row.name}
                                            onChange={(event: any) => { onChangeValue(index, event.target.value) }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button
                                            onClick={() => { removeValue(index) }}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </CustomBox>
            <CustomBox style={{ borderStyle: "solid", padding: '20px', borderWidth: '1px 1px 1px 0px' }} >
                <TableContainer component={Paper}>
                    <Typography variant="h6">Variables</Typography>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Options</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.options.map((o: any) => o.name).join(', ')}</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CustomBox>
        </React.Fragment>
    );
}
