import { Group } from '@visx/group';
import { Treemap, treemapSquarify } from '@visx/hierarchy';
import {
    HierarchyNode,
    HierarchyRectangularNode
} from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';
import { Text } from '@visx/text';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { memo, ReactElement, useCallback } from 'react';
import { TreeData } from '../../../_interfaces/tree-data.model';

export const color1 = '#fc0f03';
const color2 = '#5a03fc';
export const background = 'black';

const tooltipStyles: React.CSSProperties = {
    ...defaultStyles,
    color: 'white',
    padding: 7,
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)'
};

const DEFAULT_MARGIN = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreeMapProps = {
    width: number;
    height: number;
    data: HierarchyNode<HierarchyNode<TreeData>>;
    margin?: { top: number; right: number; bottom: number; left: number };
};

/**
 * Displays a tree map chart
 *
 * @param props the input props
 * @returns {object} the component
 */
export function TreeMap({
    width,
    height,
    data,
    margin = DEFAULT_MARGIN
}: TreeMapProps): ReactElement | null {
    const { TooltipInPortal, containerBounds } = useTooltipInPortal({
        detectBounds: true,
        scroll: true
    });

    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip
    } = useTooltip();

    const handleMouseOver = (
        event: React.PointerEvent<SVGRectElement>,
        datum: TreeData
    ): void => {
        const containerX = event.clientX - containerBounds.left;
        const containerY = event.clientY - containerBounds.top;

        showTooltip({
            tooltipLeft: containerX,
            tooltipTop: containerY,

            tooltipData:
                `${datum?.topicName}  ${datum.topicSize} ` ?? 'Unknown size'
        });
    };

    const colorScale = useCallback(
        () =>
            scaleLinear<string>({
                domain: [0, data.value ?? 0],
                range: [color2, color1]
            }),
        [data]
    )();

    const xMaxYmax = useCallback(
        (): [number, number] => [
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        ],
        [width, height]
    )();

    return (
        <>
            <svg width={width} height={height} onMouseOut={hideTooltip}>
                <rect width={width} height={height} rx={5} fill={background} />
                <Treemap<typeof data>
                    top={margin.top}
                    root={data as unknown as any}
                    size={xMaxYmax}
                    tile={treemapSquarify}
                    round
                >
                    {treeMap => (
                        <Group>
                            {treeMap
                                .descendants()
                                .reverse()
                                .map((node: any) => {
                                    const nodeWidth = node.x1 - node.x0;
                                    const nodeHeight = node.y1 - node.y0;
                                    const data = node.data
                                        .data as unknown as TreeData;
                                    const textWidth =
                                        nodeWidth - margin.left * 2;
                                    const fit = 'shrink-only';

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
                                                        onPointerMove={e =>
                                                            handleMouseOver(
                                                                e,
                                                                data
                                                            )
                                                        }
                                                        fill={colorScale(
                                                            node.value ?? 0
                                                        )}
                                                    />

                                                    <Text
                                                        x={margin.left}
                                                        y={margin.top}
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
                                                        x={margin.left}
                                                        y={margin.top}
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
                                            )}
                                        </Group>
                                    );
                                })}
                        </Group>
                    )}
                </Treemap>
            </svg>

            {tooltipOpen && (
                <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                >
                    <strong>{tooltipData}</strong>
                </TooltipInPortal>
            )}
        </>
    );
}

export default TreeMap;
