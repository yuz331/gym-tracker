// import React, { useState, useCallback } from "react";
// import Modal from "./Modal";
// import { exerciseDescriptions } from "../utils";

// export default function WorkoutCard(props) {
//   const {
//     trainingPlan,
//     workoutIndex,
//     type,
//     dayNum,
//     icon,
//     savedWeights,
//     handleSave,
//     handleComplete,
//   } = props;

//   const { warmup = [], workout = [] } = trainingPlan || {};
//   const [showExerciseDescription, setShowExerciseDescription] = useState(null);
//   const [weights, setWeights] = useState(() => savedWeights || {});

//   const handleAddWeight = useCallback((title, weight) => {
//     setWeights((prev) => ({
//       ...prev,
//       [title]: weight,
//     }));
//   }, []);

//   const openDescription = useCallback((name) => {
//     setShowExerciseDescription({
//       name,
//       description: exerciseDescriptions?.[name],
//     });
//   }, []);

//   const closeModal = useCallback(() => {
//     setShowExerciseDescription(null);
//   }, []);

//   const onSave = useCallback(() => {
//     handleSave(workoutIndex, { weights });
//   }, [handleSave, workoutIndex, weights]);

//   const onComplete = useCallback(() => {
//     handleComplete(workoutIndex, { weights });
//   }, [handleComplete, workoutIndex, weights]);

//   const isCompleteDisabled = Object.keys(weights).length !== workout.length;

//   return (
//     <div className="workout-container">
//       {showExerciseDescription && (
//         <Modal
//           showExerciseDescription={showExerciseDescription}
//           handleCloseModal={closeModal}
//         />
//       )}

//       <div className="workout-card card">
//         <div className="plan-card-header">
//           <p>Day {dayNum}</p>
//           {icon}
//         </div>
//         <div className="plan-card-header">
//           <h2>
//             <b>{type} Workout</b>
//           </h2>
//         </div>
//       </div>

//       {/* Warmup */}
//       <div className="workout-grid">
//         <div className="exercise-name">
//           <h4>Warmup</h4>
//         </div>
//         <h6>Sets</h6>
//         <h6>Reps</h6>
//         <h6 className="weight-input">Max Weight</h6>

//         {warmup.map((warmupExercise, warmupIndex) => {
//           const key = warmupExercise?.name || warmupIndex;
//           return (
//             <React.Fragment key={key}>
//               <div className="exercise-name">
//                 <p>
//                   {warmupIndex + 1}. {warmupExercise.name}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => openDescription(warmupExercise.name)}
//                   className="help-icon"
//                   aria-label={`Show description for ${warmupExercise.name}`}
//                   title={`Show description for ${warmupExercise.name}`}
//                 >
//                   <i className="fa-regular fa-circle-question" />
//                 </button>
//               </div>
//               <p className="exercise-info">{warmupExercise.sets}</p>
//               <p className="exercise-info">{warmupExercise.reps}</p>
//               <input className="weight-input" placeholder="N/A" disabled />
//             </React.Fragment>
//           );
//         })}
//       </div>

//       {/* Workout */}
//       <div className="workout-grid">
//         <div className="exercise-name">
//           <h4>Workout</h4>
//         </div>
//         <h6>Sets</h6>
//         <h6>Reps</h6>
//         <h6 className="weight-input">Max Weight</h6>

//         {workout.map((workoutExercise, wIndex) => {
//           const name = workoutExercise?.name;
//           const key = name || wIndex;
//           return (
//             <React.Fragment key={key}>
//               <div className="exercise-name">
//                 <p>
//                   {wIndex + 1}. {name}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => openDescription(name)}
//                   className="help-icon"
//                   aria-label={`Show description for ${name}`}
//                   title={`Show description for ${name}`}
//                 >
//                   <i className="fa-regular fa-circle-question" />
//                 </button>
//               </div>
//               <p className="exercise-info">{workoutExercise.sets}</p>
//               <p className="exercise-info">{workoutExercise.reps}</p>
//               <input
//                 className="weight-input"
//                 placeholder="14"
//                 value={weights[name] || ""}
//                 onChange={(e) => handleAddWeight(name, e.target.value)}
//               />
//             </React.Fragment>
//           );
//         })}
//       </div>

//       <div className="workout-buttons">
//         <button type="button" onClick={onSave}>
//           Save & Exit
//         </button>
//         <button
//           type="button"
//           onClick={onComplete}
//           disabled={isCompleteDisabled}
//         >
//           Complete
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react"
import Modal from "./Modal"
import { exerciseDescriptions } from "../utils"

export default function WorkoutCard(props) {
    const { trainingPlan, workoutIndex, type, dayNum, icon, savedWeights, handleSave, handleComplete } = props

    const { warmup, workout } = trainingPlan || {}
    const [showExerciseDescription, setShowExerciseDescription] = useState(null)
    const [weights, setWeights] = useState(savedWeights || {})

    function handleAddWeight(title, weight) {
        const newObj = {
            ...weights,
            [title]: weight
        }
        setWeights(newObj)
    }

    return (
        <div className="workout-container">
            {showExerciseDescription && (
                <Modal showExerciseDescription={showExerciseDescription} handleCloseModal={() => {
                    setShowExerciseDescription(null)
                }} />
            )}
            <div className="workout-card card">
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} Workout</b></h2>
                </div>
            </div>


            <div className="workout-grid">
                <div className="exercise-name">
                    <h4>Warmup</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
                {warmup.map((warmupExercise, warmupIndex) => {
                    return (
                        <React.Fragment key={warmupIndex}>
                            <div className="exercise-name">
                                <p>{warmupIndex + 1}. {warmupExercise.name}</p>
                                <button onClick={() => {
                                    setShowExerciseDescription({
                                        name: warmupExercise.name,
                                        description: exerciseDescriptions[warmupExercise.name]
                                    })
                                }} className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="exercise-info">{warmupExercise.sets}</p>
                            <p className="exercise-info">{warmupExercise.reps}</p>
                            <input className="weight-input" placeholder="N/A" disabled />
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="workout-grid">
                <div className="exercise-name">
                    <h4>Workout</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
                {workout.map((workoutExercise, wIndex) => {
                    return (
                        <React.Fragment key={wIndex}>
                            <div className="exercise-name">
                                <p>{wIndex + 1}. {workoutExercise.name}</p>
                                <button onClick={() => {
                                    setShowExerciseDescription({
                                        name: workoutExercise.name,
                                        description: exerciseDescriptions[workoutExercise.name]
                                    })
                                }} className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="exercise-info">{workoutExercise.sets}</p>
                            <p className="exercise-info">{workoutExercise.reps}</p>
                            <input value={weights[workoutExercise.name] || ''} onChange={(e) => {
                                handleAddWeight(workoutExercise.name, e.target.value)
                            }} className="weight-input" placeholder="14" />
                        </React.Fragment>
                    )
                })}
            </div>


            <div className="workout-buttons">
                <button onClick={() => {
                    handleSave(workoutIndex, { weights })
                }}>Save & Exit</button>
                <button onClick={() => {
                    handleComplete(workoutIndex, { weights })
                }} disabled={Object.keys(weights).length !== workout.length}>Complete</button>
            </div>
        </div>
    )
}