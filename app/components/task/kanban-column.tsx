"use client";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import TaskCard from "./task-card";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
}

export default function KanbanColumn({
  id,
  title,
  tasks,
  onEditTask,
  onAddTask,
}: KanbanColumnProps) {
  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef } = useSortable({
    id,
    data: {
      type: "Column",
      column: { id, title },
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-[#0f0f0f] rounded-xl min-w-[300px] w-full md:w-[350px]"
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <span className="px-2 py-0.5 rounded-full bg-[#FFFFFF10] text-xs text-[#FFFFFF80]">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(id)}
          className="p-1.5 hover:bg-[#FFFFFF10] rounded-lg text-[#FFFFFF80] hover:text-white transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-[500px] p-2 rounded-xl bg-[#141517]/50 border border-[#FFFFFF05]">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-[#FFFFFF20] text-sm border-2 border-dashed border-[#FFFFFF05] rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
