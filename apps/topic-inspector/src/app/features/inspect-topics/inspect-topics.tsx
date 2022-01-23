import { Button } from '@mui/material';
import { hierarchy, stratify } from '@visx/hierarchy';
import { ParentSize } from '@visx/responsive';
import { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import TEST_DATA from '../../../static/kafka-log-dirs-output';
import { TreeData } from '../../_interfaces/tree-data.model';
import { RootState } from '../../_store/store';
import { setKafkaLogDirs } from '../../_store/_actions/update-kafka-log-dirs.action';
import { kafkaLogDirsToTree } from '../../_util/kafka-log-dirs-to-tree';
import classes from './inspect-topics.module.scss';
import { JsonInput } from './json-input/json-input';
import TreeMap from './tree-map/tree-map';

/**
 * Feature page for ingesting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) and displaying the visualization for it
 *
 * @returns {object} the component
 */
export function InspectTopics(): ReactElement {
    const dataSelector = useSelector(
        ({ updateKafkaLogDirsReducer }: RootState) => updateKafkaLogDirsReducer
    );

    const root = useCallback(() => {
        if (!dataSelector) {
            return null;
        }
        try {
            const data = stratify<TreeData>()
                .id(d => d.id)
                .parentId(d => d.parent)(kafkaLogDirsToTree(dataSelector))
                .sum(d => d.size || 0);

            return hierarchy(data).sort(
                (a, b) => (b.value || 0) - (a.value || 0)
            );
        } catch {
            return null;
        }
    }, [dataSelector])();

    return (
        <div className={classes['container']}>
            <JsonInput></JsonInput>
            {root ? (
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
            ) : (
                <div className={classes['no-data']}>
                    <p>Enter some data </p>
                    <strong>or</strong>{' '}
                    <Button
                        variant="outlined"
                        onClick={() => setKafkaLogDirs(TEST_DATA)}
                    >
                        Use test data
                    </Button>
                </div>
            )}
        </div>
    );
}
