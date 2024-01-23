import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const GET = async () => {
  const allTasks = await prisma.task.findMany();

  return NextResponse.json(allTasks);
};

export const POST = async (request, { params }) => {
  const data = await request.json();
  const { title, description } = data;

  const tasks = {
    title,
    description,
  };
  const resTasks = await prisma.task.create({
    data: {
      title: tasks.title,
      description: tasks.description,
    },
  });
  console.log(resTasks);

  return NextResponse.json(resTasks);
};
