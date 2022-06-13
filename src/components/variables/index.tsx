import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper';
import {
    Alert,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { insert, listVariables, update } from '../fetcher';
import SmallTextField from '../custom/SmallTextField';
import { removeElement, replaceElement } from '../utils';
import { AddButton, DeleteButton, SaveButton, EditButton } from '../custom/CustomButtons';
import { CustomTypography, TableHeader } from '../custom/CustomTypographys';

export default function VariableView() {

    const [nameVar, setName] = React.useState("")
    const [rows, setrows] = React.useState<any>([])
    const [values, setValues] = React.useState<any>([])
    const [msg, setMsg] = React.useState<any>(null)
    const [isCreationMode, setIsCreationMode] = React.useState<any>(true)
    const [editVar, setEditVar] = React.useState<any>(null)

    const getValue = (value: any) => {
        return { __type__: 'value', name: value.name }
    }

    function hasDuplicates(array: any) {
        return (new Set(array)).size !== array.length;
    }

    const insertVariable = () => {
        let erroMsg = isValid()
        if (erroMsg != null) {
            setMsg({ severity: 'error', text: 'El campo "Nombre de la Variable" no puede estar vacío!' })
            return;
        }

        let variable = { __type__: 'variable', name: nameVar, options: [] }
        let options = values.map((value: any) => getValue(value))
        variable['options'] = options
        insert(variable, (json: any) => {
            fetchVariables()
            setName("")
            setValues([])
            setMsg({ severity: 'success', text: 'Variable registrado Exitosamente!' })
        })
    }

    const onNameTextFielChange = (event: any) => { setName(event.target.value) }
    const fetchVariables = () => { listVariables((json: any) => { setrows(json.data); }) }
    const addValue = () => { setValues(values.concat({ name: '' })) }
    const removeValue = (index: number) => { setValues(removeElement(values, index)) }
    const onChangeValue = (index: number, value: string) => { setValues(replaceElement(values, index, { name: value })) }

    const onEditVariable = (variable: any) => {
        setName(variable.name)
        setValues(variable.options)
        setEditVar({ ...variable })
        setIsCreationMode(false)
    }

    const editVariable = () => {
        let erroMsg = isValid()
        if (erroMsg != null) {
            setMsg({ severity: 'error', text: 'El campo "Nombre de la Variable" no puede estar vacío!' })
            return;
        }

        editVar.name = nameVar;
        editVar.options = values;
        update({ _type_: 'variable', ...editVar }, (json: any) => {
            setMsg({ severity: 'success', text: 'Variable Actualizada Exitosamente!' })
        })
    }

    const isValid = () => {
        if (nameVar === '') return 'El campo "Nombre de la Variable" no puede estar vacío!'
        if (values.length < 2) return 'Deben existir por lo menos 2 valores!'
        for (let index in values) {
            if (values[index].name === '') return 'Ningún valor puede estar vacío'
        }
        if (hasDuplicates(values.map((v: any) => v.name))) return 'No pueden existir valores duplicados'
        return null;
    }

    useEffect(() => {
        async function componentDidMount() { fetchVariables() }
        componentDidMount()
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomTypography>Variables</CustomTypography>
                    {(msg != null) ? <Alert variant="outlined" severity={msg.severity} onClose={() => { setMsg(null) }}>{msg.text}</Alert> : ''}
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <SmallTextField
                                label="Nombre de la Variable"
                                value={nameVar}
                                onChange={onNameTextFielChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {(isCreationMode) ? <SaveButton onClick={insertVariable} /> : <EditButton onClick={editVariable} />}
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" size="small">
                                    <colgroup>
                                        <col width="80%" />
                                        <col width="20%" />
                                    </colgroup>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><TableHeader>Nombre del valor</TableHeader></TableCell>
                                            <TableCell>
                                                <AddButton onClick={addValue} />
                                            </TableCell>
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
                                                    <DeleteButton onClick={() => { removeValue(index) }} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper} style={{ padding: '20px' }}>
                        <Table aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><TableHeader>Nombre de la Variable</TableHeader></TableCell>
                                    <TableCell><TableHeader>Acciones</TableHeader></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any) => (
                                    <TableRow hover
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell><EditButton onClick={() => { onEditVariable(row) }} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}
