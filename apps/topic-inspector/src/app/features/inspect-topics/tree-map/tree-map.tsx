import { Group } from '@visx/group';
import { Treemap, treemapSquarify } from '@visx/hierarchy';
import { HierarchyNode } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ReactElement, useCallback } from 'react';
import { TreeData } from '../../../_interfaces/tree-data.model';
import './tree-map.module.scss';

export const color1 = '#fc0f03';
const color2 = '#5a03fc';
export const background = 'black';

const tooltipStyles = {
    ...defaultStyles,
    backgroundColor: 'white',
    padding: 7
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
function TreeMap({
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

            tooltipData: datum?.toolTip ?? 'Unknown size'
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

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    return (
        <>
            <div>
                <svg width={width} height={height} onMouseOut={hideTooltip}>
                    <rect
                        width={width}
                        height={height}
                        rx={5}
                        fill={background}
                    />
                    <Treemap<typeof data>
                        top={margin.top}
                        root={
                            data as unknown as HierarchyNode<
                                HierarchyNode<HierarchyNode<TreeData>>
                            >
                        }
                        size={[xMax, yMax]}
                        tile={treemapSquarify}
                        round
                    >
                        {treemap => (
                            <Group>
                                {treemap
                                    .descendants()
                                    .reverse()
                                    .map((node, i) => {
                                        const nodeWidth = node.x1 - node.x0;
                                        const nodeHeight = node.y1 - node.y0;
                                        return (
                                            <Group
                                                key={`node-${i}`}
                                                top={node.y0 + margin.top}
                                                left={node.x0 + margin.left}
                                            >
                                                {node.depth > 2 && (
                                                    <rect
                                                        width={nodeWidth}
                                                        height={nodeHeight}
                                                        stroke={background}
                                                        onPointerMove={e =>
                                                            handleMouseOver(
                                                                e,
                                                                node.data
                                                                    .data as unknown as TreeData
                                                            )
                                                        }
                                                        fill={colorScale(
                                                            node.value ?? 0
                                                        )}
                                                    />
                                                )}
                                            </Group>
                                        );
                                    })}
                            </Group>
                        )}
                    </Treemap>
                </svg>
            </div>
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
