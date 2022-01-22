import { ReactElement } from 'react';
import JsonInput from './json-input/json-input';

/**
 * Feature page for ingesting [kafka-log-dirs](https://docs.cloudera.com/runtime/7.2.1/kafka-managing/topics/kafka-manage-cli-logdir.html) and displaying the visualization for it
 *
 * @returns {object} the component
 */
export function InspectTopics(): ReactElement {
    return <JsonInput></JsonInput>;
}

export default InspectTopics;
