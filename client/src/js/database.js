import { openDB } from "idb";

const initdb = async () =>
  await openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("editor", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("putDB content", content);
  const editorDB = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = editorDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.add(content);
  const result = await request;
  console.log("DATA SAVED . . .", result);
};

export const getDb = async () => {
  const contactDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = contactDb.transaction("jate", "readonly");
  // Open up the desired object store.
  const store = tx.objectStore("editor");
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
