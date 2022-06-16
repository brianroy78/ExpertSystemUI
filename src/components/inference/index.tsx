import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { CustomTypography } from '../custom/CustomTypographys'
import { getInferenceStart, inferenceRespond } from '../fetcher'

export default function InferenceView() {

    const [variable, setVariable] = React.useState<any>({})
    const [facts, setFacts] = React.useState<any>([])
    const [sessionId, setSessionId] = React.useState<any>('')


    const respond = (valueId: any) => {
        inferenceRespond({ id: sessionId, value_id: valueId }, (json: any) => {
            if (json.data.finished) {
                setFacts(json.data.conclusions)
            } else {
                setVariable(json.data.variable)
            }
        })
    }

    useEffect(() => {
        async function componentDidMount() {
            getInferenceStart({}, (json: any) => {
                console.log('setting id', json.data.id)
                setSessionId(json.data.id)
                if (json.data.finished) {
                    setFacts(json.data.conclusions)
                } else {
                    setVariable(json.data.variable)
                }
            })
        }
        componentDidMount()
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}><CustomTypography>Inferencia</CustomTypography></Grid>
            {(Object.keys(variable).length > 0) ? (
                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography variant="h6">{variable.name}?</Typography>
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
                            No se</Button>
                    </Grid>
                </React.Fragment>
            ) : ''}
            {(facts.length > 0) ? (
                <Grid key='asdfasd' item xs={6}>
                    {
                        facts.map((fact: any, index: number) => (
                            <Grid item xs={12}>
                                <Typography key={index} variant='h6'>{fact}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            ) : ''}
        </Grid>
    );
}
