import { Button } from '@mui/material';
import { hierarchy, stratify } from '@visx/hierarchy';
import { ParentSize } from '@visx/responsive';
import { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import TEST_DATA from '../../../static/kafka-log-dirs-output';
import { KafkaLogDirs } from '../../_interfaces/kafka-log-dirs.model';
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
    const dataSelector: KafkaLogDirs = useSelector(
        ({ updateKafkaLogDirsReducer }: RootState) => updateKafkaLogDirsReducer
    );

    const roots = useCallback(() => {
        if (!dataSelector) {
            return null;
        }

        const roots = [];
        const brokers = kafkaLogDirsToTree(dataSelector);
        for (const broker of brokers) {
            try {
                const data = stratify<TreeData>()
                    .id(d => d.id)
                    .parentId(d => d.parent)(broker)
                    .sum(d => d.size || 0);

                roots.push(
                    hierarchy(data).sort(
                        (a, b) => (b.value || 0) - (a.value || 0)
                    )
                );
            } catch (e) {
                continue;
            }
        }
        return roots;
    }, [dataSelector])();

    return (
        <>
            <JsonInput></JsonInput>
            {roots ? (
                roots.map((root, i) => (
                    <div key={i}>
                        <h3 className={classes['broker-name']}>
                            Broker: {dataSelector.brokers[i].broker}
                        </h3>
                        <div className={classes['chart']}>
                            <ParentSize>
                                {parent => (
                                    <TreeMap
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
