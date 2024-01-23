"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { errors } from "@/utils/errors";

const DetailTask = ({ params }) => {
  const id = Number(params.id);
  const [task, setTask] = useState({});
  const [itsActive, setItsActive] = useState({
    title: false,
    description: false,
  });
  const [updateTask, setUpdateTask] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    const findTask = async () => {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();
      setTask(data);
      return data;
    };
    findTask();

    return setTask({});
  }, [id]);

  const handleInput = (string) => {
    //! para el title
    if (string === "title") {
      if (!itsActive.title) {
        setItsActive({
          ...itsActive,
          title: true,
        });
      } else {
        setItsActive({
          ...itsActive,
          title: false,
        });
      }
    }
    //! para description
    if (string === "description") {
      if (!itsActive.description) {
        setItsActive({
          ...itsActive,
          description: true,
        });
      } else {
        setItsActive({
          ...itsActive,
          description: false,
        });
      }
    }
  };

  const handleChange = (event) => {
    setUpdateTask({
      ...updateTask,
      [event.target.name]: event.target.value,
    });
    console.log("nueva tarea", updateTask);

    setError(
      errors({
        ...updateTask,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (string) => {
    const title = updateTask.title;
    const description = updateTask.description;

    if (title.length !== 0 && description.length !== 0) {
      console.log("entro al error");
      window.alert(
        "Si quiere actulizar los datos debe al menos proporcionar uno"
      );
    } else {
      if (string === "title") {
        const data = {
          title: updateTask.title,
          description: task.description,
        };
        const response = await fetch(`/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();

        setUpdateTask({
          title: "",
          description: "",
        });
        return res;
      } else {
        if (description.length !== 0) {
          const dataDes = {
            title: task.title,
            description: updateTask.description,
          };
          const responseDes = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataDes),
          });
          const resDes = await responseDes.json();
          console.log("first", resDes);
          setUpdateTask({
            title: "",
            description: "",
          });
          return resDes;
        }
      }
    }
  };

  return (
    <div className="w-2/3 bg-slate-700 h-5/6 m-auto mt-10 p-10 rounded-lg">
      <div className="flex w-full h-full justify-between">
        <div className="">
          <div className="p-10 flex flex-row-reverse justify-end relative">
            <button
              className="text-2xl text-sky-500 absolute  left-2/3 top-26"
              onClick={() => handleInput("title")}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">Titulo</h1>
              <p className="text-2xl font-medium pt-3">{task.title}</p>
              {itsActive.title ? (
                <textarea
                  className="text-black rounded-sm mt-2 pl-1"
                  type="text"
                  name="title"
                  placeholder="Escriba aqui..."
                  value={updateTask.title}
                  onChange={handleChange}
                />
              ) : null}
              {itsActive.title && error.title ? (
                <p className="text-red-600 ">{error.title}</p>
              ) : null}
              <button
                className="bg-sky-400 p-1.5 w-20 rounded-md font-semibold mt-3 "
                onClick={() => handleSubmit("title")}
              >
                Modificar
              </button>
            </div>
          </div>
          <div className="p-10 flex flex-row-reverse relative justify-end">
            <button
              className="text-2xl text-sky-500 absolute right-28 top-15"
              onClick={() => handleInput("description")}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <div className="mr-40  flex flex-col">
              <h1 className="text-3xl font-semibold ">Descripcion</h1>
              <p className="text-2xl font-medium pt-3">{task.description}</p>
              {itsActive.description ? (
                <textarea
                  className="text-black rounded-sm mt-2 pl-1"
                  type="text"
                  name="description"
                  placeholder="Escriba aqui..."
                  value={updateTask.description}
                  onChange={handleChange}
                />
              ) : null}
              <button
                className="bg-sky-400 p-1.5 w-20 rounded-md font-semibold mt-3 "
                onClick={() => handleSubmit("description")}
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20 ml-10">
          <h1 className="text-3xl font-bold">Fecha de creacion</h1>
          <p className="text-2xl font-medium">{task.createAt}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailTask;
