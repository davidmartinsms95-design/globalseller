import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 1,
    });

    return NextResponse.json({
      ok: true,
      users,
    });
  } catch (error) {
  console.error("ERRO COMPLETO:");
  console.dir(error, { depth: null });

  return NextResponse.json(
    {
      ok: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      stack: error instanceof Error ? error.stack : null,
    },
    { status: 500 }
  );
}
}