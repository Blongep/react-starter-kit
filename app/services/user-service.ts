import { getApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { app } from "../core/firebaseInit";
import { UserType } from "../types/user-type";
const db = getFirestore(app ? app : getApp());

export const fetchUserType = async (userId: string): Promise<UserType> => {
  const querySnapshotUserType = await getDocs(
    query(collection(db, "userTypes"), where("userId", "==", userId)),
  );
  if (querySnapshotUserType.docs.length > 0) {
    const userType = querySnapshotUserType.docs[0].data();
    return {
      id: userType.id,
      userId: userId,
      type: userType.type,
    } as unknown as UserType;
  }
  return {} as unknown as UserType;
};
