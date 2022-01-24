import { KafkaLogDirs } from '../_interfaces/kafka-log-dirs.model';
import { TreeData } from '../_interfaces/tree-data.model';
import { formatBytes } from './format-bytes';

/**
 * Converts kafka-log-dirs to a tree
 *
 * @param dirs the kafka-log-dirs to convert to a tree
 * @returns {object} kafka log dirs in a format for a tree chart
 */
export function kafkaLogDirsToTree(dirs: KafkaLogDirs): TreeData[][] {
    const outputData: TreeData[][] = [];

    for (const [index, broker] of dirs.brokers.entries()) {
        const brokerName = `broker-${index}`;
        const topicsForBroker: TreeData[] = [
            { id: 'root', parent: null, size: null }
        ];

        const logDir = broker.logDirs[0];
        if (logDir?.error) {
            break;
        }

        for (const partition of logDir.partitions) {
            if (partition.size === 0) {
                continue;
            }
            topicsForBroker.push({
                id: `${brokerName}-${partition.partition}`,
                parent: 'root',
                size: partition.size,
                topicSize: formatBytes(partition.size),
                topicName: partition.partition
            });
        }

        outputData.push(topicsForBroker);
    }
    return outputData;
}
