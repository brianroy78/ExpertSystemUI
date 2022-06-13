import { Box } from '@mui/material';
import React, { useEffect } from 'react'

export default function CustomBox(props: any) {
    const [boxProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1 }, }}
            noValidate
            autoComplete="off"
            {...boxProps}
        />
    )
}