import { DeepPartial, PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'lodash';
import { StoreAction } from '../../_enums/store-action';
import { TreeMapSettings } from '../../_interfaces/tree-map-settings.model';

export type patchTreeMapSettingsReducerPayload = PayloadAction<
    DeepPartial<TreeMapSettings>
>;

const DEFAULT_STATE: TreeMapSettings = {
    squarifyFunctionName: 'treemapSquarify',
    color1: '#fc0f03',

    color2: '#5a03fc'
};

/**
 * Updates the current tree map settings
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function patchTreeMapSettingsReducer(
    state = DEFAULT_STATE,
    action: patchTreeMapSettingsReducerPayload
) {
    if (action.type === StoreAction.PATCH_TREE_MAP_SETTINGS) {
        return merge({ ...state }, action.payload);
    }

    return state;
}
