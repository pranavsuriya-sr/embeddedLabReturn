// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import { getDatabase, ref, push, get, update, set } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

import { initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, push, get, update} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDsmGooNCbVlQY-KZE9-YIhGhXTTUfnKy4",
    authDomain: "appntapp-2d799.firebaseapp.com",
    projectId: "appntapp-2d799",
    storageBucket: "appntapp-2d799.appspot.com",
    messagingSenderId: "740407693598",
    appId: "1:740407693598:web:cf495254e20b2ac93ff90f",
    measurementId: "G-Q53J0PGR4Y"
  };
  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);
  
  

// ...
// Reference to the second form and its elements
const form2 = document.getElementById("contactForm4");
const r2Input = document.getElementById("rl2");
const appointmentDetailsText = document.getElementById("appointmentDetailsText");
const sem2Input = document.getElementById("sem2");
const degree2Input = document.getElementById("degree2");
const branch2Input = document.getElementById("branch2");

form2.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const r2 = r2Input.value;
  const sem2 = sem2Input.value;
  const deg2 = degree2Input.value;
  const branch2 = branch2Input.value;

  const appointmentsRef = ref(database, 'appointments');

  try {
    const snapshot = await get(appointmentsRef);
    const appointments = snapshot.val();

    if (appointments) {
      const filteredAppointments = Object.values(appointments).reverse().filter(
        (app) => app.Roll_No === r2 && app.sem === sem2 && app.degree === deg2 && app.branch === branch2
      );

      if (filteredAppointments.length > 0) {
        // Display the components once
        appointmentDetailsText.textContent = `Degree : ${filteredAppointments[0].degree}, Sem : ${filteredAppointments[0].sem}, Branch : ${filteredAppointments[0].branch}, Roll No: ${filteredAppointments[0].Roll_No}\n`;

        // Display all matching entries
        filteredAppointments.forEach(appointment => {
          appointmentDetailsText1.textContent += `Component: ${appointment.Cmp}, Number of Components: ${appointment.Cmpn}\n`;
          appointmentDetailsText2.textContent += `Date: ${appointment.gotdate}, Return: ${appointment.sentdate}\n\n`;
        });
      } else {
        appointmentDetailsText.textContent = "Data not found for the specified Roll No.";
        appointmentDetailsText1.textContent = `Component: NULL, NULL`;
        appointmentDetailsText2.textContent = `Date: NULL, Return: NULL`;
      }
    } else {
      appointmentDetailsText.textContent = "No data available.";
      appointmentDetailsText1.textContent = `Component: NULL, NULL`;
      appointmentDetailsText2.textContent = `Date: NULL, Return: NULL`;
    }
  } catch (error) {
    // Handle errors if data retrieval fails
    appointmentDetailsText.textContent = "Error retrieving student data: " + error;
    appointmentDetailsText1.textContent = `Component: NULL, NULL`;
    appointmentDetailsText2.textContent = `Date: NULL, Return: NULL`;
  }

  // Clear the form field
  r2Input.value = '';
  sem2Input.value = '';
  degree2Input.value = '';
  branch2Input.value = '';
});


const form3 = document.getElementById("contactForm3");
const r3Input = document.getElementById("rl3");
const comp3Input = document.getElementById("co3");
const date2Input = document.getElementById("date2");
const degree3Input = document.getElementById("degree3");
const sem3Input = document.getElementById("sem3");
const branch3Input = document.getElementById("branch3");
const returnDetailsText = document.getElementById("ReturnText");

form3.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const r3 = r3Input.value;
    const c3 = comp3Input.value;
    const d3 = degree3Input.value;
    const s3 = sem3Input.value;
    const b3 = branch3Input.value;
    const rtd = date2Input.value;
    const appointmentsRef = ref(database, 'appointments');

    const snapshot = await get(appointmentsRef);
    const appointments = snapshot.val();
    

    if (appointments) {
      const appointmentKey = Object.keys(appointments).reverse().find(
        (key) => appointments[key].Roll_No === r3 && appointments[key].sem === s3 && appointments[key].branch === b3 && appointments[key].degree === d3 && appointments[key].Cmp === c3
      );

      if (appointmentKey) {
        const appointmentUpdate = {};
        appointmentUpdate[`${appointmentKey}/sentdate`] = rtd;
        const compName = appointments[appointmentKey].Cmp;
const cmpNumber = appointments[appointmentKey].Cmpn;
        update(appointmentsRef, appointmentUpdate)
          .then(async() => {
            // Data has been successfully updated

            const componentsRef = ref(database, 'components');
            const componentsSnapshot = await get(componentsRef);
            const componentsData = componentsSnapshot.val();
            for (const [akey, app] of Object.entries(componentsData)) {
              if (app.Component_Name ===  compName) {
                const componentUpdate = {};
                componentUpdate[`${akey}/Component_Quantity`] = app.Component_Quantity + parseInt( cmpNumber);
                update(componentsRef, componentUpdate);
              }
            }
              alert("Components returned");

            // further actions or UI updates here
          })
          .catch((error) => {
            // Handle errors if data update fails
            alert("Error updating appointment data: ", error);
          });
      } else {
        returnDetailsText.textContent = "Data not found for the specified data.";
      }
    } else {
      returnDetailsText.textContent = "No data available.";
    }
  } catch (error) {
    returnDetailsText.textContent = "Error retrieving student data: ";
  }

  r3Input.value = '';
  date2Input.VALUE = '';
  sem3Input.value = '';
  degree3Input.value = '';
  branch3Input.value = '';
});
