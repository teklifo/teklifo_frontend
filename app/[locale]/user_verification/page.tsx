import request from "@/utils/request";
import { getCookie } from "cookies-next";

async function checkActivationToken(activationToken: string) {
  const locale = (getCookie("NEXT_LOCALE") as string) ?? "az";

  try {
    await request(`${process.env.CLIENT_URL}/api/users/verification`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({ activationToken }),
    });
    return true;
  } catch (error) {
    return false;
  }
}

export default async function UserVerification({
  searchParams: { activationToken },
}: {
  searchParams: { activationToken: string };
}) {
  const result = await checkActivationToken(activationToken);

  if (result) {
    return <div>UserVerification</div>;
  } else {
    return <div>Error</div>;
  }
}
