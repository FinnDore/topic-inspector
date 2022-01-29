import {
    Button,
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { ReactElement, useMemo, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useSelector } from 'react-redux';
import rgbHex from 'rgb-hex';
import { SquarifyFunctions } from '../../../../_constants/tree-map-squarify-functions';
import { RootState } from '../../../../_store/store';
import { patchTreeMapSettings } from '../../../../_store/_actions/patch-tree-map-settings.action';
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

    const colors = useSelector(
        ({ treeMapSettings: { color1, color2 } }: RootState) => ({
            color1,
            color2
        })
    );

    const handleInput = useMemo(
        () => (selectionEvent: SelectChangeEvent<string>) =>
            patchTreeMapSettings({
                squarifyFunctionName: selectionEvent.target.value
            }),
        []
    );

    const [selectedColor, setSelectedColor] = useState(0);

    const handleChange = useMemo(
        () => (value: ColorResult, colorNumber: number) => {
            const color =
                '#' +
                rgbHex(value.rgb.r, value.rgb.g, value.rgb.b, value.rgb.a);

            if (colorNumber === 1) {
                patchTreeMapSettings({ color1: color });
            } else {
                patchTreeMapSettings({ color2: color });
            }
        },
        []
    );

    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent, index: number) => {
        setSelectedColor(index);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes['host']}>
            <FormControl className={classes['input']}>
                <InputLabel>Squarify Function</InputLabel>
                <Select
                    value={activeSquarifyFunction}
                    onChange={handleInput}
                    label="Squarify Function"
                >
                    {Object.keys(SquarifyFunctions).map(name => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {['Primary colour', 'Secondary colour'].map((val, i) => (
                <div
                    className={classes['select-color']}
                    onClick={(e: unknown) =>
                        handleClick(e as MouseEvent, i + 1)
                    }
                >
                    <Paper
                        className={classes['color-button']}
                        elevation={16}
                        sx={{
                            background:
                                i + 1 === 1 ? colors.color1 : colors.color2
                        }}
                    >
                        <Button variant="text"></Button>
                    </Paper>
                    <p>{val}</p>
                </div>
            ))}

            <Menu
                anchorEl={anchorEl as unknown as Element}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        background: 'transparent',
                        boxShadow: 'none'
                    }
                }}
            >
                <ChromePicker
                    color={selectedColor === 1 ? colors.color1 : colors.color2}
                    onChange={e => handleChange(e, selectedColor)}
                    className={classes['picker']}
                />
            </Menu>
        </div>
    );
}
