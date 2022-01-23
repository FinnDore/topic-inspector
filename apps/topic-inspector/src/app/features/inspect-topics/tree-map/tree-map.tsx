import { Group } from '@visx/group';
import { hierarchy, stratify, Treemap, treemapSquarify } from '@visx/hierarchy';
import shakespeare, {
    Shakespeare
} from '@visx/mock-data/lib/mocks/shakespeare';
import { scaleLinear } from '@visx/scale';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ReactElement, useCallback } from 'react';
import './tree-map.module.scss';
export const color1 = '#fc1703';
const color2 = '#5a03fc';
export const background = 'black';

const colorScale = scaleLinear<string>({
    domain: [0, 436000],
    range: [color2, color1]
});

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

export type TreeMapProps = {
    width: number;
    height: number;
    data?: any;
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
    margin = defaultMargin
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
    const handleMouseOver = useCallback(
        (event: any, datum: any): void => {
            const containerX = event.clientX - containerBounds.left;
            const containerY = event.clientY - containerBounds.top;

            showTooltip({
                tooltipLeft: containerX,
                tooltipTop: containerY,
                tooltipData: datum
            });
        },
        [containerBounds]
    );

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    return (
        <div>
            <div>
                <svg width={width} height={height} onMouseOut={hideTooltip}>
                    <rect
                        width={width}
                        height={height}
                        rx={14}
                        fill={background}
                    />
                    <Treemap<typeof data>
                        top={margin.top}
                        root={data}
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
                                                {node.depth === 1 && (
                                                    <rect
                                                        width={nodeWidth}
                                                        height={nodeHeight}
                                                        stroke={background}
                                                        strokeWidth={4}
                                                        fill="transparent"
                                                        onPointerMove={
                                                            handleMouseOver as any
                                                        }
                                                    />
                                                )}
                                                {node.depth > 2 && (
                                                    <rect
                                                        width={nodeWidth}
                                                        height={nodeHeight}
                                                        stroke={background}
                                                        onPointerMove={
                                                            handleMouseOver as any
                                                        }
                                                        fill={colorScale(
                                                            node.value || 0
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
                >
                    Data value <strong>{tooltipData}</strong>
                </TooltipInPortal>
            )}
        </div>
    );
}

export default TreeMap;
