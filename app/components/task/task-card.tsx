"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui";
import { Glow } from "../global";
import { GripVertical, Trash2, Edit2, Clock } from "lucide-react";
import { useTask } from "@/app/lib/contexts/task-context";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask } = useTask();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-primary/20 h-[150px] rounded-xl border-2 border-primary border-dashed"
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div
        layoutId={task.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        className="group relative"
      >
        <Glow className="p-4 bg-[#1A1B1E] hover:bg-[#25262B] transition-colors">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <h3 className="font-medium text-white line-clamp-1">
                  {task.title}
                </h3>
              </div>
              {task.description && (
                <p className="text-sm text-[#FFFFFF80] line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-[#FFFFFF60] pt-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(task.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {task.tags && task.tags.length > 0 && (
                  <div className="flex gap-1">
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-[#FFFFFF10]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1.5 hover:bg-[#FFFFFF10] rounded text-[#FFFFFF80] hover:text-white transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="p-1.5 hover:bg-red-500/10 rounded text-[#FFFFFF80] hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Glow>
      </motion.div>
    </div>
  );
}
