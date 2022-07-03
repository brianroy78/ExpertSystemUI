import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { CustomTypography } from '../custom/CustomTypographys'
import { deleteInference, getSessionId, getSessionIdFrom, inferenceBack, inferenceRespond } from '../fetcher'
import Calculator from './Calculator'
import ClientView from './ClientView'
import ConclusionsView from './ConclusionsView'
import './index.css'
import OptionsView from './OptionsView'
import QuotationsView from './QuotationsView'

export default function InferenceView(inputProps: any) {

    const [autoValue, setAutoValue] = useState<any>(null)
    const [autoHidden, setAutoHidden] = useState<any>(false)
    const [props, setProps] = useState(inputProps)

    const [conclusions, setConclusions] = useState<any>([])
    const [client, setClient] = useState<any>(null)
    const [variable, setVariable] = useState<any>(null)

    const [sessionId, setSessionId] = useState(null)
    const [step, setStep] = useState(0)
    const [forwardSteps, setForwardSteps] = useState<any>([])
    const [selectedOptions, setSelectedOptions] = useState<any>([])
    const [quickstartData, setQuickstartData] = useState<any>(null)


    const respond = (value: any) => {
        setAutoValue(null)
        setAutoHidden(true)
        setForwardSteps([])
        setSelectedOptions([...selectedOptions, value])
        inferenceRespond({ id: sessionId, value_name: value }, (json: any) => {
            setAutoHidden(false)
            analyze(json.data)
        })
    }

    const analyze = (data: any) => {
        if (data.finished) {
            setStep(4)
            setConclusions(data.conclusions)
        } else {
            let sortedOptions = data.variable.options.sort((a: any, b: any) => a.order - b.order)
            sortedOptions.pop()
            setVariable(data.variable)
        }
    }

    function showQuotations(client: any) {
        setClient(client);
        setStep(1)
        setForwardSteps([])

    }

    function startQuotation(quotationId: any, selectedOptionId: any) {
        props.setLockScreen(true)
        if (selectedOptionId == null) {
            getSessionId({ quotation_id: quotationId }, (json: any) => {
                setSessionId(json.data.id)
                analyze(json.data)
                setStep(2)
                props.setLockScreen(false)
            })
        } else {
            getSessionIdFrom({
                quotation_id: quotationId,
                selected_option_id: selectedOptionId
            }, (json: any) => {
                setSessionId(json.data.id)
                analyze(json.data)
                setStep(2)
                props.setLockScreen(false)
            })

        }
        setForwardSteps([])
        setQuickstartData({
            quotationId: quotationId,
            selectedOptionId: selectedOptionId
        })
    }

    const showCalculator = () => {
        setStep(3)
    }

    const calcRespond = (response: any) => {
        setStep(2)
        respond(response)
    }

    const back = () => {
        if (step === 1) {
            setStep(0)
            setForwardSteps([...forwardSteps, client])
            setClient(null)
            return
        }
        if (step === 2) {
            inferenceBack({ id: sessionId }, (json: any) => {
                if (json.data.empty) {
                    setForwardSteps([...forwardSteps, quickstartData])
                    setQuickstartData(null)
                    deleteInference({ id: sessionId }, (json: any) => { })
                    setStep(1)
                } else {
                    setForwardSteps([...forwardSteps, selectedOptions.pop()])
                    analyze(json.data)
                }
            })
            return
        }
        if (step === 3) {
            setStep(2)
            return
        }
        if (step === 4) {
            setStep(2)
            return
        }
    }

    const next = () => {
        if (forwardSteps.length === 0) {
            return
        }
        if (step === 0) {
            showQuotations(forwardSteps.pop())
        }

        if (step === 1) {
            let data = forwardSteps.pop()
            startQuotation(data.quotationId, data.selectedOptionId)
        }

        if (step === 2) {
            respond(forwardSteps.pop())
        }

    }

    useEffect(() => {
        setProps(inputProps)
    }, [inputProps]);

    return (
        <Grid
            container
            justifyContent="space-evenly"
            className='regular-container'
        >
            <Grid item xs={12}><CustomTypography>Cotización</CustomTypography></Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    justifyContent="space-evenly">
                    <Grid item xs={4}>
                        <Grid container justifyContent="space-between" className='regular-container'>
                            <Grid item xs={4}>
                                <Button
                                    disabled={step === 4}
                                    key='back-btn'
                                    onClick={back}
                                    variant='outlined'
                                    style={{ width: '100%' }}
                                    startIcon={<ArrowBackIcon />}
                                >
                                    Atras</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    disabled={forwardSteps.length === 0}
                                    key='forward-btn'
                                    onClick={next}
                                    variant='outlined'
                                    style={{ width: '100%' }}
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Siguiente</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {(client != null) ? (
                <Grid item xs={12}><Typography
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                    variant="h6"
                >Cliente: {client.name} {client.last_name} </Typography></Grid>) : ''}

            {(step === 0) ? (
                <Grid item xs={4}><ClientView setClientId={showQuotations} /> </Grid>
            ) : ''}
            {(step === 1) ? (
                <Grid item xs={4}><QuotationsView clientId={client.id} startQuotation={startQuotation} /></Grid>
            ) : ''}
            {(step === 2) ? (
                <Grid item xs={4}>
                    <OptionsView
                        variable={variable}
                        respond={respond}
                        autoHidden={autoHidden}
                        autoValue={autoValue}
                        showCalculator={showCalculator}
                    />
                </Grid>
            ) : ''}
            {(step === 3) ? (
                <Grid item xs={8}><Calculator respond={calcRespond} /></Grid>
            ) : ''}
            {(step === 4) ? (
                <Grid item xs={4}><ConclusionsView conclusions={conclusions} /></Grid>
            ) : ''}
        </Grid>
    );
}
