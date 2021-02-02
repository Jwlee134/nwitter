import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import styled from "styled-components";

import useNweetFactory from "../hooks/useNweetFactory";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Submit = styled.input`
  width: 41.6px;
  height: 41.6px;
  padding: 0;
  position: absolute;
  right: 0;
`;

const Label = styled.label`
  margin: 20px 0px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 335px;
  padding-right: 50px;
`;

const Text = styled.span`
  color: #099fff;
  text-align: center;
`;

const InputFile = styled.input`
  display: none;
`;

const Img = styled.img`
  margin-bottom: 10px;
  border-radius: 50%;
`;

const Button = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  margin: 0 auto;
  color: #099fff;
`;

const NweetFactory = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    text,
    attachment,
    handleSubmit,
    handleChange,
    onFileChange,
    onClearAttachment,
  } = useNweetFactory(inputRef);

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={text}
          onChange={handleChange}
        />
        <Submit type="submit" value="✔" />
      </InputContainer>
      <Label htmlFor="attach-file">
        <Text>Add a Photo</Text>
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: "#099fff", marginLeft: 7 }}
        />
      </Label>
      <InputFile
        id="attach-file"
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {attachment && (
        <div>
          <Img src={attachment} width="100px" height="100px" alt="" />
          <Button onClick={onClearAttachment}>
            Cancel
            <FontAwesomeIcon
              icon={faTimes}
              style={{ color: "#099fff", marginLeft: 7 }}
            />
          </Button>
        </div>
      )}
    </Form>
  );
};

export default NweetFactory;
