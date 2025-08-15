import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  padding: 24px;
`;

const BackButton = styled.button`
  background: #eee;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  max-width: max-content;

  &:hover {
    background: #ddd;
  }
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Page = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <BackButton onClick={() => navigate(-1)}>{t("back")}</BackButton>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default Page;
