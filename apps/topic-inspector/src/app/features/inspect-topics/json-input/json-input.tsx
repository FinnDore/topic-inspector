import { TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { updateKafkaLogDirs } from '../../../_store/_actions/update-kafak-log-dirs.action';
import { makeSyncTo } from '../../../_utils/make-to-sync';
import classes from './json-input.module.scss';

const parse = makeSyncTo(JSON.parse);

export function JsonInput() {
    const [invalidJson, setInvalidJson] = useState(false);

    const handleInputChange: ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = value => {
        const [newValue, error] = parse(value.target.value);
        if (error) {
            return setInvalidJson(true);
        }

        setInvalidJson(false);
        updateKafkaLogDirs(newValue);
    };

    return (
        <div>
            <TextField
                className={classes['input']}
                id="outlined-multiline-flexible"
                label="Kafka log dir output "
                multiline
                maxRows="10"
                error={invalidJson}
                helperText={invalidJson ? 'Invalid Json' : ''}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default JsonInput;
