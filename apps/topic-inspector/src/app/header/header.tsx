import { Button, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GITHUB_MARK_DARK from '../../assets/github-mark-dark.png';
import GITHUB_MARK_LIGHT from '../../assets/github-mark-light.png';
import { ThemeMode } from '../_enums/theme-mode';
import { RootState } from '../_store/store';
import { setThemeMode } from '../_store/_actions/update-theme-mode.action';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import classes from './header.module.scss';
const GITHUB_LINK = 'https://github.com/FinnDore/topic-inspector';

/**
 * The header component for the app
 *
 * @returns {object} the component
 */
export function Header() {
    const themeMode = useSelector(
        (state: RootState): ThemeMode => state.themeMode
    );

    return (
        <header className={classes['header']}>
            <h2>Topic Inspector</h2>
            <div className={classes['button-row']}>
                <IconButton
                    onClick={() =>
                        setThemeMode(
                            themeMode === ThemeMode.dark
                                ? ThemeMode.light
                                : ThemeMode.dark
                        )
                    }
                    color="inherit"
                >
                    {themeMode === ThemeMode.dark ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
                <a href={GITHUB_LINK} target="_blank" rel="noreferrer">
                    <IconButton
                        className={classes['icon-button']}
                        color="primary"
                        aria-label="Goto topic inspectors github"
                    >
                        <img
                            src={
                                themeMode === ThemeMode.dark
                                    ? GITHUB_MARK_LIGHT
                                    : GITHUB_MARK_DARK
                            }
                            alt="Github mark"
                        ></img>
                    </IconButton>
                </a>
            </div>
        </header>
    );
}
