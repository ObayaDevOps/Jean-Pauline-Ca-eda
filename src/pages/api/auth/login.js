import { handleLogin } from '@auth0/nextjs-auth0';

export default async function login(
  req,
  res,
  options = {
    authorizationParams: { prompt: 'login' },
    returnTo: process.env.NEXT_AUTH0_LOGIN_REDIRECT_URI,
  }
) {
  try {
    await handleLogin(req, res, options);
  } catch (err) {
    // console.log(err);
    res.status(err.status || 500).end(err.message);
  }
}
