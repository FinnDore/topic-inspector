import { TextField } from '@mui/material';
import { makeSyncTo } from '@topic-inspector/utils';
import { ChangeEventHandler, useState } from 'react';
import { setKafkaLogDirs } from '../../../_store/_actions/update-kafka-log-dirs.action';
import { validateKafkaLogDirs } from '../../../_util/validate-kafka-log-dirs';
import classes from './json-input.module.scss';

const parse = makeSyncTo(JSON.parse);

/**
 * Provides a input element for inputting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) json then updates the global stores state with the inputted value if its valid JSON
 *
 * @returns {object} the component
 */
export function JsonInput(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange: ChangeEventHandler<
        HTMLTextAreaElement | HTMLInputElement
    > = value => {
        const [newValue, error] = parse(value.target.value);
        if (error) {
            return setErrorMessage('Invalid JSON');
        }

        const isValid = validateKafkaLogDirs(newValue);
        if (!isValid) {
            return setErrorMessage('Invalid Kafka Log Dirs');
        }

        setErrorMessage('');
        setKafkaLogDirs(newValue);
    };

    return (
        <div>
            <TextField
                className={classes['input']}
                id="outlined-multiline-flexible"
                label="Kafka log dir output "
                multiline
                maxRows="5"
                error={!!errorMessage}
                helperText={errorMessage}
                onChange={handleInputChange}
            />
        </div>
    );
}
