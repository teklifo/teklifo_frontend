import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import serverTranslator from "@/utils/serverTranslator";

interface Data {
  activationToken: string;
}

export async function POST(request: Request) {
  const t = await serverTranslator(request, "UserVerification");

  const { activationToken }: Data = await request.json();

  try {
    // Find user by activation token and update
    const user = await prisma.user.update({
      where: {
        isActive: false,
        activationToken: activationToken,
        activationTokenExpires: {
          gte: new Date(),
        },
      },
      data: {
        isActive: true,
        activationToken: null,
        activationTokenExpires: new Date("0001-01-01"),
      },
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        { errors: [t("invalidActivationToken")] },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json([{ errors: error }], { status: 500 });
  }
}
