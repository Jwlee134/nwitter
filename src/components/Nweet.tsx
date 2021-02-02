import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import useNweet from "../hooks/useNweet";

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 10px 0px;
`;

const Text = styled.h4`
  width: 85%;
  padding: 15px;
  padding-right: 0px;
  word-break: break-all;
  line-height: 1.2;
`;

const ButtonContainer = styled.div`
  width: 60px;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

const Toggle = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: space-evenly;
`;

const Input = styled.input`
  width: 140px;
`;

const CancelButton = styled.button`
  margin: 10px 0px;
  padding: 10px 15px;
  width: 170px;
  background-color: #ee533a;
  color: #ffffff;
  &:hover {
    background-color: #ee7562;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  border-radius: 50%;
  margin: 10px;
`;

interface Props {
  nweet: NweetObj;
  isCreator: boolean;
}

const Nweet = ({ nweet, isCreator }: Props) => {
  const {
    editing,
    onSubmit,
    toggleEditing,
    onDeleteClick,
    onChange,
    newNweet,
  } = useNweet(nweet);

  return (
    <Container>
      {isCreator && editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet."
              value={newNweet}
              onChange={onChange}
              required
            />
            <Toggle>
              <Input type="submit" value="Save" />
              <CancelButton onClick={toggleEditing}>Cancel</CancelButton>
            </Toggle>
          </form>
        </>
      ) : (
        <>
          <Text>{nweet.text}</Text>
          {nweet.attachmentUrl && (
            <ImgContainer>
              <Img
                src={nweet.attachmentUrl}
                width="100px"
                height="100px"
                alt=""
              />
            </ImgContainer>
          )}
          {isCreator && (
            <ButtonContainer>
              <Button onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Button onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </ButtonContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Nweet;
