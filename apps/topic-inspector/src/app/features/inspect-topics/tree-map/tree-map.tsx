import { Group } from '@visx/group';
import { Treemap } from '@visx/hierarchy';
import { HierarchyNode } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';
import { defaultStyles, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { applyMatrixToPoint, Zoom } from '@visx/zoom';
import { TransformMatrix } from '@visx/zoom/lib/types';
import { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SquarifyFunctions } from '../../../_constants/tree-map-squarify-functions';
import { TreeData } from '../../../_interfaces/tree-data.model';
import { RootState } from '../../../_store/store';
import { colorSelector } from '../../../_store/_selectors/color.selector';
import { TreeLeaf } from './tree-leaf/tree-leaf';
import classes from './tree-map.module.scss';

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

const initialTransform = {
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0
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
    const colors = useSelector(colorSelector);

    const activeSquarifyFunction = useSelector(
        ({ treeMapSettings }: RootState) =>
            SquarifyFunctions[treeMapSettings.squarifyFunctionName]
    );

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
            range: [colors.color2, colors.color1]
        });
    }, [data, colors]);

    const xMaxYmax = useMemo(
        (): [number, number] => [
            width - margin.left - margin.right,
            height - margin.top - margin.bottom
        ],
        [width, height, margin]
    );

    /**
     * Constrain the zoom bounds so the user cannot pan outside the tree map
     */
    const constrain = useMemo(
        () => (transformMatrix: TransformMatrix) => {
            const { scaleX, scaleY, translateX, translateY } = transformMatrix;
            // Fix constrain scale
            if (scaleX < 1) {
                transformMatrix.scaleX = 1;
            }
            if (scaleY < 1) {
                transformMatrix.scaleY = 1;
            }

            // Fix constrain translate [left, top] position
            if (translateX > 0) {
                transformMatrix.translateX = 0;
            }
            if (translateY > 0) {
                transformMatrix.translateY = 0;
            }
            // Fix constrain translate [right, bottom] position
            const max = applyMatrixToPoint(transformMatrix, {
                x: width,
                y: height
            });
            if (max.x < width) {
                transformMatrix.translateX =
                    translateX + Math.abs(max.x - width);
            }
            if (max.y < height) {
                transformMatrix.translateY =
                    translateY + Math.abs(max.y - height);
            }

            // Return the matrix
            return transformMatrix;
        },
        [width, height]
    );

    return (
        <div style={{ background }}>
            <Zoom<SVGSVGElement>
                width={width}
                height={height}
                initialTransformMatrix={initialTransform}
                constrain={constrain}
            >
                {zoom => (
                    <div className={classes['relative']}>
                        <svg
                            width={width}
                            height={height}
                            onMouseOut={hideTooltip}
                            ref={zoom.containerRef}
                        >
                            <g transform={zoom.toString()}>
                                <rect width={width} height={height} rx={5} />
                                <Treemap<typeof data>
                                    top={margin.top}
                                    root={
                                        data as unknown as HierarchyNode<
                                            HierarchyNode<
                                                HierarchyNode<TreeData>
                                            >
                                        >
                                    }
                                    size={xMaxYmax}
                                    tile={activeSquarifyFunction}
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
                                                        fn={
                                                            activeSquarifyFunction
                                                        }
                                                        height={height}
                                                        node={node}
                                                        margin={margin}
                                                        handleMouseOver={
                                                            handleMouseOver
                                                        }
                                                        colorScale={colorScale}
                                                    ></TreeLeaf>
                                                ))}
                                        </Group>
                                    )}
                                </Treemap>
                            </g>
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
                    </div>
                )}
            </Zoom>
        </div>
    );
}

export default TreeMap;
