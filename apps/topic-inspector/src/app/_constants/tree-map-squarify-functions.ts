import {
    treemapSquarify,
    treemapBinary,
    treemapResquarify,
    treemapDice,
    treemapSlice,
    treemapSliceDice
} from '@visx/hierarchy';
import { TileMethod, HierarchyNode } from '@visx/hierarchy/lib/types';

/**
 * TODO
 */
export const SquarifyFunctions: {
    [key: string]: TileMethod<HierarchyNode<HierarchyNode<unknown>>>;
} = {
    treemapSquarify,
    treemapBinary,
    treemapResquarify,
    treemapDice,
    treemapSlice,
    treemapSliceDice
};
