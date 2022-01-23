import { KafkaLogDirs } from '../_interfaces/kafka-log-dirs.model';
import { TreeData } from '../_interfaces/tree-data.model';
import { formatBytes } from './format-bytes';

/**
 * Converts kafka-log-dirs to a tree
 *
 * @param dirs the kafka-log-dirs to convert to a tree
 * @returns {object} kafka log dirs in a format for a tree chart
 */
export function kafkaLogDirsToTree(dirs: KafkaLogDirs): TreeData[] {
    const outputData: TreeData[] = [{ id: 'root', parent: null, size: null }];

    for (const [index, broker] of dirs.brokers.entries()) {
        const brokerName = `broker-${index}`;
        outputData.push({ id: brokerName, parent: 'root', size: null });
        for (const [logDirIndex, logDir] of broker.logDirs.entries()) {
            if (logDir.error) {
                break;
            }
            const logDirName = `${brokerName}-${logDirIndex}`;
            outputData.push({ id: logDirName, parent: brokerName, size: null });

            for (const partition of logDir.partitions) {
                outputData.push({
                    id: `${logDirName}-${partition.partition}`,
                    parent: logDirName,
                    size: partition.size,
                    toolTip: `${partition.partition} ${formatBytes(
                        partition.size
                    )}`
                });
            }
        }
    }
    return outputData;
}
