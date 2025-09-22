// import { workoutProgram } from "../utils"

// import {workoutProgram as training_plan} from '../utils/index.js'
// import WorkoutCard from "./WorkoutCard.jsx"
// export default function Grid() {
//     const isLocked = false
//     const selectedWorkout = 4
//     return (
//         <div className="training-plan-grid">
//             { Object.keys(training_plan).map((workout, workoutIndex) => {
//                 const type = workoutIndex % 3 === 0 ? "Push" : workoutIndex % 3 ===1 ? "Pull" : "Legs"
//                 const trainingPlan = training_plan[workoutIndex]
//                 // const dayNum = {workoutIndex}
//                 // const icon = (
//                 //             workoutIndex % 3 === 0 ? (
//                 //                 <i className="fa-solid fa-dumbbell"></i>
//                 //             ) : (
//                 //                workoutIndex % 3 === 1 ? (
//                 //                 <i className="fa-solid fa-weight-hanging"></i> 
//                 //             ) : (<i className="fa-solid fa-bolt"></i>)
//                 //         )
//                 //         )



//                 if (workoutIndex === selectedWorkout) {
//                     return (
//                         <WorkoutCard key={workoutIndex} trainingPlan={trainingPlan} type={type} workoutIndex={workoutIndex}/>
//                     )
//                 }
                
//                 return (
//                     <button className={"card plan-card" + (isLocked ? "inactive" : '')} key={workoutIndex}>
//                         <div className="plan-card-header">
//                             <p>Day {workoutIndex} </p>
//                         </div>
//                         {isLocked ? (
//                             <i className="fa-solid fa-lock"></i>
//                         ) : (
//                             workoutIndex % 3 === 0 ? (
//                                 <i className="fa-solid fa-dumbbell"></i>
//                             ) : (
//                                workoutIndex % 3 === 1 ? (
//                                 <i className="fa-solid fa-weight-hanging"></i> 
//                             ) : (<i className="fa-solid fa-bolt"></i>)
//                         )
//                         )}
//                         <div className="plan-card-header">
//                             <h4><b>{type}</b></h4>
//                         </div>
//                     </button>
//                 )
//             })}
            
            
            
            

//         </div>
//     )
// }


// import { useState, useEffect, useMemo, useCallback } from "react";
// import { workoutProgram as training_plan } from "../utils/index.js";
// import WorkoutCard from "./WorkoutCard.jsx";

// export default function Grid() {
//   const [savedWorkouts, setSavedWorkouts] = useState(null);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);

//   // Derive completed workouts from saved state
//   const completedWorkouts = useMemo(() => {
//     const sw = savedWorkouts || {};
//     return Object.keys(sw).filter((k) => !!sw[k]?.isComplete);
//   }, [savedWorkouts]);

//   const handleSave = useCallback((index, data) => {
//     // save to local storage and modify the saved workouts state
//     setSavedWorkouts((prev) => {
//       const next = {
//         ...(prev || {}),
//         [index]: {
//           ...data,
//           isComplete: !!data.isComplete || !!prev?.[index]?.isComplete,
//         },
//       };
//       if (typeof window !== "undefined" && window.localStorage) {
//         window.localStorage.setItem("brogram", JSON.stringify(next));
//       }
//       return next;
//     });
//     setSelectedWorkout(null);
//   }, []);

//   const handleComplete = useCallback(
//     (index, data) => {
//       // complete a workout (modify completed status)
//       const next = { ...data, isComplete: true };
//       handleSave(index, next);
//     },
//     [handleSave]
//   );

//   useEffect(() => {
//     // load from localStorage on mount
//     if (typeof window === "undefined" || !window.localStorage) return;
//     try {
//       const raw = window.localStorage.getItem("brogram");
//       const parsed = raw ? JSON.parse(raw) : {};
//       setSavedWorkouts(parsed);
//     } catch {
//       setSavedWorkouts({});
//     }
//   }, []);

//   // Helpers
//   const getType = (idx) => (idx % 3 === 0 ? "Push" : idx % 3 === 1 ? "Pull" : "Legs");
//   const getIcon = (idx) =>
//     idx % 3 === 0 ? (
//       <i className="fa-solid fa-dumbbell" />
//     ) : idx % 3 === 1 ? (
//       <i className="fa-solid fa-weight-hanging" />
//     ) : (
//       <i className="fa-solid fa-bolt" />
//     );

