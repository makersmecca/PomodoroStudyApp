import { useEffect, useState, useContext } from "react";
import { db } from "../auth/firebaseAuth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserContext } from "./UserContext";

const useStoreStat = (componentName = "Unknown") => {
  const [totalTime, setTotalTime] = useState("00:00:00");
  const { currentUser } = useContext(UserContext);
  const [dataArray, setDataArray] = useState([]);

  //object to provide collection names corresponding to location
  const components = {
    "/": "pomodoro",
    "/rest": "rest",
    "/customtimer": "custom",
  };

  useEffect(() => {
    if (currentUser) {
      fetchData(currentUser.email);
    }
  }, [currentUser]);

  //fetches the exisating user data from the firestore db to add new data to it
  const fetchData = async (email) => {
    // console.log(components[componentName]);
    try {
      if (!email) return;
      const docRef = doc(db, "userstats", email);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const dataArray = Object.entries(data).map(
          //local dataArray constant store firestore data object
          ([component, timeDuration]) => ({
            component,
            timeDuration,
          })
        );
        setDataArray(dataArray);
        // dataArray.forEach((x) => console.log(x));
        const componentField = components[componentName];
        const componentData = dataArray.find(
          (item) => item.component === componentField
        );
        return componentData ? componentData.timeDuration : "00:00:00";
      } else {
        setDataArray([]);
      }
    } catch (err) {
      console.error(err);
      setDataArray([]);
    }
  };

  //function to push data to fireStore db
  const updateFirestore = async (newTime) => {
    console.log(newTime);

    try {
      if (!currentUser?.email) return;

      const fieldToUpdate = components[componentName]; //get corresponding field name from component name object
      if (!fieldToUpdate) return;

      const userDocRef = doc(db, "userstats", currentUser.email);
      await setDoc(
        userDocRef,
        {
          [fieldToUpdate]: newTime, //fiedToUpdate is component name
        },
        { merge: true } // merge: true ensures other fields aren't overwritten
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addTime = async (timeSpent) => {
    try {
      if (!timeSpent || typeof timeSpent !== "number" || timeSpent < 0) {
        throw new Error("Invalid time input");
      }
      if (!currentUser?.email) {
        throw new Error("User not authenticated");
      }

      const currentTimeFromDB = await fetchData(currentUser?.email); //fetch user data
      let newTotalSeconds; //stores existing time data

      //check for new user/ no existing data
      if (!currentTimeFromDB || currentTimeFromDB === "00:00:00") {
        newTotalSeconds = timeSpent;
      } else {
        const [existingHours, existingMinutes, existingSeconds] =
          currentTimeFromDB.split(":").map(Number);
        const existingTotalSeconds =
          existingHours * 3600 + existingMinutes * 60 + existingSeconds;
        newTotalSeconds = existingTotalSeconds + timeSpent;
      }

      //fomratiing time
      const hours = Math.floor(newTotalSeconds / 3600);
      const minutes = Math.floor((newTotalSeconds % 3600) / 60);
      const seconds = newTotalSeconds % 60;
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; //combined formatted time
      setTotalTime(formattedTime);

      await updateFirestore(formattedTime);
    } catch (error) {
      console.error(`Error in addTime for ${componentName}:`, error);
    }
  };

  return { totalTime, addTime };
};

export default useStoreStat;
