import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import classes from './app.module.scss';
import { InspectTopics } from './features/inspect-topics/inspect-topics';
import { Header } from './header/header';
import { ThemeMode } from './_enums/theme-mode';
import { RootState } from './_store/store';

/**
 * The app component
 *
 * @returns {object} the component
 */
export function App() {
    const themeMode = useSelector(
        (state: RootState): ThemeMode => state.themeMode
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main:
                            themeMode === ThemeMode.dark ? '#ffffff' : '#000000'
                    },
                    contrastThreshold: 3,
                    tonalOffset: 0.2
                }
            }),
        [themeMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes['container']}>
                <Header></Header>
                <Route
                    path="/"
                    exact
                    render={() => <InspectTopics></InspectTopics>}
                />
                <Route path="/about" exact render={() => <div>about</div>} />
                <Route path="/help" exact render={() => <div>help</div>} />
            </div>
        </ThemeProvider>
    );
}
