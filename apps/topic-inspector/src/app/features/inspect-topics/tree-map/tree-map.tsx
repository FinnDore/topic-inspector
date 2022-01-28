import { Group } from '@visx/group';
import { Treemap, treemapSquarify } from '@visx/hierarchy';
import { HierarchyNode } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ReactElement, useMemo } from 'react';
import { TreeData } from '../../../_interfaces/tree-data.model';
import { TreeLeaf } from './tree-leaf/tree-leaf';

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

    const handleMouseOver = useMemo(
        () =>
            (
                event: React.PointerEvent<SVGRectElement>,
                datum: TreeData
            ): void => {
                const containerX = event.clientX - containerBounds.left;
                const containerY = event.clientY - containerBounds.top;

                showTooltip({
                    tooltipLeft: containerX,
                    tooltipTop: containerY,

                    tooltipData:
                        `${datum?.topicName}  ${datum.topicSize} ` ??
                        'Unknown size'
                });
            },
        [showTooltip, containerBounds]
    );

    const colorScale = useMemo(() => {
        const maxValue = Math.max(
            ...(data
                .descendants()
                .filter(x => x.depth > 0)
                .map(x => x.data.data.size)
                .filter(x => typeof x === 'number') as number[])
        );

        return scaleLinear<string>({
            domain: [0, maxValue + maxValue * 0.1 ?? 0],
            range: [color2, color1]
        });
    }, [data]);

    const xMaxYmax = useMemo(
        (): [number, number] => [
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        ],
        [width, height, margin]
    );

    return (
        <>
            <svg width={width} height={height} onMouseOut={hideTooltip}>
                <rect width={width} height={height} rx={5} fill={background} />
                <Treemap<typeof data>
                    top={margin.top}
                    root={
                        data as unknown as HierarchyNode<
                            HierarchyNode<HierarchyNode<TreeData>>
                        >
                    }
                    size={xMaxYmax}
                    tile={treemapSquarify}
                    round
                >
                    {treeMap => (
                        <Group>
                            {treeMap
                                .descendants()
                                .reverse()
                                .map(node => (
                                    <TreeLeaf
                                        key={node.data.id}
                                        width={width}
                                        height={height}
                                        node={node}
                                        margin={margin}
                                        handleMouseOver={handleMouseOver}
                                        colorScale={colorScale}
                                    ></TreeLeaf>
                                ))}
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
