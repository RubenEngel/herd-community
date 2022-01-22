// import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

// export default withApiAuthRequired(async function access(req, res) {
//   try {
//     const { accessToken } = await getAccessToken(req, res);
//     // const { user } = await getSession(req, res);

//     res.status(200).json(accessToken);
//   } catch (error) {
//     res.status(error.status || 500).json({ error: error.message });
//   }
// });
