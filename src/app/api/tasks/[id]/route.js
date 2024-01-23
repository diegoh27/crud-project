import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async (request, { params }) => {
  const tasksId = params.id;
  const tasks = await prisma.task.findUnique({
    where: {
      id: Number(tasksId),
    },
  });

  return NextResponse.json(tasks);
};

export const PUT = async (request, { params }) => {
  const data = await request.json();
  const { title, description } = data;

  try {
    const tasksId = Number(params.id);
    const findTask = await prisma.task.findUnique({
      where: {
        id: tasksId,
      },
    });
    if (findTask) {
      //! primera manera
      //   const updateTask = await prisma.task.update({
      //     where: {
      //       id: tasksId,
      //     },
      //     data: {
      //       title,
      //       description,
      //     },
      //   });
      //! segunda manera
      const updateTask = await prisma.task.update({
        where: {
          id: tasksId,
        },
        data: data,
      });

      return NextResponse.json(`la tarea se modifico a ${updateTask.title}`);
    } else {
      return NextResponse.json("No hay tareas con ese id");
    }
  } catch (error) {
    return NextResponse.json(error.message);
  }
};

export const DELETE = async (request, { params }) => {
  const tasksId = params.id;
  try {
    const findTasks = await prisma.task.findUnique({
      where: {
        id: Number(tasksId),
      },
    });

    if (findTasks) {
      const deleteTasks = await prisma.task.delete({
        where: {
          id: Number(tasksId),
        },
      });
      return NextResponse.json(deleteTasks);
    }

    return NextResponse.json({
      message: "No se encontro una tarea con ese id",
    });
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
