import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Fragment, useState } from 'react'
import Calculator from '../calculator'
import { CustomTypography, TableHeader } from '../custom/CustomTypographys'
import { startQuotation, inferenceRespond, insertQuotation, listQuotation } from '../fetcher'
import ClientView from './ClientView'
import ConclusionsView from './ConclusionsView'
import OptionsView from './OptionsView'
import QuotationsView from './QuotationsView'

export default function InferenceView() {
    const [autoValue, setAutoValue] = useState<any>(null)
    const [autoHidden, setAutoHidden] = useState<any>(false)

    const [conclusions, setConclusions] = useState<any>([])
    const [clientId, setClientId] = useState<any>(null)
    const [variable, setVariable] = useState<any>(null)
    const [doCalc, setDoCalc] = useState(false)
    const [quotations, setQuotations] = useState([])
    const [quotation, setQuotation] = useState(null)

    const [sessionId, setSessionId] = useState(null)
    const [step, setStep] = useState(0)


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
            setStep(3)
            setConclusions(data.conclusions)
        } else {
            let sortedOptions = data.variable.options.sort((a: any, b: any) => a.order - b.order)
            let skip = sortedOptions.pop()
            setVariable(data.variable)
        }
    }

    function selectQuotation(clientId: any) {
        setClientId(clientId);
        setStep(1)
    }

    function startQuotation(data: any) {
        setSessionId(data.id)
        analyze(data)
        setStep(2)
    }

    const calcRespond = (response: any) => {
        setDoCalc(false)
        respond(response)
    }

    return (
        <Grid
            container
            spacing={4}
            justifyContent="space-evenly"
        >
            <Grid item xs={12}><CustomTypography>Cotización</CustomTypography></Grid>
            {(!doCalc) ?
                <Fragment>
                    {(step === 0) ? (<ClientView setClientId={selectQuotation} />) : ''}
                    {(step === 1) ? (<QuotationsView clientId={clientId} startQuotation={startQuotation} />) : ''}
                    {(step === 2) ? (
                        <Grid item xs={6}>
                            <OptionsView
                                variable={variable}
                                respond={respond}
                                autoHidden={autoHidden}
                                autoValue={autoValue}
                                setDoCalc={setDoCalc}
                            />
                        </Grid>
                    ) : ''}

                    {(step === 3) ? (<ConclusionsView conclusions={conclusions} />) : ''}
                </Fragment> :
                <Grid item xs={11}>
                    <Calculator respond={calcRespond} />
                </Grid>
            }
        </Grid>
    );
}
