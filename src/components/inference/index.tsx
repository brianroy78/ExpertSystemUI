import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { CustomTypography, TableHeader } from '../custom/CustomTypographys'
import { getInferenceStart, inferenceRespond } from '../fetcher'
import ClientView from './ClientView'
import './index.css';

export default function InferenceView() {

    const [variable, setVariable] = React.useState<any>({})
    const [conclusions, setConclusions] = React.useState<any>([])
    const [sessionId, setSessionId] = React.useState<any>('')
    const [clientId, setClientId] = React.useState<any>(null)
    const [isFinished, setIsFinished] = React.useState<any>(false)


    const respond = (valueId: any) => {
        inferenceRespond({ id: sessionId, value_id: valueId }, (json: any) => {
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

    useEffect(() => {
        async function componentDidMount() {
            getInferenceStart({}, (json: any) => {
                setSessionId(json.data.id)
                analyze(json.data)
            })
        }
        componentDidMount()
    }, []);


    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}><CustomTypography>Inferencia</CustomTypography></Grid>
            {(clientId === null) ? (<ClientView setClientId={setClientId} />) : (!isFinished) ? (
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className='var-typo' variant="h5">¿{capitalizeFirstLetter(variable.name)}?</Typography>
                        </Grid>
                        {
                            variable.options.map((option: any, index: any) => (
                                <Grid item xs={12}>
                                    <Button
                                        key={index}
                                        onClick={() => { respond(option.id) }}
                                        variant='outlined'
                                        style={{ width: '100%', margin: '10px' }}
                                    >
                                        {option.name}</Button>
                                </Grid>
                            ))
                        }
                        <Grid item xs={12}>
                            <Button
                                key="ignore-btn"
                                onClick={() => { respond(null) }}
                                variant='outlined'
                                style={{ width: '100%', margin: '10px' }}
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
