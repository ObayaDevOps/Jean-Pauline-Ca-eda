import { handleLogout } from '@auth0/nextjs-auth0';

export default async function logout(
  req,
  res,
  options = {
    authorizationParams: { prompt: 'logout' },
    returnTo: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
  }
) {
  try {
    await handleLogout(req, res, options);
  } catch (err) {
    // res.redirect('https://asio.earth');
    res.status(err.status || 500).end(err.message);
  }
}
