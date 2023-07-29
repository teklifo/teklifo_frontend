import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import serverTranslator from "@/utils/serverTranslator";

export async function POST(request: Request) {
  const t = await serverTranslator(request);

  const body = await request.json();

  const { name, email, password } = body;

  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (user && user.isActive) {
    return NextResponse.json(
      {
        errors: [
          {
            param: "email",
            msg: t("emailIsTaken"),
          },
        ],
      },
      { status: 400 }
    );
  }

  return NextResponse.json(t("success"));
}
