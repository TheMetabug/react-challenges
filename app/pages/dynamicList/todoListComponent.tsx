import React, { useEffect, useState } from "react";

// Mockup data which simulates how Tasks are given to this component with database
// TODO: perhaps these could be given in props. Let's not use database (at least for now)
const TodoListData: Array<{ id: number; taskName: string }> = [
    { id: 0, taskName: "Wake up" },
    { id: 1, taskName: "Complete the work task" },
    { id: 2, taskName: "Make dinner" },
    { id: 3, taskName: "Go to gym" },
];

/**
 * React component that renders a list of tasks to be done.
 * The component remembers the state of the tasks even when the page is refreshed.
 * Each task is rendered as a label with a checkbox.
 * If the task is checked, the label is crossed out.
 */
const TodoList: React.FC = () => {
    const [checkedTasks, setCheckedTasks] = useState<
        Array<{ id: number; taskName: string }>
    >([]);

    // When page is refreshed and there is a checkbox checked,
    // checkedTasks needs to be initialized properly
    useEffect(() => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const currentCheckedTasks = [...checkedTasks];

        // Check trough all checkboxes and save it to the currentCheckedTasks list
        checkboxes.forEach((value: Element) => {
            const inputElement = value as HTMLInputElement;
            const taskId = value.id.split("-")[3];
            const task = TodoListData.find((task) => task.id === Number(taskId));

            // If the checkbox is checked, and task id exists,
            // add the task to the currentCheckedTasks list
            console.log(inputElement, inputElement.checked, taskId);
            if (inputElement.checked && task != undefined) {
                currentCheckedTasks.push(task);
            }
        });

        // Finally, update the checkedTasks list
        setCheckedTasks(currentCheckedTasks);
    }, [])

    /**
     * Function to update the checkedTasks state when a checkbox is checked or unchecked
     * @param taskObj - task object with id and taskName
     * @param isChecked - boolean indicating if the checkbox is checked or not
     */
    const onTaskCheck = (
        taskObj: { id: number; taskName: string },
        isChecked: boolean
    ) => {
        let currentCheckedTasks = [...checkedTasks];
        if (isChecked && !currentCheckedTasks.includes(taskObj)) {
            currentCheckedTasks.push(taskObj);
        }
        if (!isChecked && currentCheckedTasks.includes(taskObj)) {
            currentCheckedTasks = currentCheckedTasks.filter((obj) => obj.id !== taskObj.id);
        }
        setCheckedTasks(currentCheckedTasks);
        console.log(taskObj.taskName, isChecked, currentCheckedTasks);
    };

    /**
     * Returns an array of JSX elements, each element representing a task to be done.
     * The task name is rendered as a label and a checkbox is rendered for each task.
     * If the task is in the checkedTasks list, the label is crossed out.
     * @returns {JSX.Element[]}
     */
    const showTasks = (): JSX.Element[] => {
        return TodoListData.map((task) => (
            <div
                key={task.id}
                className="text-gray-700 select-none"
            >
                <label
                    htmlFor={`todo-item-checkbox-${task.id}`}
                    className={`flex bg-foreground rounded-lg p-3 gap-2 items-center w-[15rem]
                        ${checkedTasks.includes(task) ? "line-through" : ""}`}
                >             
                    <input
                        type="checkbox"
                        onChange={(e) => onTaskCheck(task, e.target.checked)}
                        id={`todo-item-checkbox-${task.id}`}
                        className="form-checkbox h-5 w-5"
                    />
                    {task.taskName}
                </label>
            </div>
        ));
    };

    return (
        <div className="flex flex-col gap-4" id="counter-module">
            {showTasks()}
        </div>
    );
};

export default TodoList;
