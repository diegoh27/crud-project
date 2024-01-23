"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Card = ({ task }) => {
  const router = useRouter();
  const deleteCard = async (id) => {
    const fetchDelete = await fetch(`api/tasks/${id}`, {
      method: "delete",
    });

    location.reload();
  };

  const rediretDetail = (id) => {
    router.push(`/new/${id}`);
  };
  return (
    <div className=" m-5 p-10 bg-slate-700  rounded-md h-4/5 relative flex flex-col justify-end  ">
      <button
        className=" absolute  text-red-600 text-xl top-5 right-6"
        onClick={() => deleteCard(task.id)}
      >
        {/* <ion-icon name="close-circle-outline"></ion-icon> */}
        <FontAwesomeIcon icon={faTrash} />
      </button>

      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold text-2xl">Titulo</h1>
          <p className="text-xl">{task.title}</p>
        </div>
        <div className="pr-10 overflow-hidden hover:overflow-visible pt-3">
          <h1 className="font-semibold text-2xl">Descripcion</h1>
          <p className=" text-xl">{task.description}</p>
        </div>
        <div className=" pt-3">
          <h1 className="font-semibold text-2xl">Fecha de creacion</h1>
          <p className="text-xl">{task.createAt}</p>
        </div>
      </div>
      <button
        className="absolute text-sky-400 text-xl bottom-5 right-6"
        onClick={() => rediretDetail(task.id)}
      >
        {/* <ion-icon name="close-circle-outline"></ion-icon> */}
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
};

export default Card;
