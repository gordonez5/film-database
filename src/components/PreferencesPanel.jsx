import SortToggle from "./switches/SortToggle";
import ThemeToggle from "./switches/ThemeToggle";
import ViewToggle from "./switches/ViewToggle";

function PreferencesPanel() {
  return (
    <div className="preferences-panel">
      <SortToggle />
      <ViewToggle />
      <ThemeToggle />
    </div>
  );
};

export default PreferencesPanel;