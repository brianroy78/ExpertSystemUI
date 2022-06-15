import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { CustomTypography } from '../custom/CustomTypographys'
import { getRules, getVariable, inferenceRespond, parseFacts } from '../fetcher'

export default function InferenceView() {

    const [state, setState] = React.useState("")
    const [variable, setVariable] = React.useState<any>({})
    const [facts, setFacts] = React.useState<any>([])


    const fetchRules = () => {
        getRules({}, (json: any) => {
            retrieveVariable(json.data)
        })
    }

    const respond = (valueId: any) => {
        inferenceRespond({ state: state, value_id: valueId }, (json: any) => {
            retrieveVariable(json.data)
        })
    }

    const retrieveVariable = (state: any) => {
        getVariable(state, (json: any) => {
            setState(json.data.state)
            if (json.data.hasOwnProperty('variable')) {
                setVariable(json.data.variable)
            } else {
                setVariable({})
                parseFacts(json.data.state, (factsResponse: any) => {
                    setFacts(factsResponse.data)
                })
            }
        })
    }

    useEffect(() => {
        async function componentDidMount() {
            fetchRules()
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
