import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, serverTimestamp, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAETNiT4oN95u1koZa_h2pmnbYC00_D-Vg",
    authDomain: "appointment-brb.firebaseapp.com",
    projectId: "appointment-brb",
    storageBucket: "appointment-brb.firebasestorage.app",
    messagingSenderId: "316662407427",
    appId: "1:316662407427:web:f367d6f5df68faafdc0936",
    measurementId: "G-SFF6KYDDLH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const auth = getAuth(app);

const submit = document.getElementById('confirm-booking');

submit.addEventListener('click', function (event) {
    event.preventDefault();
    
    // Initialize Firebase
    // alert with email and password
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const selectedBarber = document.getElementById("summary-barber").textContent;
    const selectedDate = document.getElementById("summary-date").textContent;
    const selectedTime = document.getElementById("summary-time").textContent;
    const selectedServices = document.getElementById("summary-services").textContent;

    // if (!name || !email || !phone) {
    //     alert("Please fill in all required fields.");
    //     return;
    // }

    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //         // User is not signed in, redirect to login page
    //         window.location.href = '/sign_up.html';
    //     } else {
    //         // check if date and time with the same barber already exists in the database
    //         const q = query(
    //             collection(db, "barbers-app"), 
    //             where('barber', '==', selectedBarber),
    //             where('date', '==', selectedDate),
    //             where('time', '==', selectedTime)
    //         );
    //         getDocs(q)
    //         .then((querySnapshot) => {
    //             if (querySnapshot.empty) {
    //                 // No documents found, proceed with booking
    //                 addDoc(collection(db, "barbers-app"), {
    //                     uid: user.uid,
    //                     name,
    //                     email,
    //                     phone,
    //                     barber: selectedBarber,
    //                     date: selectedDate,
    //                     time: selectedTime,
    //                     services: selectedServices,
    //                     createdAt: serverTimestamp()
    //                 })
    //                 .then(() => {
    //                     go_to_container_id("container-id");
    //                     goToSuccess();
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error code:", error.code);
    //                     console.error("Error message:", error.message);
    //                     // console.error("Error during database operations: ", error);
    //                     go_to_container_id("container-id");
    //                     goToFail();
    //                 });
    //             } else {
    //                 // Document already exists, show alert
    //                 showErrorPopup("This time slot just got booked by someone. Please choose another time.");
    //             }
    //         })
    //     }
    // });
    const q = query(
        collection(db, "barbers-app"), 
        where('barber', '==', selectedBarber),
        where('date', '==', selectedDate),
        where('time', '==', selectedTime)
    );
    getDocs(q)
    .then((querySnapshot) => {
        if (querySnapshot.empty) {
            // No documents found, proceed with booking
            console.log("");
            addDoc(collection(db, "barbers-app"), {
                // uid: user.uid,
                name,
                email,
                phone,
                barber: selectedBarber,
                month: selectedDate.split(" ")[0],
                date: selectedDate,
                time: selectedTime,
                services: selectedServices.split('€').map(service => service.split('-')[0]).join('<br>'),
                createdAt: serverTimestamp()
            })
            .then(() => {
                go_to_container_id("container-id");
                goToSuccess();
            })
            .catch((error) => {
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                // console.error("Error during database operations: ", error);
                go_to_container_id("container-id");
                goToFail();
            });
        } else {
            // Document already exists, show alert
            showErrorPopup("This time slot just got booked by someone. Please choose another time.");
        }
    })
})

document.getElementById("next-3").addEventListener('click', function() {
    // onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //         // User is not signed in, redirect to login page
    //         window.location.href = '/sign_up.html';
    //     } else {
    //         const userEmail = user.email;
    //         const userName = user.displayName || '';
            
    //         // Set the value of the email input field
    //         document.getElementById('email').value = userEmail;
    //         document.getElementById('email').disabled = true;
    //         document.getElementById('name').value = userName;
    //         document.getElementById('name').disabled = true;
    //     }
    // });

    go_to_container_id("container-id");
    // Update summary
    updateSummary();
    goToStep(4);
});

function hoursSince(timestamp) {
    // Get current time in milliseconds
    const currentTime = Date.now();
    
    // Calculate difference in milliseconds
    const diffMilliseconds = currentTime - timestamp;
    
    // Convert to hours (1 hour = 3600000 milliseconds)
    return diffMilliseconds / 3600000;
    }

// Check authentication state before page fully loads
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is logged in
//     onAuthStateChanged(auth, (user) => {
//         if (!user) {
//             // User is not signed in, redirect to login page
//             window.location.href = '/sign_up.html';
//         } else {
//             // User is signed in, you can update UI elements here if needed
//             // console.log('User is signed in', user.email, user.displayName, user.uid);
//             const hoursPassed = hoursSince(user.metadata.lastLoginAt)
//             if (hoursPassed > 1) {
//                 // User has been logged in for more than 24 hours, redirect to login page
//                 window.location.href = '/sign_up.html';
//             }
//         }
//     });
// });
    // Check if user is logged in

    // Check if user is logged in
