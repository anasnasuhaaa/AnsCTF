import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "super-secret-key";

export type AuthUser = {
  id: string;
  username: string;
  role: "ADMIN" | "PLAYER";
};

export function signToken(
  payload: AuthUser
) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
): AuthUser | null {

  try {

    return jwt.verify(
      token,
      JWT_SECRET
    ) as AuthUser;

  } catch {

    return null;

  }
}