"use client";

import { useState } from "react";
import { errors } from "@/utils/errors";
import { useRouter } from "next/navigation";

const New = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [error, setErrors] = useState({});

  const router = useRouter();

  const handleTask = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });

    setErrors(
      errors({
        ...task,
        [event.target.name]: event.target.value,
      })
    );
  };

  const onSubmitTask = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const data = {
      title,
      description,
    };

    const response = await fetch(`/api/tasks`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    setTask({
      title: "",
      description: "",
    });
    router.push("/");
    return response;
  };
  return (
    <div className="flex justify-center items-center overflow-hidden m-11">
      <form className="bg-slate-700 p-10 rounded-sm" onSubmit={onSubmitTask}>
        <h1 className="pb-10 font-bold text-3xl">Escribir Tarea</h1>

        <label htmlFor="title" className="font-semibold text-xl">
          Titulo de la Tarea
          {error.title ? (
            <p className="text-red-700 font-light m-0 pt-0">{error.title}</p>
          ) : null}
        </label>

        <input
          type="text"
          className="border-gray-400 p-2 w-full mb-4 rounded-sm text-black mt-3"
          onChange={handleTask}
          value={task.title}
          name="title"
        />

        <label htmlFor="description" className="font-semibold text-xl">
          Descripcion de la Tarea
        </label>
        <textarea
          rows="3"
          className="border-gray-400 p-2 w-full mb-4 rounded-sm text-black mt-3"
          onChange={handleTask}
          value={task.description}
          name="description"
        ></textarea>
        <button className="bg-sky-400 p-1 w-16 rounded-md font-semibold">
          Crear
        </button>
      </form>
    </div>
  );
};

export default New;
