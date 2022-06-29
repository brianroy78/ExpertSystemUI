import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/EditOutlined';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { TableHeader } from "../custom/CustomTypographys";

import {
    deleteQuotationById, insertQuotation,
    listQuotation, listSelectedOptions
} from "../fetcher";



export default function QuotationsView(inputProps: any) {

    const [props, setProps] = useState(inputProps)
    const [quotations, setQuotations] = useState([])
    const [quotation, setQuotation] = useState({ id: '' })
    const [clientId, setClientId] = useState(null)
    const [step, setStep] = useState(0)
    const [selectedOptions, setSelectedOptions] = useState([])

    const createQuotation = () => {
        insertQuotation({ client_id: props.clientId }, (json: any) => {
            props.startQuotation(json.data.id)
        })
    }

    const updateQuotation = (selectedQuotation: any) => {
        setQuotation(selectedQuotation)
        listSelectedOptions(selectedQuotation.id, (json: any) => {
            setSelectedOptions(json.data.sort((a: any, b: any) => a.order - b.order))
        })
        setStep(1)
    }

    const cloneQuotation = (selectedQuotation: any) => {

    }

    const deleteQuotation = (selectedQuotation: any) => {
        deleteQuotationById(selectedQuotation.id, (json: any) => {
            listQuotation(clientId, (json: any) => {
                setQuotations(json.data)
            })
        })
    }

    const startFrom = (startOption: any) => {
        props.startQuotation(quotation.id, startOption.id)
    }

    useEffect(() => {
        setProps(inputProps)
        setClientId(inputProps.clientId)
    }, [inputProps]);

    useEffect(() => {
        if (clientId != null) {
            listQuotation(clientId, (json: any) => {
                if (json.data.length === 0) {
                    createQuotation()
                } else {
                    setQuotations(json.data)
                }
            })
        }
    }, [clientId])

    return (
        <Grid container justifyContent="center" className='regular-container'>
            {(step === 0) ? (
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <TableHeader>Cotizaciones Anteriores</TableHeader>
                                    </TableCell>
                                    <TableCell><TableHeader>
                                        <Button
                                            key="new-quotation-btn"
                                            onClick={createQuotation}
                                            variant='outlined'
                                            style={{ width: '100%' }}
                                        >
                                            Nuevo</Button>
                                    </TableHeader></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {quotations.map((q: any, index: number) => (
                                    <TableRow hover key={index}>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            {q.creation_datetime.substring(0, 19)}
                                        </TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <Tooltip title="Actualizar">
                                                <IconButton
                                                    color="warning"
                                                    size="small"
                                                    onClick={() => { updateQuotation(q) }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Clonar">
                                                <IconButton
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => { cloneQuotation(q) }}
                                                >
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => { deleteQuotation(q) }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : ''}
            {(step === 1) ? (
                <Fragment>
                    {
                        selectedOptions.map((o: any, index: any) => (
                            <Grid key={index} item xs={12}>
                                <Button
                                    key={index}
                                    onClick={() => { startFrom(o) }}
                                    variant='outlined'
                                    style={{ width: '100%' }}
                                >
                                    {o.option.variable.question}
                                    {(o.option.variable.is_scalar) ?
                                        <label>{o.scalar} </label>
                                        : (
                                            <label>{o.option.value} </label>
                                        )}
                                </Button>
                            </Grid>
                        ))
                    }
                </Fragment>
            ) : ''}
        </Grid>
    )
}