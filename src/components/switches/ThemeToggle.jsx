import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faMoon,
  faSun,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames';

import { useSettings } from "../../contexts/SettingsContext";

const ThemeToggle = () => {
  const { settings, toggleTheme } = useSettings();
  return (
    <div className="theme-toggle">
      <button className={cx('btn', 'btn--toggle', 'theme')} onClick={toggleTheme}>
        {settings.theme === "light"
          ? <FontAwesomeIcon icon={faMoon} />
          : <FontAwesomeIcon icon={faSun} />
        }
        {/* Switch to {settings.theme === "light" ? "dark" : "light"} mode */}
      </button>
    </div>
  );
};

export default ThemeToggle;
