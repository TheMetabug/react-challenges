import React, { useEffect, useState } from "react";

// Mockup data which simulates how Tasks are given to this component with database
// TODO: perhaps these could be given in props. Let's not use database (at least for now)
const TodoListData: Array<{ id: number; taskName: string; taskDone: boolean }> =
    [
        { id: 0, taskName: "Wake up", taskDone: false },
        { id: 1, taskName: "Complete the work task", taskDone: false },
        { id: 2, taskName: "Make dinner", taskDone: false },
        { id: 3, taskName: "Go to gym", taskDone: false },
    ];

/**
 * React component that renders a list of tasks to be done.
 * Each task is rendered as a label with a checkbox.
 * If the task is checked, the label is crossed out.
 */
const TodoList: React.FC = () => {
    const [checkedTasks, setCheckedTasks] = useState<
        Array<{ id: number; taskName: string; taskDone: boolean }>
    >([]);

    /*
     * Initializes checkedTasks state with the mockup data
     */
    useEffect(() => {
        setCheckedTasks(TodoListData);
    }, []);

    /**
     * Function to update the checkedTasks state with given id
     * @param taskId - task id
     */
    const onTaskCheck = (taskId: number) => {
        setCheckedTasks(
            checkedTasks.map((item) => {
                return item.id === taskId
                    ? { ...item, taskDone: !item.taskDone }
                    : item;
            })
        );
    };

    /**
     * Returns an array of JSX elements, each element representing a task to be done.
     * The task name is rendered as a label and a checkbox is rendered for each task.
     * If the task is in the checkedTasks list, the label is crossed out.
     * @returns {JSX.Element[]}
     */
    const showTasks = (): JSX.Element[] => {
        return checkedTasks.map((task) => (
            <div
                key={task.id}
                className="text-gray-700 select-none"
                onClick={() => onTaskCheck(task.id)}
            >
                <label
                    htmlFor={`todo-item-checkbox-${task.id}`}
                    className={`flex bg-foreground rounded-lg p-3 gap-2 items-center w-[15rem]
                        ${task.taskDone ? "line-through" : ""}`}
                >
                    <input
                        type="checkbox"
                        checked={task.taskDone}
                        onChange={() => onTaskCheck(task.id)}
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
