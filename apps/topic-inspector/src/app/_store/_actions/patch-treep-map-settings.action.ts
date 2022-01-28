import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { setThemeModeReducerPayload } from '../_reducers/update-theme.reducer';

/**
 * Patches the tree map settings
 *
 * @param treeMapSettings the themeMode to set
 * @returns {void}
 */
export function patchTreeMapSettings(
    treeMapSettings: setThemeModeReducerPayload['payload']
): void {
    GlobalStore.dispatch<setThemeModeReducerPayload>({
        type: StoreAction.PATCH_TREE_MAP_SETTINGS,
        payload: treeMapSettings
    });
}
