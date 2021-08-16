import axios from "axios";
import {BACKEND_ADDRESS} from "../constants/ADDRESS";

const deleteCommentApi = ({ commentId, accessToken }) => {
  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다.")
    history.push('/login');
    return Promise.reject("토큰이 없음");
  }
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  };
  axios.delete(BACKEND_ADDRESS + "/comments/" + commentId, config)
  .then(response => {
    if (response.status === 204) {
      alert("댓글이 삭제되었습니다 :)");
      history.push("/");
    }
  })
  .catch(error => {
    if (error.response.status === 401 || error.response.status === 403) {
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      history.push("/login");
    } else {
      alert("댓글 삭제 실패");
    }
    return Promise.reject();
  });
};
export default deleteCommentApi;
