import { Select } from '@mui/material';
import React, { useEffect } from 'react'

export function CustomSelect(props: any) {
    const [selectProps, setProps] = React.useState(props)

    useEffect(() => {
        setProps(props);
    }, [props]);

    return (
        <Select
            label="testing 123"
            style={{ width: '100%' }}
            size="small"
            {...selectProps}
        />
    )
}
