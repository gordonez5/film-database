import { faJs } from "@fortawesome/free-brands-svg-icons";
import { useMovieContext } from "../contexts/MovieContext";

function createRandomString(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

function getStoredLibraryArchive() {
  // const archive = {
  //   settings: {},
  //   favorites: [],
  //   owned: []
  // };
  // const keys = Object.keys(localStorage);
  // const state = {
  //   items: keys.reduce((acc, key) => ({...acc, [key]: ''}), {}),
  // };
  // keys.forEach(item => {
  // });
  const backups = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("libraryBackup_")) {
      const data = localStorage.getItem(key);
      backups.push({
        key,
        data: JSON.parse(data),
        timestamp: key.replace("libraryBackup_", "")
      });
    }
  }
  // Optional: sort backups by timestamp (latest first)
  backups.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  return backups;




  archive.settings = localStorage.getItem(keys['settings']);
  // let i = 0;
  // let key;
  console.log('keys', keys);
  console.log('archive', archive);
  console.log('state', state);

  // for (; key = keys[i]; i++) {
  //   archive.push( key + '=' + localStorage.getItem(key));
  //   archive.push( key );
  // }
  return JSON.parse(archive);
}


function StoredItems() {
  const { library } = useMovieContext();

  const saveAsDuplicate = () => {
    const libraryData = localStorage.getItem("owned");
    if (!libraryData) {
      alert("No library data found.");
      return;
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const key = `libraryBackup_${timestamp}`;
    localStorage.setItem(key, libraryData);


    // const currentDate = new Date();
    // const date = `${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()}`;
    // const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    // const datetime = `${date}__${time}`;
    // console.log('datetime', datetime);
    // console.log('library', library);
    // console.log('# of items:', library.length);
    // console.log('Str: library', JSON.stringify(library));
    // console.log('name', `owned_${createRandomString()}_${datetime}`);
    // localStorage.setItem(`owned_${datetime}`, JSON.stringify(library));
    // const items = { ...localStorage };
    // console.log('localStorage', items);
    // const obj = JSON.parse(library);
    // console.log();
  };

  const showSavedData = () => {
    console.log('archive', getStoredLibraryArchive());
  };

  return (
    <div className="button-container">
      <button className="btn tertiary" onClick={showSavedData}>Show saved data</button>
      <button className="btn secondary" onClick={saveAsDuplicate}>Save as duplicate</button>
    </div>
  );

};

export default StoredItems;