"use client";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import KanbanColumn from "./kanban-column";
import TaskCard from "./task-card";
import CreateTaskModal from "./create-task-modal";
import { useTask } from "@/app/lib/contexts/task-context";
import { createPortal } from "react-dom";

export default function KanbanBoard() {
  const { tasks, moveTask } = useTask();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<TaskStatus>("todo");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance to trigger drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns: { id: TaskStatus; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task and the container it was dropped into
    const activeTask = tasks.find((t) => t.id === activeId);
    
    // If dropped over a column
    if (columns.some((col) => col.id === overId)) {
      if (activeTask && activeTask.status !== overId) {
        moveTask(activeId, overId as TaskStatus);
      }
    }
    // If dropped over another task
    else {
      const overTask = tasks.find((t) => t.id === overId);
      if (activeTask && overTask && activeTask.status !== overTask.status) {
        moveTask(activeId, overTask.status);
      }
    }

    setActiveTask(null);
  };

  const handleAddTask = (status: TaskStatus) => {
    setInitialStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={tasks.filter((task) => task.status === col.id)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
            />
          ))}
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay>
              {activeTask ? (
                <TaskCard task={activeTask} onEdit={() => {}} />
              ) : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStatus={initialStatus}
        taskToEdit={editingTask}
      />
    </div>
  );
}
