import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCR9vIv1KYjcn8FEZRQK5RLF2-IAwz_hEo",
    authDomain: "next-app-92788.firebaseapp.com",
    projectId: "next-app-92788",
    storageBucket: "next-app-92788.appspot.com",
    messagingSenderId: "109524770569",
    appId: "1:109524770569:web:416a9c9c36113513dd3dd8"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }
  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;