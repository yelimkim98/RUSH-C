import React from 'react';
import axios from "axios";
import {ADDRESS} from "../../constants/BackendAddress";
import {withRouter} from "react-router-dom";
import {ACCESS_TOKEN} from "../../constants/LocalStorage";

const createWritingApi = (props) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    return Promise.reject("토큰이 이상함");
  }
  const body = {
    title: props.title,
    content: props.content,
    latitude: props.center.lat(),
    longitude: props.center.lng()
  };
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }
  axios.post(ADDRESS + "/articles", body, config)
    .then(response => {
      if (response.status === 201) {
         const uri = response.headers.location;
         props.history.push(uri);
      }
    })
    .catch(error => {
      if (error.response.status === 401 || error.response.status === 403) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        props.history.push("/login");
        return;
      }
      alert("이유가 뭔지 모르겠지만 글쓰기 실패했음. 일단 홈화면으로...");
      props.history.push("/");
    });
};

export default createWritingApi;
