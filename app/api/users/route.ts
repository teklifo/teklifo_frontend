import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import randomstring from "randomstring";
import prisma from "@/app/lib/prisma";
import { registrationSchema, RegistrationData } from "@/schemas/registration";
import serverTranslator from "@/utils/serverTranslator";
import sendEmail from "@/utils/nodemailer/sendEmail";

export async function POST(request: Request) {
  const t = await serverTranslator(request, "Registration");

  let data: RegistrationData;

  try {
    data = await registrationSchema(t).validate(await request.json(), {
      abortEarly: false,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  const { name, email, password } = data;

  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (user && user.isActive) {
    return NextResponse.json(
      {
        errors: [t("emailIsTaken")],
      },
      { status: 400 }
    );
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate unique activation token
  const activationToken = randomstring.generate();
  const minutes = 30;
  const activationTokenExpires = new Date(
    new Date().getTime() + minutes * 60000
  );

  // Create a new user or update existing one
  if (user) {
    user.name = name;
    user.password = hashedPassword;
    user.activationToken = activationToken;
    user.activationTokenExpires = activationTokenExpires;
  } else {
    user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        activationToken: activationToken,
        activationTokenExpires: activationTokenExpires,
      },
    });
  }

  // Send verification email
  const locale = request.headers.get("Accept-Language") ?? "az";
  await sendEmail({
    locale,
    emailType: "email_verification",
    subject: t("subjectEmailVerification"),
    receivers: email,
    context: {
      url: `${
        process.env.CLIENT_URL ?? ""
      }/verification?activationToken=${activationToken}`,
    },
  });

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
}
