"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cards from "@/components/Cards";

// const getTasks = async () => {
//   const res = await fetch(`http://localhost:3000/api/tasks`);
//   const data = await res.json();
//   return data;
// };
// getTasks();

// const alltasks = await getTasks();
// console.log(`first`, alltasks);

const Home = () => {
  //!usando componente de cliente
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    // const fetchTasks = async () => {
    //   const res = await fetch(`/api/tasks`);
    //   const format = await res.json();
    //   setTasks(format);
    // };
    // if (!tasks.length) {
    //   fetchTasks();
    // }

    fetch(`/api/tasks`)
      .then((response) => response.json())
      .then((response) => setTasks(response))
      .catch((error) => console.log(error.message));
  }, []);
  // //!usando componente de servidor
  // const tasks = await getTasks();
  // console.log("todas", tasks);
  return (
    <div>
      <h1 className="underline font-bold text-center text-3xl pt-4">Tareas</h1>
      <Cards tasks={tasks} />
    </div>
  );
};

export default Home;
