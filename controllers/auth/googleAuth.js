import queryString from "query-string";

const { GOOGLE_CLIENT_ID, HOST_URL, BASE_URL } = process.env;

const googleAuth = (req, res) => {
  const serverHOST = req.get("host") === "localhost:3000" ? BASE_URL : HOST_URL;

  const stringifyParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${serverHOST}/api/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifyParams}`
  );
};

export default googleAuth;