// onAuthStateChanged(auth, (user) => {
//     if (!user) {
//         // User is not signed in, redirect to login page
//         window.location.href = '/sign_up.html';
//     } else {
//         // User is signed in, you can update UI elements here if needed
//         // console.log('User is signed in', user.email, user.displayName, user.uid);
//         const hoursPassed = hoursSince(user.metadata.lastLoginAt)
//         if (hoursPassed > 1) {
//             // User has been logged in for more than 24 hours, redirect to login page
//             window.location.href = '/sign_up.html';
//         }
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.getElementById('overlay');

    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Random floating scissors
    for (let i = 0; i < 3; i++) {
        const scissors = document.createElement('i');
        scissors.className = 'fas fa-cut scissors';
        scissors.style.top = Math.random() * 100 + '%';
        scissors.style.left = Math.random() * 100 + '%';
        scissors.style.fontSize = (Math.random() * 10 + 15) + 'px';
        scissors.style.animationDuration = (Math.random() * 10 + 10) + 's';
        scissors.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(scissors);
    }
    // Get elements
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const selectedDateEl = document.getElementById('selected-date');
    const slotsGridEl = document.getElementById('slots-grid');
    
    // Set up current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Generate calendar
    function generateCalendar(month, year) {
        // Clear previous days except header
        const dayHeaders = Array.from(calendarEl.querySelectorAll('.day-name'));
        calendarEl.innerHTML = '';
        dayHeaders.forEach(header => calendarEl.appendChild(header));
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearEl.textContent = `${monthNames[month]} ${year}`;
        
        // Add empty spaces for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day inactive';
            calendarEl.appendChild(emptyDay);
        }
        
        // Add days of the month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.textContent = day;
            
            // Check if day is in the past
            const thisDate = new Date(year, month, day);
            if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || thisDate.getDay() == 0 || thisDate.getDay() == 1) {
                dayEl.classList.add('inactive');
            } else {
                // Add click event for valid days
                dayEl.addEventListener('click', function() {
                    // Remove selected class from previous selection
                    document.querySelectorAll('.day.selected').forEach(el => {
                        el.classList.remove('selected');
                    });
                    
                    // Add selected class to this day
                    dayEl.classList.add('selected');
                    
                    // Store selected date
                    const dateStr = `${monthNames[month]} ${day}, ${year}`;
                    selectedDate = dateStr;
                    selectedDateEl.textContent = dateStr;

                    // scroll to the time pick
                    go_to_container_id("selected-date");
                    
                    // Generate time slots
                    generateTimeSlots(day, month, year);
                    
                    // Enable next button
                    document.getElementById("next-2").disabled = !selectedTime;
                });
            }
            
            calendarEl.appendChild(dayEl);
        }
    }
    
    // Generate time slots for selected date
    function generateTimeSlots(day, month, year) {
        // Clear previous slots
        slotsGridEl.innerHTML = '';
        
        // Define time slots (9AM to 6PM, 30 min intervals)
        //get the name of the day of the selected date
        const dayName = new Date(selectedDate).toLocaleString('en-us', {weekday: 'long'});
        var startHour = 10;
        var endHour = 20;
        if (dayName == "Saturday") {
            startHour = 9;
            endHour = 17;
        }
        
        // Generate mock available/booked slots based on date
        // In a real app, this would come from a database
        // When calling the function:
        const bookedSlots = []; // Initialize booked slots array
        generateMockBookedSlots(day).then(slots => {
            // Proceed with the slots data here
            bookedSlots.push(...slots);
            for (let hour = startHour; hour < endHour; hour++) {
                for (let minutes of ['00', '30']) {
                    // Format time
                    // const hourDisplay = hour > 12 ? hour - 12 : hour;
                    // const ampm = hour >= 12 ? 'PM' : 'AM';
                    // const timeString = `${hourDisplay}:${minutes} ${ampm}`;
                    const timeString = `${hour}:${minutes}`;
                    
                    // Create time slot element
                    const slotEl = document.createElement('div');
                    slotEl.className = 'time-slot';
                    slotEl.textContent = timeString;
                    
                    // Check if slot is booked
                    const timeValue = `${hour}:${minutes}`;
                    if (bookedSlots.includes(timeValue)) {
                        slotEl.classList.add('booked');
                    } else {
                        // Add click event for booking
                        slotEl.addEventListener('click', function() {
                            // Remove selected class from all time slots
                            document.querySelectorAll('.time-slot.selected').forEach(el => {
                                el.classList.remove('selected');
                            });
                            
                            // Add selected class to this slot
                            slotEl.classList.add('selected');
                            
                            // Store selected time
                            selectedTime = timeString;
                            
                            // Log the selected time
                            // console.log("Selected time:", timeString);
                            
                            // Enable next button if services are also selected
                            document.getElementById("next-2").disabled = !timeString;
                        });
                    }
                    
                    slotsGridEl.appendChild(slotEl);
                }
            }
        }).catch(error => {
            // Handle errors
        });
        // const bookedSlots = generateMockBookedSlots(day);
        // console.log("Booked slots:", bookedSlots);
        
        // for (let hour = startHour; hour < endHour; hour++) {
        //     for (let minutes of ['00', '30']) {
        //         // Format time
        //         // const hourDisplay = hour > 12 ? hour - 12 : hour;
        //         // const ampm = hour >= 12 ? 'PM' : 'AM';
        //         // const timeString = `${hourDisplay}:${minutes} ${ampm}`;
        //         const timeString = `${hour}:${minutes}`;
                
        //         // Create time slot element
        //         const slotEl = document.createElement('div');
        //         slotEl.className = 'time-slot';
        //         slotEl.textContent = timeString;
                
        //         // Check if slot is booked
        //         const timeValue = `${hour}:${minutes}`;
        //         if (bookedSlots.includes(timeValue)) {
        //             slotEl.classList.add('booked');
        //         } else {
        //             // Add click event for booking
        //             slotEl.addEventListener('click', function() {
        //                 // Remove selected class from all time slots
        //                 document.querySelectorAll('.time-slot.selected').forEach(el => {
        //                     el.classList.remove('selected');
        //                 });
                        
        //                 // Add selected class to this slot
        //                 slotEl.classList.add('selected');
                        
        //                 // Store selected time
        //                 selectedTime = timeString;
                        
        //                 // Log the selected time
        //                 // console.log("Selected time:", timeString);
                        
        //                 // Enable next button if services are also selected
        //                 document.getElementById("next-2").disabled = !timeString;
        //             });
        //         }
                
        //         slotsGridEl.appendChild(slotEl);
        //     }
        // }
    }

    async function queryDocuments(collectionName, barber_name, date_value) {
        const q = query(
            collection(db, collectionName), 
            where('barber', '==', barber_name),
            where('date', '==', date_value)
        );
        const querySnapshot = await getDocs(q);
        const documents = [];
      
        querySnapshot.forEach((doc) => {
          documents.push(doc.data().time);
        });

        console.log("Documents received:", documents);
      
        return documents;
      }
    
    // Generate random booked slots for demo purposes
    // function generateMockBookedSlots(day) {
    //     const bookedSlots = [];
    //     // console.log(auth);
    //     // Use day as seed for pseudo-random generation
    //     // const numBookings = (day % 5) + 2; // 2-6 bookings per day

    //     onAuthStateChanged(auth, (user) => {
    //         if (!user) {
    //             // User is not signed in, redirect to login page
    //             window.location.href = '/sign_up.html';
    //         } else {
    //             queryDocuments("barbers-app", selectedBarber, selectedDateEl.textContent)
    //             .then(result => {
    //             console.log("Documents receiveddddd:", result);
    //             // Process data here
    //             // return result
    //             bookedSlots.push(...result);
    //             })
    //             .catch(error => {
    //             console.error("Error fetching documents:", error);
    //             goToFail();
    //             });
    //         }
    //     });
        
    //     // for (let i = 0; i < numBookings; i++) {
    //     //     const hour = Math.floor(Math.random() * 9) + 9; // 9AM to 5PM
    //     //     const minute = Math.random() < 0.5 ? '00' : '30';
    //     //     bookedSlots.push(`${hour}:${minute}`);
    //     // }
    //     console.log("Booked slots:", bookedSlots);
        
    //     return bookedSlots;
    // }

    function generateMockBookedSlots(day) {
        const bookedSlots = [];
        
        return new Promise((resolve, reject) => {
            // Check current authentication state
            // const user = auth.currentUser;
            
            // if (!user) {
            //     window.location.href = '/sign_up.html';
            //     reject("User not authenticated");
            //     return;
            // }
            
            // Use then/catch instead of await
            queryDocuments("barbers-app", selectedBarber, selectedDateEl.textContent)
                .then(result => {
                    console.log("Documents received:", result);
                    bookedSlots.push(...result);
                    // console.log("Booked slots:", bookedSlots);
                    resolve(bookedSlots); // Return the results when ready
                })
                .catch(error => {
                    console.error("Error fetching documents:", error);
                    goToFail();
                    reject(error);
                });
        }   );
    }
    
    // When calling this function, use await:
    // const slots = await generateMockBookedSlots(day);
    
    // Month navigation
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    // Initialize calendar
    generateCalendar(currentMonth, currentYear);
});