//   const formatDayNum = (idx) => {
//     const day = idx + 1;
//     return day <= 9 ? `0${day}` : `${day}`; // matches original behavior
//   };

//   return (
//     <div className="training-plan-grid">
//       {Object.keys(training_plan).map((_, workoutIndex) => {
//         const isLocked =
//           workoutIndex === 0
//             ? false
//             : !completedWorkouts.includes(`${workoutIndex - 1}`);

//         const type = getType(workoutIndex);
//         const trainingPlan = training_plan[workoutIndex];
//         const dayNum = formatDayNum(workoutIndex);
//         const icon = getIcon(workoutIndex);

//         if (workoutIndex === selectedWorkout) {
//           return (
//             <WorkoutCard
//               key={workoutIndex}
//               savedWeights={savedWorkouts?.[workoutIndex]?.weights}
//               handleSave={handleSave}
//               handleComplete={handleComplete}
//               trainingPlan={trainingPlan}
//               type={type}
//               workoutIndex={workoutIndex}
//               icon={icon}
//               dayNum={dayNum}
//             />
//           );
//         }

//         return (
//           <button
//             key={workoutIndex}
//             type="button"
//             onClick={() => {
//               if (!isLocked) setSelectedWorkout(workoutIndex);
//             }}
//             className={`card plan-card ${isLocked ? "inactive" : ""}`}
//             aria-disabled={isLocked}
//             title={isLocked ? "Complete the previous day to unlock" : `${type} – Day ${dayNum}`}
//           >
//             <div className="plan-card-header">
//               <p>Day {dayNum}</p>
//               {isLocked ? <i className="fa-solid fa-lock" /> : icon}
//             </div>

//             <div className="plan-card-header">
//               <h4>
//                 <b>{type}</b>
//               </h4>
//             </div>
//           </button>
//         );
//       })}
//     </div>
//   );
// }


import { useState, useEffect } from 'react'
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx'

export default function Grid() {
    const [savedWorkouts, setSavedWorkouts] = useState(null)
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val]
        return entry.isComplete
    })

    function handleSave(index, data) {
        // save to local storage and modify the saved workouts state
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }
        setSavedWorkouts(newObj)
        localStorage.setItem('brogram', JSON.stringify(newObj))
        setSelectedWorkout(null)
    }

    function handleComplete(index, data) {
        // complete a workout (so basically we modify the completed status)
        const newObj = { ...data }
        newObj.isComplete = true
        handleSave(index, newObj)
    }

    useEffect(() => {
        if (!localStorage) { return }
        let savedData = {}
        if (localStorage.getItem('brogram')) {
            savedData = JSON.parse(localStorage.getItem('brogram'))
        }
        setSavedWorkouts(savedData)
    }, [])

    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = workoutIndex === 0 ?
                    false :
                    !completedWorkouts.includes(`${workoutIndex - 1}`)
                console.log(workoutIndex, isLocked)

                const type = workoutIndex % 3 === 0 ?
                    'Push' :
                    workoutIndex % 3 === 1 ?
                        'Pull' :
                        'Legs'

                const trainingPlan = training_plan[workoutIndex]
                const dayNum = ((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1
                const icon = workoutIndex % 3 === 0 ? (
                    <i className='fa-solid fa-dumbbell'></i>
                ) : (
                    workoutIndex % 3 === 1 ? (
                        <i className='fa-solid fa-weight-hanging'></i>
                    ) : (
                        <i className='fa-solid fa-bolt'></i>
                    )
                )

                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard savedWeights={savedWorkouts?.[workoutIndex]?.weights} handleSave={handleSave} handleComplete={handleComplete} key={workoutIndex} trainingPlan={trainingPlan} type={type} workoutIndex={workoutIndex} icon={icon} dayNum={dayNum} />
                    )
                }

                return (
                    <button onClick={() => {
                        if (isLocked) { return }
                        setSelectedWorkout(workoutIndex)
                    }} className={'card plan-card  ' + (isLocked ? 'inactive' : '')} key={workoutIndex}>
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                            {isLocked ? (
                                <i className='fa-solid fa-lock'></i>
                            ) : (icon)}
                        </div>

                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}