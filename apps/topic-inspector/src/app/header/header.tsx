import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import GITHUB_MARK_DARK from '../../assets/github-mark-dark.png';
import classes from './header.module.scss';
const GITHUB_LINK = 'https://github.com/FinnDore/topic-inspector';

/**
 * The header component for the app
 *
 * @returns {object} the component
 */
export function Header() {
    return (
        <header className={classes['header']}>
            <h2>Topic Inspector</h2>
            <div className={classes['button-row']}>
                <Link to="/">
                    <Button>Inspect Topic</Button>
                </Link>
                <Link to="/help">
                    <Button>Help</Button>
                </Link>
                <Link to="/about">
                    <Button>About</Button>
                </Link>
                <Button
                    className={classes['icon-button']}
                    color="primary"
                    aria-label="Goto topic inspectors github"
                >
                    <a href={GITHUB_LINK}>
                        <img src={GITHUB_MARK_DARK} alt="Github mark"></img>
                    </a>
                </Button>
            </div>
        </header>
    );
}
