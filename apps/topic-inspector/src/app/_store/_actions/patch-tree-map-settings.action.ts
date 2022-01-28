import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { patchTreeMapSettingsReducerPayload } from '../_reducers/patch-tree-map-settings.reducer';

/**
 * Patches the tree map settings.
 *
 * @param treeMapSettings the tree map settings to set.
 * @returns {void}
 */
export function patchTreeMapSettings(
    treeMapSettings: patchTreeMapSettingsReducerPayload['payload']
): void {
    GlobalStore.dispatch<patchTreeMapSettingsReducerPayload>({
        type: StoreAction.PATCH_TREE_MAP_SETTINGS,
        payload: treeMapSettings
    });
}
