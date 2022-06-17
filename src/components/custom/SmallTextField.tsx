import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react'

export default function SmallTextField(props: any) {

    const { value, onChange, ...rest } = props;
    const [cursor, setCursor] = React.useState(null);
    const ref = React.useRef(null);

    useEffect(() => {
        const input: any = ref.current;
        if (input) {
            input.setSelectionRange(cursor, cursor);
        }
    }, [ref, cursor, value]);

    const handleChange = (e: any) => {
        setCursor(e.target.selectionStart);
        onChange && onChange(e);
    };

    return (
        <TextField
            type='text'
            value={value}
            onChange={handleChange}
            onFocus={(e: any) => {
                e.target.selectionStart = cursor;
            }}
            size="small"
            style={{ width: '100%' }}
            autoComplete='new-password'
            {...rest}
        />
    )
}