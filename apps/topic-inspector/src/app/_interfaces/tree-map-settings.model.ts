/**
 * The settings for the tree map chart
 */
export interface TreeMapSettings {
    /**
     * {@property} the squarify functionName
     */
    squarifyFunctionName:
        | 'treemapSquarify'
        | 'treemapBinary'
        | 'treemapResquarify'
        | 'treemapDice'
        | 'treemapSlice'
        | 'treemapSliceDice';
}
