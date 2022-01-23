import { ParentSize } from '@visx/responsive';
import { ReactElement } from 'react';
import JsonInput from './json-input/json-input';
import TreeMap from './tree-map/tree-map';
import classes from './inspect-topics.module.scss';
import { hierarchy, stratify } from '@visx/hierarchy';
import { Shakespeare } from '@visx/mock-data/lib/mocks/shakespeare';
import { kafkaLogDirsToTree } from '../../_util/kafka-log-dirs-to-tree';
import kafkaLogDirs from '../../../static/kafka-log-dirs-output';
const data = stratify<Shakespeare>()
    .id(d => d.id)
    .parentId(d => d.parent)(kafkaLogDirsToTree(kafkaLogDirs))
    .sum(d => d.size || 0);

const root = hierarchy(data).sort((a, b) => (b.value || 0) - (a.value || 0));
/**
 * Feature page for ingesting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) and displaying the visualization for it
 *
 * @returns {object} the component
 */
export function InspectTopics(): ReactElement {
    console.log(root);
    const chart = (
        <div className={classes['chart']}>
            <ParentSize>
                {parent => (
                    <TreeMap
                        width={parent.width}
                        height={parent.height}
                        data={root}
                    ></TreeMap>
                )}
            </ParentSize>
        </div>
    );
    return (
        <div className={classes['container']}>
            <JsonInput></JsonInput>
            {chart}
        </div>
    );
}

export default InspectTopics;
