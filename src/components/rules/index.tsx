import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper';
import { Alert, Button, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { insert, listRules, listVariables } from '../fetcher';
import { CustomSelect } from '../custom/CustomSelect';
import { removeElement, replaceElement } from '../utils';
import { CustomTypography } from '../custom/CustomTypographys';
import { AddButton, DeleteButton, SaveButton } from '../custom/CustomButtons';

export default function RulesView() {

    const [rules, setRules] = React.useState<any>([])
    const [variables, setVariables] = React.useState<any>([])
    const [premises, setPremises] = React.useState<any>([])
    const [conclusions, setConclusions] = React.useState<any>([])

    // const [statementVariable, setStatementVariable] = React.useState<any>('')
    // const [statementValues, setStatementValues] = React.useState<any>([])
    // const [statementValue, setStatementValue] = React.useState<any>('')

    const [msg, setMsg] = React.useState<any>(null)

    const getFact = (premise: any) => {
        return {
            _type_: 'fact',
            value_id: premise.value.id,
            variable_id: premise.variable.id
        }
    }

    const insertRule = () => {
        let rule = { _type_: 'rule', premises: [], conclusions: {} }
        rule.premises = premises.map((value: any) => getFact(value))
        rule.conclusions = conclusions.map((conclusion: any) => getFact(conclusion))
        insert(rule, (json: any) => {
            fetchRules();
        })
    }

    const fetchRules = () => { listRules((json: any) => { setRules(json.data); }) }

    const addPremise = () => {
        let subValue = { variable: {}, value: {} }
        setPremises(premises.concat(subValue))
    }

    const addConclusion = () => {
        let subValue = { variable: {}, value: {} }
        setConclusions(conclusions.concat(subValue))
    }

    const removeValue = (index: number) => { setPremises(removeElement(premises, index)) }
    const removeConclusion = (index: number) => { setConclusions(removeElement(conclusions, index)) }

    const onChangePremiseVariable = (value: any, index: number) => {
        setPremises(replaceElement(premises, index, { variable: value }))
    }

    const onChangeConclusionVariable = (value: any, index: number) => {
        setConclusions(replaceElement(conclusions, index, { variable: value }))
    }

    const onChangePremiseValue = (value: any, index: number) => {
        let clone = [...premises];
        clone[index].value = value
        setPremises(clone)
    }

    const onChangeConclusionValue = (value: any, index: number) => {
        let clone = [...conclusions];
        clone[index].value = value
        setConclusions(clone)
    }

    useEffect(() => {
        async function componentDidMount() {
            listVariables((json: any) => {
                setVariables(json.data);
            })
            fetchRules()
        }
        componentDidMount()
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomTypography>Reglas</CustomTypography>
                    {(msg != null) ? <Alert variant="outlined" severity={msg.severity} onClose={() => { setMsg(null) }}>{msg.text}</Alert> : ''}
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <SaveButton onClick={insertRule} />
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>Conclusiones</TableCell>
                                            <TableCell>
                                                <AddButton onClick={addConclusion} />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {conclusions.map((row: any, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <CustomSelect
                                                        value={conclusions[index].variable}
                                                        label="Variable"
                                                        onChange={(event: any) => onChangeConclusionVariable(event.target.value, index)}
                                                        fullWidth={true}
                                                    >
                                                        {variables.map((variable: any, index: number) => (
                                                            <MenuItem key={index} value={variable}>{variable.name}</MenuItem>
                                                        ))}
                                                    </CustomSelect>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {Object.keys(conclusions[index].variable).length > 0 ? (
                                                        <CustomSelect
                                                            fullWidth={true}
                                                            value={conclusions[index].value}
                                                            label="Value"
                                                            onChange={(event: any) => onChangeConclusionValue(event.target.value, index)}
                                                        >
                                                            {conclusions[index].variable.options.map((value: any, index: number) => (
                                                                <MenuItem key={index} value={value}>{value.name}</MenuItem>
                                                            ))}
                                                        </CustomSelect>
                                                    ) : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <DeleteButton onClick={() => { removeConclusion(row.index) }} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table" size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>Premisas</TableCell>
                                            <TableCell>
                                                <AddButton onClick={addPremise} />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {premises.map((row: any, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <CustomSelect
                                                        value={premises[index].variable}
                                                        label="Variable"
                                                        onChange={(event: any) => onChangePremiseVariable(event.target.value, index)}
                                                        fullWidth={true}
                                                    >
                                                        {variables.map((variable: any, index: number) => (
                                                            <MenuItem key={index} value={variable}>{variable.name}</MenuItem>
                                                        ))}
                                                    </CustomSelect>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {Object.keys(premises[index].variable).length > 0 ? (
                                                        <CustomSelect
                                                            fullWidth={true}
                                                            value={premises[index].value}
                                                            label="Value"
                                                            onChange={(event: any) => onChangePremiseValue(event.target.value, index)}
                                                        >
                                                            {premises[index].variable.options.map((value: any, index: number) => (
                                                                <MenuItem key={index} value={value}>{value.name}</MenuItem>
                                                            ))}
                                                        </CustomSelect>
                                                    ) : ''}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <DeleteButton onClick={() => { removeValue(row.index) }} />
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
                    <TableContainer component={Paper}>
                        <Typography variant="h6">Reglas</Typography>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Premises</TableCell>
                                    <TableCell>Statement</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rules.map((row: any) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.premises.map((p: any) => p.variable.name + ' -> ' + p.value.name).join(', ')}</TableCell>
                                        <TableCell>{row.conclusions.map((p: any) => p.variable.name + ' -> ' + p.value.name).join(', ')}</TableCell>
                                        <TableCell>Acciones</TableCell>
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
