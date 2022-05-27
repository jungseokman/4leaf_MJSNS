import React, { useCallback, useEffect, useState } from "react";
import { Wrapper } from "../utils/globalComponents";
import styled from "styled-components";
import { Button, Form, Input, message } from "antd";
import FeedBox from "../components/FeedBox";
import Fade from "react-reveal/Fade";
import FollowBox from "../components/FollowBox";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_FEED_REQUEST,
  GET_FRIENDS_REQUEST,
  LOGINUSER_REQUEST,
  TESTCALL_REQUEST,
  USERCALL_REQUEST,
} from "../reducers/user";

const SearchWrapper = styled(Wrapper)`
  box-shadow: -4px -4px 10px 2px #d7d7d7;
  padding: 0px 15px;
`;

const ProjectTitle = styled.h1`
  font-size: 1.3rem;
  margin-bottom: 0px;
  font-weight: 700;
`;

const SearchInput = styled(Input)`
  width: 250px;
  height: 27px;
  border-radius: 5px;
`;

const FeedWrapper = styled(Wrapper)`
  margin-top: 50px;
  flex-wrap: wrap;
  overflow: scroll;
`;

const InfoTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0px;
  font-weight: 700;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  box-shadow: 3px 3px 5px #d7d7d7;
`;

const ProfileTxt = styled.div`
  margin-bottom: 5px;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0px;
    bottom: 4px;
    width: 100%;
    height: 5px;
    background-color: #a2a2a2;
    border-radius: 7px;
    opacity: 0.2;
  }
`;

const MateWrapper = styled(Wrapper)`
  overflow: scroll;
  height: 100%;
`;

const LoginBox = styled.div`
  width: 550px;
  height: 300px;

  border: 1px solid #ececec;
  border-radius: 12px;
  box-shadow: 2px 2px 7px #999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px;
`;

const App = () => {
  const [feedWidth, setFeedWidth] = useState(65);
  const { st_testCallDone, me, friends, feeds } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const saveVirtualLoginInfo = async () => {
    await localStorage.setItem("mj_login_id", 1);
  };

  const loginButtonAction = useCallback((data) => {
    dispatch({
      type: LOGINUSER_REQUEST,
      data: {
        username: data.usernameInput,
        birth: data.birthInput,
      },
    });
    console.log(data);
  }, []);

  useEffect(() => {
    saveVirtualLoginInfo();
    console.log(me);

    dispatch({
      type: GET_FRIENDS_REQUEST,
      data: {
        userId: localStorage.getItem("mj_login_id"),
      },
    });

    dispatch({
      type: GET_FEED_REQUEST,
      data: {
        userId: localStorage.getItem("mj_login_id"),
      },
    });
  }, []);

  useEffect(() => {
    if (st_testCallDone) {
      message.success("백엔드와 통신에 성공했습니다");
      console.log(data);
    }
    console.log(st_testCallDone);
  }, [st_testCallDone]);

  return (
    <>
      {me === null ? (
        <Wrapper height="100vh">
          <LoginBox>
            <Form
              wrapperCol={{ span: 0 }}
              labelCol={{ span: 24 }}
              style={{ width: "100%" }}
              onFinish={loginButtonAction}
            >
              <Form.Item
                name="usernameInput"
                rules={[{ required: true, message: "이름을 입력하세여" }]}
              >
                <Input placeholder="Username..." />
              </Form.Item>

              <Form.Item
                name="birthInput"
                rules={[{ required: true, message: "비밀번호를 눌러주세여" }]}
              >
                <Input placeholder="birth..." type="password" />
              </Form.Item>

              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                LOGIN
              </Button>
            </Form>
          </LoginBox>
        </Wrapper>
      ) : (
        <Wrapper height="100vh" dr="row">
          {/* LEFT FEED SECITON */}
          <Wrapper width={`${feedWidth}%`} ju="flex-start">
            <SearchWrapper dr="row" height="55px" ju="space-between">
              <ProjectTitle>MJ Social</ProjectTitle>

              <Form>
                <SearchInput allowClear placeholder="검색어를 입력하세요." />
              </Form>
            </SearchWrapper>

            <FeedWrapper dr="row" ju="space-around">
              {feeds &&
                feeds.map((feed) => (
                  <FeedBox
                    key={feed.imgURL}
                    feedWidth={feedWidth}
                    imgSrc={feed.imgURL}
                    content={feed.content}
                  />
                ))}
            </FeedWrapper>
          </Wrapper>

          <Wrapper width={`calc(100% - ${feedWidth}%)`}>
            {/* MY INFO SECTON */}
            <Wrapper
              height="35%"
              padding="10px"
              al="flex-start"
              ju="flex-start"
            >
              <InfoTitle>PROFILE</InfoTitle>

              <Wrapper dr="row">
                <Wrapper width="40%">
                  <Fade bottom>
                    <ProfileImage src={me ? me.avatar : ""} />
                  </Fade>
                </Wrapper>
                <Wrapper width="60%">
                  <ProfileTxt>{me ? me.username : ""}</ProfileTxt>
                  <ProfileTxt>{me ? me.birth : ""}</ProfileTxt>
                  <ProfileTxt>{me ? me.msg : ""}</ProfileTxt>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            {/* FOLLOWERS SECTION */}
            <Wrapper
              height="65%"
              padding="10px"
              al="flex-start"
              ju="flex-start"
            >
              <InfoTitle>Social MATE</InfoTitle>

              <MateWrapper ju="flex-start">
                {friends &&
                  friends.map((friend, key) => {
                    return (
                      <FollowBox
                        key={key}
                        imgSrc={friend.avatar}
                        friendUsername={friend.username}
                        friendId={friend.id}
                      >
                        팔로우 정보
                      </FollowBox>
                    );
                  })}
              </MateWrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      )}
    </>
  );
};

export default App;
