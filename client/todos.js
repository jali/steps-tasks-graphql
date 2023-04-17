/* TODOS
- Create a custom hook in the React Redux store 
    to determine the completion status of a step 
    by mapping through the tasks and reducing to 
    a single digit value (1 or 0).
- Implement checks in the component to disable the checkbox 
    for steps with their tasks if the previous step not done.
*/

// example
const stepDone = (arrTasks) => {
    return arrTasks.reduce((acc, arrVal) => acc * arrVal, 1);
}
// tests
console.log(stepDone([true,true,true,true,false,true,true,true,true]))
console.log('empty',redBool([]))

