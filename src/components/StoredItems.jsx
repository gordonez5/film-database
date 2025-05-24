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
  const archive = [];
  const keys = Object.keys(localStorage);
  let i = 0;
  let key;
  console.log('keys', keys);

  for (; key = keys[i]; i++) {
    archive.push( key + '=' + localStorage.getItem(key));
  }
  return archive;
}


function StoredItems() {
  const { library } = useMovieContext();

  const saveAsDuplicate = () => {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()}`;
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const datetime = `${date}__${time}`;
    // console.log('datetime', datetime);
    console.log('library', library);
    console.log('# of items:', library.length);
    // console.log('Str: library', JSON.stringify(library));
    // console.log('name', `owned_${createRandomString()}_${datetime}`);
    localStorage.setItem(`owned_${datetime}`, JSON.stringify(library));
    const items = { ...localStorage };
    console.log('localStorage', items);
    // console.log('archive', getStoredLibraryArchive());
    // const obj = JSON.parse(library);
    // console.log();
  };

  return (
    <button className="btn secondary" onClick={saveAsDuplicate}>Save as duplicate</button>
  );

};

export default StoredItems;