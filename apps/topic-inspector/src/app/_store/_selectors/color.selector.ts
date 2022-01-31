import { createSelector } from 'reselect';
import { RootState } from '../store';

/**
 * Selector for the tree map colors
 */
export const colorSelector = createSelector(
    ({ treeMapSettings: { color1 } }: RootState) => color1,
    ({ treeMapSettings: { color2 } }: RootState) => color2,
    (color1, color2) => ({ color1, color2 })
);
