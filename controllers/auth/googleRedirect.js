import axios from "axios";
import queryString from "query-string";
import User from "../../models/user.js";

const {
  BASE_URL,
  HOST_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  HOST_FRONTEND_LOGIN_PAGE,
  LOCAL_FRONTEND_LOGIN_PAGE,
} = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const serverHOST = req.get("host") === "localhost:3000" ? BASE_URL : HOST_URL;
  const frontendHOST =
    req.get("host") === "localhost:3000"
      ? LOCAL_FRONTEND_LOGIN_PAGE
      : HOST_FRONTEND_LOGIN_PAGE;

  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${serverHOST}/api/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const {
    data: { id, email, name },
  } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: { Authorization: `Bearer ${tokenData.data.access_token}` },
  });

  const user = await User.findOne({ email });
  if (!user) {
    const result = await User.create({ name, email, password: id });

    const accessToken = result.signToken();
    await User.findOneAndUpdate({ email }, { accessToken });

    return res.redirect(
      `${frontendHOST}/${accessToken}?name=${result.name}&email=${result.email}&theme=${result.theme}&avatarURL=${result.avatarURL}`
    );
  }

  if (user) {
    const accessToken = user.signToken();
    await User.findOneAndUpdate({ email }, { accessToken });
    return res.redirect(
      `${frontendHOST}/${accessToken}?name=${user.name}&email=${user.email}&theme=${user.theme}&avatarURL=${user.avatarURL}`
    );
  }
};

export default googleRedirect;
