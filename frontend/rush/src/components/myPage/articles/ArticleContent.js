import React from 'react';
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import CreateDate from "../../../util/CreateDate";

const ArticleContentStyle = styled.div`
  justify: center;
  height: 80px;
  margin-left: 10px;
  border-bottom: 2px solid rgb(90, 155, 213);
  cursor: pointer;
`;

const StyledTitle = styled.div`
  margin-top:5px;
  height: 30px;
  margin-left: 5px;
  font-size: 22px;
`;

const StyledInf = styled.div`
  display:flex;
  position: relative;
  height: 30px;
  margin-top:5px;
  padding-top:5px;
  margin-left: 5px;
`;

const StyledSubInf = styled.div`
  position: absolute;
  right: 5px;
`;

const StyledTotalComments = styled.div`
  display: inline-block;
  margin-right: 5px;
  font-size: 20px;
`;


const ArticleContent = (props) => {
  const onClickedArticleContent = (publicMap, privateMap)=>{
    if(publicMap)
      props.history.push('/articles/public/'+props.article.id);
    else if(privateMap)
      props.history.push('/articles/private/'+props.article.id);
    else props.history.push('/articles/grouped/'+props.article.id)
  };

  return (
      <ArticleContentStyle onClick={()=>{onClickedArticleContent(props.article.publicMap ,props.article.privateMap);}}>
        <StyledTitle>{props.article.title}</StyledTitle>
        <StyledInf>
          <CreateDate iso8601format={props.article.createDate}/>
          <StyledSubInf>
            <StyledTotalComments>
              {props.article.totalComments}
            </StyledTotalComments>
            <img
                src="/comment.png"
                alt="my image"
                style={{
                  width: "17px",
                  height: "17px"
                }}
            />
          </StyledSubInf>
        </StyledInf>
      </ArticleContentStyle>

  );
};

export default withRouter(ArticleContent);
