import {  Typography } from '@mui/material';
import React, { useEffect } from 'react'

export function CustomTypography(props: any) {
    const [typoProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Typography
            style={{ textAlign: 'center', margin: '20px 0px 60px 0px' }}
            variant="h4"
            {...typoProps}
        />
    )
}

export function TableHeader(props: any) {
    const [typoProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Typography
            style={{ margin: '10px' }}
            variant="h6"
            {...typoProps}
        />
    )
}