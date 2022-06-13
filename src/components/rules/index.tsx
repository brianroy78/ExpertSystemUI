import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper';
import { Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { insert, listRules, listVariables } from '../fetcher';
import CustomBox from '../custom/CustomBox';
import { removeElement, replaceElement } from '../utils';

export default function RulesView() {

    const [rules, setRules] = React.useState<any>([])
    const [variables, setVariables] = React.useState<any>([])
    const [premises, setPremises] = React.useState<any>([])
    const [statementVariable, setStatementVariable] = React.useState<any>('')
    const [statementValues, setStatementValues] = React.useState<any>([])
    const [statementValue, setStatementValue] = React.useState<any>('')

    const getPremise = (premise: any) => {
        return {
            __type__: 'fact',
            value_id: premise.value.id,
            variable_id: premise.variable.id
        }
    }

    const insertRule = () => {
        let rule = { __type__: 'rule', premises: [], statement: {} }
        let premisesReady = premises.map((value: any) => getPremise(value))
        rule.premises = premisesReady
        rule.statement = {
            __type__: 'fact',
            value_id: statementValue.id,
            variable_id: statementVariable.id
        }
        insert(rule, (json: any) => {
            fetchRules();
        })
    }

    const fetchRules = () => { listRules((json: any) => { setRules(json.data); }) }

    const addPremise = () => {
        let subValue = { variable: {}, value: {} }
        setPremises(premises.concat(subValue))
    }

    const removeValue = (index: number) => { setPremises(removeElement(premises, index)) }

    const onChangeVariable = (event: any) => {
        setStatementVariable(event.target.value)
        setStatementValues(event.target.value.options)
    }

    const onChangeStatementValue = (event: any) => {
        setStatementValue(event.target.value)
    }

    const onChangePremiseVariable = (value: any, index: number) => {
        setPremises(replaceElement(premises, index, { variable: value }))
    }

    const onChangePremiseValue = (value: any, index: number) => {
        let clone = [...premises];
        clone[index].value = value
        setPremises(clone)
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
            <CustomBox style={{ borderStyle: "solid", padding: '20px', borderWidth: '1px' }} >
                <Select
                    id="select-box"
                    value={statementVariable}
                    label="Variable"
                    onChange={onChangeVariable}
                >
                    {variables.map((variable: any, index: number) => (
                        <MenuItem key={index} value={variable}>{variable.name}</MenuItem>
                    ))}
                </Select>

                <Select
                    value={statementValue}
                    label="Value"
                    onChange={onChangeStatementValue}
                >
                    {statementValues.map((value: any, index: number) => (
                        <MenuItem key={index} value={value}>{value.name}</MenuItem>
                    ))}
                </Select>

                <Button variant="outlined" onClick={insertRule}>submit</Button>
                <TableContainer component={Paper}>
                    <Typography variant="h6">Premisas</Typography>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Variable</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell><Button onClick={addPremise} variant="outlined">+</Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {premises.map((row: any, index: number) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Select
                                            value={premises[index].variable}
                                            label="Variable"
                                            onChange={(event) => onChangePremiseVariable(event.target.value, index)}
                                            fullWidth={true}
                                        >
                                            {variables.map((variable: any, index: number) => (
                                                <MenuItem key={index} value={variable}>{variable.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {Object.keys(premises[index].variable).length > 0 ? (
                                            <Select
                                                fullWidth={true}
                                                value={premises[index].value}
                                                label="Value"
                                                onChange={(event) => onChangePremiseValue(event.target.value, index)}
                                            >
                                                {premises[index].variable.options.map((value: any, index: number) => (
                                                    <MenuItem key={index} value={value}>{value.name}</MenuItem>
                                                ))}
                                            </Select>
                                        ) : ''}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button
                                            onClick={() => { removeValue(row.index) }}
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
                                    <TableCell>{row.statement.variable.name + ' ==> ' + row.statement.value.name}</TableCell>
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
