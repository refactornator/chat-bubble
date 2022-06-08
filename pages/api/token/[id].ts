import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

const { MUX_SIGNING_KEY, MUX_PRIVATE_KEY } = process.env;

type ResponseData = {
  spaceJWT: string;
};

function signJWT(spaceId: string): ResponseData {
  const JWT = jwt.sign(
    {
      kid: MUX_SIGNING_KEY ?? "",
      aud: "rt",
      sub: spaceId,
    },
    Buffer.from(MUX_PRIVATE_KEY ?? "", "base64"),
    { algorithm: "RS256", expiresIn: "1h" }
  );
  return { spaceJWT: JWT };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    query: { id },
    method,
  } = req;
  if (method === "GET") {
    res.status(StatusCodes.OK).json(signJWT(id as string));
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED);
  }
}
