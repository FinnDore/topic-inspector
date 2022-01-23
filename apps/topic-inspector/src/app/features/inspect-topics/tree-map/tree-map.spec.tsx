import { render } from '@testing-library/react';
import TreeMap from './tree-map';
import TEST_DATA from '../../../../static/kafka-log-dirs-output';
import { hierarchy, stratify } from '@visx/hierarchy';
import { TreeData } from '../../../_interfaces/tree-data.model';
import { kafkaLogDirsToTree } from '../../../_util/kafka-log-dirs-to-tree';

describe('TreeMap', () => {
    it('should render successfully', () => {
        const data = stratify<TreeData>()
            .id(d => d.id)
            .parentId(d => d.parent)(kafkaLogDirsToTree(TEST_DATA))
            .sum(d => d.size || 0);

        const dataToUse = hierarchy(data).sort(
            (a, b) => (b.value || 0) - (a.value || 0)
        );

        const props = { width: 10, height: 10, data: dataToUse };
        const { baseElement } = render(<TreeMap {...props} />);
        expect(baseElement).toBeTruthy();
    });
});
