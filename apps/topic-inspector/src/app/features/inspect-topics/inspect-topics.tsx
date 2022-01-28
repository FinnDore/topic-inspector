import { Button } from '@mui/material';
import { hierarchy, stratify } from '@visx/hierarchy';
import { ParentSize } from '@visx/responsive';
import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TEST_DATA from '../../../static/kafka-log-dirs-output';
import { KafkaLogDirs } from '../../_interfaces/kafka-log-dirs.model';
import { TreeData } from '../../_interfaces/tree-data.model';
import { RootState } from '../../_store/store';
import { setKafkaLogDirs } from '../../_store/_actions/update-kafka-log-dirs.action';
import { kafkaLogDirsToTree } from '../../_util/kafka-log-dirs-to-tree';
import classes from './inspect-topics.module.scss';
import { JsonInput } from './json-input/json-input';
import { TreeMap } from './tree-map/tree-map';

/**
 * Feature page for ingesting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) and displaying the visualization for it
 *
 * @returns {object} the component
 */
export function InspectTopics(): ReactElement {
    const dataSelector: KafkaLogDirs = useSelector(
        ({ updateKafkaLogDirsReducer }: RootState) => updateKafkaLogDirsReducer
    );

    const roots = useMemo(() => {
        if (!dataSelector) {
            return null;
        }

        const currentRoots = [];
        const brokers = kafkaLogDirsToTree(dataSelector);
        for (const broker of brokers) {
            try {
                const data = stratify<TreeData>()
                    .id(d => d.id)
                    .parentId(d => d.parent)(broker)
                    .sum(d => d.size || 0);

                currentRoots.push(
                    hierarchy(data).sort(
                        (a, b) => (b.value || 0) - (a.value || 0)
                    )
                );
            } catch (e) {
                continue;
            }
        }
        return currentRoots;
    }, [dataSelector]);

    return (
        <>
            <JsonInput></JsonInput>
            {roots ? (
                roots.map((root, i) => (
                    <div key={i}>
                        <div className={classes['chart']}>
                            <ParentSize className={classes['parent-size']}>
                                {parent => (
                                    <TreeMap
                                        title={`Broker: ${dataSelector.brokers[i].broker}`}
                                        width={parent.width}
                                        height={parent.height}
                                        data={root}
                                    />
                                )}
                            </ParentSize>
                        </div>
                    </div>
                ))
            ) : (
                <div className={classes['no-data']}>
                    <p>Enter some data </p>
                    <strong>or</strong>
                    <Button
                        variant="outlined"
                        onClick={() => setKafkaLogDirs(TEST_DATA)}
                    >
                        Use test data
                    </Button>
                </div>
            )}
        </>
    );
}
