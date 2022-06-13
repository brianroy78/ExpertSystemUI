import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react'

export default function SmallTextField(props: any) {
    const [fieldProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <TextField
            label={fieldProps.label || ''}
            value={fieldProps.value}
            type='text'
            onChange={fieldProps.onChange}
            size="small"
            {...fieldProps}
        />
    )
}