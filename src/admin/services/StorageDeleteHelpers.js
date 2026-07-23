import {
  getStorage,
  ref,
  listAll,
  deleteObject,
} from "firebase/storage";

const storage = getStorage();

/* ===========================================
      DELETE STORAGE FOLDER
=========================================== */

export async function deleteStorageFolder(
  folderPath
) {
  try {
    const folderRef = ref(storage, folderPath);

    const result = await listAll(folderRef);

    await Promise.all(
      result.items.map((itemRef) =>
        deleteObject(itemRef)
      )
    );

    console.log(
      `Deleted ${result.items.length} storage files`
    );

    return true;

  } catch (error) {

    console.error(
      "Storage Delete Error:",
      error
    );

    return false;

  }
}