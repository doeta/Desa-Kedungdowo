"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createKnowledge(data: { judul: string; isi: string }) {
  await prisma.chatbotKnowledge.create({
    data: {
      judul: data.judul,
      isi: data.isi,
    },
  });
  revalidatePath("/admin/chatbot-knowledge");
}

export async function updateKnowledge(id: number, data: { judul: string; isi: string }) {
  await prisma.chatbotKnowledge.update({
    where: { id },
    data: {
      judul: data.judul,
      isi: data.isi,
    },
  });
  revalidatePath("/admin/chatbot-knowledge");
}

export async function deleteKnowledge(id: number) {
  await prisma.chatbotKnowledge.delete({
    where: { id },
  });
  revalidatePath("/admin/chatbot-knowledge");
}
