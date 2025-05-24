import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconContext } from "react-icons";
import {
  BsFillGrid3X2GapFill,
  BsFillGrid3X3GapFill,
  BsFillGridFill
} from 'react-icons/bs';
import cx from 'classnames';

import {
  faGrip,
  faList
} from '@fortawesome/free-solid-svg-icons'

import { useSettings } from "../../contexts/SettingsContext";

const SortToggle = () => {
  const { settings, dispatch } = useSettings();

  // Use dispatch to update the view (grid or list)
  function setSort(sort) {
    dispatch({
      type: "SET_SORT",
      payload: sort,
    });
  };

  return (
    <div className="sort-toggle">

      <IconContext.Provider value={{ className: "sort-icon" }}>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.sort === "default"
          })}
          onClick={() => setSort("default")}
        >
          Default
          {/* <BsFillGridFill /> */}
          {/* <FontAwesomeIcon icon={faGrip} size="xl" /> */}
        </button>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.sort === "rating"
          })}
          onClick={() => setSort("rating")}
        >
          Rating
          {/* <BsFillGrid3X3GapFill /> */}
          {/* <FontAwesomeIcon icon={faList} size="xl" /> */}
        </button>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.sort === "alphabetical"
          })}
          onClick={() => setSort("alphabetical")}
        >
          A-Z
          {/* <BsFillGrid3X2GapFill /> */}
          {/* <FontAwesomeIcon icon={faList} size="xl" /> */}
        </button>

      </IconContext.Provider>

    </div>
  );
};

export default SortToggle;
