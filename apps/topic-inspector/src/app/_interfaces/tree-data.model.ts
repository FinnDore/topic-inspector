/**
 * The tree data used in the tre map chart
 */
export interface TreeData {
    /**
     * {@property} Id of the current node
     */
    id: string;
    /**
     * {@property} Id of the current node's parent
     */
    parent: string | null;
    /**
     * {@property} size of the current node
     */
    size: number | null;

    /**
     * {@property} the topicName
     */
    topicName?: string;
    /**
     * {@property} the formatted size
     */
    topicSize?: string;
}
