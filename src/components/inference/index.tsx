import { Autocomplete, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { CustomTypography, TableHeader } from '../custom/CustomTypographys'
import { getInferenceStart, inferenceRespond } from '../fetcher'
import ClientView from './ClientView'
import './index.css';

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
            setVariable(data.variable)
        }
    }

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
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
            <Grid item xs={12}><CustomTypography>Inferencia</CustomTypography></Grid>
            {(clientId === null) ? (<ClientView setClientId={startInference} />) : (!isFinished && variable !== null) ? (
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='var-typo' variant="h5">¿{capitalizeFirstLetter(variable.name)}?</Typography>
                        </Grid>
                        {(variable.options.length < 5) ? (
                            <Fragment>
                                {
                                    variable.options.sort((a: any, b: any) => a.order - b.order).map((option: any, index: any) => (
                                        <Grid key={index} item xs={12}>
                                            <Button
                                                key={index}
                                                onClick={() => { respond(option.name) }}
                                                variant='outlined'
                                                style={{ width: '100%' }}
                                            >
                                                {option.name}</Button>
                                        </Grid>
                                    ))
                                }
                            </Fragment>
                        ) :
                            <Grid item xs={12}>
                                <Autocomplete
                                    hidden={autoHidden}
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disablePortal
                                    options={variable.options}
                                    isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                                    value={autoValue}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Respuesta"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password',
                                            }}
                                        />
                                    )}
                                    getOptionLabel={(option: any) => option.name}
                                    onChange={(e: any, option: any) => { respond(option.name) }}
                                />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button
                                key="ignore-btn"
                                onClick={() => { respond(null) }}
                                variant='outlined'
                                style={{ width: '100%' }}
                            >
                                Saltar Pregunta</Button>
                        </Grid>
                    </Grid>
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
