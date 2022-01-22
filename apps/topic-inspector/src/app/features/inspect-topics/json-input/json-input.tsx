import { TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { setKafkaLogDirs } from '../../../_store/_actions/update-kafka-log-dirs.action';
import { makeSyncTo } from '@topic-inspector/utils';
import classes from './json-input.module.scss';

const parse = makeSyncTo(JSON.parse);

/**
 * Provides a input element for inputting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) json then updates the global stores state with the inputted value if its valid JSON
 *
 * @returns {object} the component
 */
export function JsonInput(): JSX.Element {
    const [invalidJson, setInvalidJson] = useState(false);

    const handleInputChange: ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = value => {
        const [newValue, error] = parse(value.target.value);
        if (error) {
            return setInvalidJson(true);
        }

        setInvalidJson(false);
        setKafkaLogDirs(newValue);
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
