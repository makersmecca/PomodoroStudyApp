import { useEffect, useState, useContext } from "react";
import { db } from "../auth/firebaseAuth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { UserContext } from "./UserContext";

const useStoreStat = (componentName = "Unknown") => {
  const [totalTime, setTotalTime] = useState("00:00:00");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      // console.log("User is signed in:", currentUser.email);
      fetchData(currentUser.email);
    } else {
      // console.log("User is signed out");
    }
  }, [currentUser]);

  const fetchData = async (email) => {
    if (!email) return;
    const sfRef = db.collection("users").doc("ayudhnandi@gmail.com");
    const collections = await sfRef.listCollections();
    collections.forEach((collection) => {
      console.log("Found subcollection with id:", collection.id);
    });
  };

  const addTime = (timeSpent) => {
    try {
      // Convert existing total time to seconds
      const [existingHours, existingMinutes, existingSeconds] = totalTime
        .split(":")
        .map(Number);
      const existingTotalSeconds =
        existingHours * 3600 + existingMinutes * 60 + existingSeconds;

      // Add new time spent (in seconds) to existing total
      const newTotalSeconds = existingTotalSeconds + timeSpent;

      // Convert new total seconds to HH:MM:SS format
      const hours = Math.floor(newTotalSeconds / 3600);
      const minutes = Math.floor((newTotalSeconds % 3600) / 60);
      const seconds = newTotalSeconds % 60;

      // Format each component to ensure two digits
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      // Combine into HH:MM:SS format
      const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

      // Update local state
      setTotalTime(formattedTime);

      // Console log the new total time with component name
      console.log(
        `${componentName} - ${formattedTime} -- ${new Date().toLocaleDateString()}`
      );
    } catch (error) {
      console.error(`Error in addTime for ${componentName}:`, error);
    }
  };

  return { totalTime, addTime };
};

export default useStoreStat;
