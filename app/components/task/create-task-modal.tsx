"use client";

import { useState, useEffect } from "react";
import { Modal, Input, Button, Select, TextArea } from "../ui";
import { useTask } from "@/app/lib/contexts/task-context";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: TaskStatus;
  taskToEdit?: Task | null;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  initialStatus = "todo",
  taskToEdit,
}: CreateTaskModalProps) {
  const { addTask, updateTask } = useTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>(initialStatus);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus(initialStatus);
    }
  }, [taskToEdit, initialStatus, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title,
        description,
        priority,
        status,
      });
    } else {
      addTask({
        title,
        description,
        priority,
        status,
        tags: [], // Add tags support later if needed
      });
    }
    onClose();
  };

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const statusOptions = [
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in-progress" },
    { label: "Done", value: "done" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={taskToEdit ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-[#FFFFFF80] mb-1">Title</label>
          <Input
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm text-[#FFFFFF80] mb-1">
            Description
          </label>
          <TextArea
            name="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            placeholder="Add some details..."
            className="w-full min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#FFFFFF80] mb-1">
              Priority
            </label>
            <Select
              options={priorityOptions}
              defaultValue={priority}
              onChange={(value) => setPriority(value as TaskPriority)}
            />
          </div>
          <div>
            <label className="block text-sm text-[#FFFFFF80] mb-1">
              Status
            </label>
            <Select
              options={statusOptions}
              defaultValue={status}
              onChange={(value) => setStatus(value as TaskStatus)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="w-auto"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="w-auto">
            {taskToEdit ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
