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

const ViewToggle = () => {
  const { settings, dispatch } = useSettings();

  // Use dispatch to update the view (grid or list)
  function setView(view) {
    dispatch({
      type: "SET_VIEW",
      payload: view,
    });
  };

  return (
    <div className="view-toggle">

      <IconContext.Provider value={{ className: "view-icon" }}>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.view === "grid"
          })}
          onClick={() => setView("grid")}
        >
          <BsFillGridFill />
          {/* <FontAwesomeIcon icon={faGrip} size="xl" /> */}
        </button>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.view === "smallgrid"
          })}
          onClick={() => setView("smallgrid")}
        >
          <BsFillGrid3X3GapFill />
          {/* <FontAwesomeIcon icon={faList} size="xl" /> */}
        </button>

        <button
          className={cx('btn', 'btn--toggle', 'strip', {
            active: settings.view === "list"
          })}
          onClick={() => setView("list")}
        >
          <BsFillGrid3X2GapFill />
          {/* <FontAwesomeIcon icon={faList} size="xl" /> */}
        </button>

      </IconContext.Provider>

    </div>
  );
};

export default ViewToggle;
