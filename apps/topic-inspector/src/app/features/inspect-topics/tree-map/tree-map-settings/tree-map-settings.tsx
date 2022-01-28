import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from '@mui/material';

import { RootState } from '../../../../_store/store';
import { patchTreeMapSettings } from '../../../../_store/_actions/patch-tree-map-settings.action';
import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SquarifyFunctions } from '../../../../_constants/tree-map-squarify-functions';
import classes from './tree-map-settings.module.scss';
/**
 * Allows the user to alter the tree map chart.
 *
 * @param props the input props.
 * @returns {object} the component.
 */
export function TreeMapSettings(): ReactElement {
    const activeSquarifyFunction = useSelector(
        ({ treeMapSettings }: RootState) => treeMapSettings.squarifyFunctionName
    );

    const handleInput = useMemo(
        () => (selectionEvent: SelectChangeEvent<string>) =>
            patchTreeMapSettings({
                squarifyFunctionName: selectionEvent.target.value
            }),
        []
    );

    return (
        <FormControl className={classes['input']}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
                id="demo-multiple-name"
                value={activeSquarifyFunction}
                onChange={handleInput}
            >
                {Object.keys(SquarifyFunctions).map(name => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
