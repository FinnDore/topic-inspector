import { Group } from '@visx/group';
import {
    HierarchyNode,
    HierarchyRectangularNode,
    TileMethod
} from '@visx/hierarchy/lib/types';
import { memo } from 'react';
import { TreeData } from '../../../../_interfaces/tree-data.model';
import { background } from '../tree-map';
import { TreeMapText } from './tree-map-text/tree-map-text';
export interface TreeLeafProps {
    node: HierarchyRectangularNode<HierarchyNode<HierarchyNode<TreeData>>>;
    handleMouseOver: (
        event: React.PointerEvent<SVGRectElement>,
        datum: TreeData
    ) => void;
    margin: { top: number; left: number; right: number; bottom: number };
    colorScale: (value: number) => string;

    /** Force re-render of memoised component when the dimensions changes */
    height: number;
    width: number;
    fn: TileMethod<HierarchyNode<HierarchyNode<unknown>>>;
}

/**
 * The tree leaf component for the tree map chart. memoised for performance
 *
 * @param props the input props
 * @returns {object} the component
 */
export const TreeLeaf = memo(
    ({ handleMouseOver, margin, colorScale, node }: TreeLeafProps) => {
        const nodeWidth = node.x1 - node.x0;
        const nodeHeight = node.y1 - node.y0;
        const data = node.data.data as unknown as TreeData;

        return (
            <Group
                key={data.id}
                top={node.y0 + margin.top}
                left={node.x0 + margin.left}
            >
                {node.depth > 0 && (
                    <>
                        <rect
                            width={nodeWidth}
                            height={nodeHeight}
                            stroke={background}
                            onPointerMove={e => handleMouseOver(e, data)}
                            fill={colorScale(node.value ?? 0)}
                        />
                        <TreeMapText
                            data={data}
                            marginLeft={margin.left}
                            marginTop={margin.top}
                            nodeHeight={nodeHeight}
                            nodeWidth={nodeWidth}
                        ></TreeMapText>
                    </>
                )}
            </Group>
        );
    }
);
