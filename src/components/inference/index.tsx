import { Autocomplete, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomTypography, TableHeader } from '../custom/CustomTypographys'
import { getInferenceStart, inferenceRespond } from '../fetcher'
import ClientView from './ClientView'
import './index.css';
import OptionsView from './OptionsView'

export default function InferenceView() {

    const [conclusions, setConclusions] = useState<any>([])
    const [sessionId, setSessionId] = useState<any>('')
    const [clientId, setClientId] = useState<any>(null)
    const [isFinished, setIsFinished] = useState<any>(false)
    const [variable, setVariable] = useState<any>(null)
    const [autoValue, setAutoValue] = useState<any>(null)
    const [autoHidden, setAutoHidden] = useState<any>(false)

    const respond = (value: any) => {
        setAutoValue(null)
        setAutoHidden(true)
        inferenceRespond({ id: sessionId, value_name: value }, (json: any) => {
            setAutoHidden(false)
            analyze(json.data)
        })
    }

    const analyze = (data: any) => {
        if (data.finished) {
            setConclusions(data.conclusions)
            setIsFinished(true)
        } else {
            let sortedOptions = data.variable.options.sort((a: any, b: any) => a.order - b.order)
            let skip = sortedOptions.pop()
            setVariable(data.variable)
        }
    }

    function startInference(newClientId: any) {
        setClientId(newClientId);
        getInferenceStart({}, (json: any) => {
            setSessionId(json.data.id)
            analyze(json.data)
        })
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}><CustomTypography>Cotización/Diagnóstico</CustomTypography></Grid>
            {(clientId === null) ? (<ClientView setClientId={startInference} />) : (!isFinished && variable !== null) ? (
                <Grid item xs={6}>
                    <OptionsView
                        variable={variable}
                        respond={respond}
                        autoHidden={autoHidden}
                        autoValue={autoValue}
                    />
                </Grid>
            ) : (
                <Grid item xs={6}>
                    <TableContainer component={Paper} style={{ padding: '20px' }}>
                        <Table aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><TableHeader>Nombre de la Variable</TableHeader></TableCell>
                                    <TableCell><TableHeader>Nombre del Valor</TableHeader></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {conclusions.map((row: any, index: number) => (
                                    <TableRow hover
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{row.variable_name}</TableCell>
                                        <TableCell>{row.value_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            )}
        </Grid>
    );
}
