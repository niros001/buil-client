import React, { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Modal } from "antd";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo.svg";
import { MainOptions, Page, ConstructionQuantityExtractor } from "./components";

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledHeader = styled(Header)`
  background-color: #0958d9;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const LogoImg = styled.img`
  height: 50px;
`;

const LanguagesWrapper = styled.div`
  display: flex;
  gap: 5px;

  span {
    cursor: pointer;
  }
`;

const StyledContent = styled(Content)``;

const StyledFooter = styled(Footer)`
  background-color: #0958d9;
  color: #fff;
  text-align: center;
`;

const MainPage: React.FC = () => {
  const { i18n } = useTranslation();

  const confirmAndChange = useCallback(
    (lng: string) => {
      Modal.confirm({
        title: "Change Language",
        content: "Are you sure you want to change the language?",
        okText: "Yes",
        cancelText: "No",
        onOk: () => i18n.changeLanguage(lng),
      });
    },
    [i18n],
  );

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>
          <LogoImg src={logo} alt="BuilAI Logo" />
          Buil
        </Logo>
        <LanguagesWrapper>
          <span onClick={() => confirmAndChange("en")}>🇺🇸</span>
          <span onClick={() => confirmAndChange("he")}>🇮🇱</span>
        </LanguagesWrapper>
      </StyledHeader>

      <StyledContent>
        <Routes>
          <Route path="/" element={<MainOptions />} />
          <Route
            path="/construction-quantity-extractor"
            element={
              <Page title="Construction Quantity Extractor">
                <ConstructionQuantityExtractor />
              </Page>
            }
          />
        </Routes>
      </StyledContent>

      <StyledFooter>
        © {new Date().getFullYear()} Buil App. All rights reserved.
      </StyledFooter>
    </StyledLayout>
  );
};

export default MainPage;
