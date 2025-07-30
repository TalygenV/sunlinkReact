import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { firestore } from "../firebase";
import { localUserData } from '../store/solarSlice'

export const updateUserStepName = async (stepName: string) => {
  try {
    const data = localStorage.getItem("userData");
    if (!data) {
      console.error("userData not found in localStorage");
      return;
    }

    const userData: localUserData = JSON.parse(data);
    const uid = userData?.uid;

    if (!uid) {
      console.error("UID not found in userData");
      return;
    }

    const validSteps = ["solarResult", "systemOverview", "systemDesign", "choosePlan"];
    if (!validSteps.includes(stepName)) {
      console.error("Invalid step name:", stepName);
      return;
    }

    await setDoc(doc(firestore, "users", uid), { stepName }, { merge: true });
    console.log("✅ Step name updated to:", stepName);
  } catch (error) {
    console.error("❌ Failed to update step name:", error);
  }
};

export const getUserStepFromFirebase = async () => {
  const uid = JSON.parse(localStorage.getItem("uid") || "null");

  if (!uid) {
    console.error("UID not found in localStorage");
    return null;
  }

  try {
    const userDocRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const stepName = docSnap.data().stepName;
      return stepName;
    }
    else {
      console.warn("No document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

export const getUserDocument = async () => {
  const uid = JSON.parse(localStorage.getItem("uid") || "null");

  if (!uid) {
    console.error("UID not found in localStorage");
    return null;
  }

  try {
    const userDocRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("No document found for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};
