import { Text } from '@visx/text';
import { TreeData } from '../../../../../_interfaces/tree-data.model';
import { memo } from 'react';

const fit = 'shrink-only';

/**
 * Props for the treeMapText component
 */
export interface TreeMapTextProps {
    nodeHeight: number;
    nodeWidth: number;
    marginTop: number;
    marginLeft: number;
    data: TreeData;
}

/**
 * Text that goes on a individual topic on the tree map.
 */
export const TreeMapText = memo(
    ({
        nodeHeight,
        nodeWidth,
        marginTop,
        marginLeft,
        data
    }: TreeMapTextProps) => {
        if (nodeWidth < 70 || nodeHeight < 70) {
            return null;
        }

        const textWidth = nodeWidth - marginLeft * 2;
        return (
            <>
                <Text
                    x={marginLeft}
                    y={marginTop}
                    height={nodeHeight}
                    width={textWidth}
                    fill="white"
                    style={{
                        fontWeight: 'bolder'
                    }}
                    verticalAnchor="start"
                    scaleToFit={fit}
                >
                    {data.topicSize}
                </Text>
                <Text
                    x={marginLeft}
                    y={marginTop}
                    width={textWidth}
                    height={nodeHeight}
                    dy={'1.1em'}
                    scaleToFit={fit}
                    fill="white"
                    verticalAnchor="start"
                >
                    {data.topicName}
                </Text>
            </>
        );
    }
);
