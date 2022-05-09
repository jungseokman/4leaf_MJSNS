import { Modal } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GET_MATE_FEED_REQUEST } from "../reducers/user";
import { Wrapper } from "../utils/globalComponents";

const MateWrapper = styled.div`
  flex-direction: row;
  display: flex;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  box-shadow: 3px 3px 5px #d7d7d7;
  margin-right: 20px;
`;

const ViewId = styled.div`
  cursor: pointer;

  transition: 0.5s;

  &:hover {
    color: skyblue;
  }
`;

const CancelTxt = styled.div`
  cursor: pointer;

  transition: 0.5s;

  &:hover {
    color: #ff4242; // 남심저격 색상
  }
`;

const Box = styled.img`
  width: ${(props) => `${props.oneWidth}px` || "0px"};
  min-width: ${(props) => `${props.oneWidth}px` || "0px"};
  height: ${(props) => `${props.oneWidth}px` || "0px"};

  border-radius: 3px;
  box-shadow: 0px 0px 3px #999;

  transition: 0.5s;
  object-fit: cover;

  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  margin-bottom: 14px;
`;

const FollowBox = ({ imgSrc, friendUsername, friendId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { mateFeed } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  console.log(mateFeed);

  const modalToggleHandler = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, [modalOpen]);

  const clickHandler = useCallback((friendId) => {
    modalToggleHandler();

    dispatch({
      type: GET_MATE_FEED_REQUEST,
      data: {
        userId: friendId,
      },
    });
  }, []);

  return (
    <Wrapper dr="row" height="55px" ju="space-around" padding="0px 15px">
      <Wrapper dr="row" ju="flex-start">
        <ProfileImage src={imgSrc} />
        <ViewId onClick={() => clickHandler(friendId)}>{friendUsername}</ViewId>
        <Modal
          visible={modalOpen}
          title="FEED"
          width="1000px"
          footer={null}
          onCancel={() => modalToggleHandler()}
        >
          {mateFeed &&
            mateFeed.map((data, key) => {
              return (
                <MateWrapper>
                  <Box width={`250px`} height={`250px`} src={data.imgURL}></Box>
                </MateWrapper>
              );
            })}
        </Modal>
      </Wrapper>

      <Wrapper al="flex-end">
        <CancelTxt>팔로우 취소</CancelTxt>
      </Wrapper>
    </Wrapper>
  );
};

export default FollowBox;
