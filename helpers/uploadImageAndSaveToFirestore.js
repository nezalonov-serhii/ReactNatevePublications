import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uriToBlob } from "./uriToBlob";
import { storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

export const uploadImageAndSaveToFirestore = async (imageUri) => {
   try {
      const imageBlob = await uriToBlob(imageUri);
      const uniqueAvatarId = Date.now().toString();
      const storageImageRef = ref(storage, `avatar/${uniqueAvatarId}`);

      await uploadBytes(storageImageRef, imageBlob);
      const imageUrl = await getDownloadURL(storageImageRef);

      const avatarData = {
         avatar: imageUrl,
      };

      await addDoc(collection(db, "avatar"), avatarData);

      return imageUrl;
   } catch (error) {
      console.log(error);
      return null;
   }
};
