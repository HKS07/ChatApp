import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN;
const REFRESH_SECRET = process.env.REFRESH_TOKEN;

export const generateTokens = (user) => {
  const payload = { id: user.id };
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    console.error("Access token verification failed:", error.message);
    return null;
  }
};

export const refreshAccessToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const payload = { id: decoded.id };
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
  } catch (error) {
    console.error("Refresh token verification failed:", error.message);
    return null;
  }
};
