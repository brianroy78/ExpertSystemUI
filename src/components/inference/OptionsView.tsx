import { Grid, Typography, Button, Autocomplete, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Calculator from "../calculator";
import SmallTextField from "../custom/SmallTextField";
export default function OptionsView(props_: any) {

    const [props, setProps] = useState(props_)
    const [scalarValue, setScalarValue] = useState(.0)
    const onScalarValueChange = (event: any) => { setScalarValue(event.target.value) }

    useEffect(() => {
        setProps(props_);
    }, [props_]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className='var-typo' variant="h5">{props.variable.question}</Typography>
                </Grid>
                {(!props.variable.isScalar) ? (
                    <Fragment>
                        {(props.variable.options.length < 5) ? (
                            <Fragment>
                                {
                                    props.variable.options.map((option: any, index: any) => (
                                        <Grid key={index} item xs={12}>
                                            <Button
                                                key={index}
                                                onClick={() => { props.respond(option.value) }}
                                                variant='outlined'
                                                style={{ width: '100%' }}
                                            >
                                                {option.value}</Button>
                                        </Grid>
                                    ))
                                }
                            </Fragment>
                        ) :
                            <Grid item xs={12}>
                                <Autocomplete
                                    hidden={props.autoHidden}
                                    size="small"
                                    sx={{ width: '100%' }}
                                    disablePortal
                                    options={props.variable.options}
                                    isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                                    value={props.autoValue}
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
                                    getOptionLabel={(option: any) => option.value}
                                    onChange={(e: any, option: any) => { props.respond(option.value) }}
                                />
                            </Grid>
                        }
                    </Fragment>
                ) :
                    <Fragment>
                        <Grid item xs={8}>
                            <SmallTextField
                                value={scalarValue}
                                onChange={onScalarValueChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                key="scalar-btn"
                                onClick={() => { props.respond(scalarValue) }}
                                variant='outlined'
                                style={{ width: '100%' }}
                            >
                                Responder</Button>
                        </Grid>
                    </Fragment>
                }

                {(props.variable.id === 'average_electrical_consumption') ?
                    <Grid item xs={12}>
                        <Button
                            key="calc-btn"
                            onClick={() => { props.setDoCalc(true) }}
                            variant='outlined'
                            style={{ width: '100%' }}
                        >
                            CalCular
                        </Button>
                    </Grid> : ''
                }
                <Grid item xs={12}>
                    <Button
                        key="ignore-btn"
                        onClick={() => { props.respond('') }}
                        variant='outlined'
                        style={{ width: '100%' }}
                    >
                        Saltar Pregunta
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}