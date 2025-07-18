import React, { useState } from 'react';
import { Layout, Typography, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import logo from './assets/logo.svg';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const StyledHeader = styled(Header)`
  background-color: #0958d9;
  color: #fff;
  display: flex;
  align-items: center;
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

const StyledContent = styled(Content)`
  padding: 20px;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 32px;
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Preview = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
  height: 500px;

  iframe {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    height: 400px;
    max-width: 100%;
  }
`;

const ResponsiveDivider = styled.div`
  width: 1px;
  background-color: #eee;
  margin: 0 16px;

  @media (max-width: 768px) {
    height: 1px;
    width: 100%;
    margin: 24px 0;
  }
`;

const ResponseBox = styled.div`
  margin-top: 32px;
  padding: 16px;
  background: #fafafa;
  border-left: 4px solid #1890ff;
  border-radius: 4px;
`;

const StyledFooter = styled(Footer)`
  background-color: #0958d9;
  color: #fff;
  text-align: center;
`;

const MainPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');

  const handleBeforeUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      message.error('Only PDF files are supported.');
      return false;
    }
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    return false;
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file); // MUST match Flask key

    try {
      setLoading(true);
      const res = await fetch('https://buil-server.onrender.com/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Conversion failed');

      const data = await res.json();
      setResponse(data.result); // ✅ show OpenAI’s answer
    } catch (error) {
      console.error(error);
      message.error('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo>
          <LogoImg src={logo} alt="BuilAI Logo" />
          Buil
        </Logo>
      </StyledHeader>

      <StyledContent>
        <UploadSection>
          <div style={{ flex: 2 }}>
            <Title level={3}>Upload a PDF File</Title>
            <Paragraph>Select a PDF file to preview it and upload it to the server.</Paragraph>

            <Upload beforeUpload={handleBeforeUpload} showUploadList={false} accept="application/pdf">
              <Button icon={<UploadOutlined />}>Select PDF</Button>
            </Upload>

            {previewUrl && (
              <Preview>
                <iframe title="PDF Preview" src={previewUrl} />
              </Preview>
            )}
          </div>

          <ResponsiveDivider />

          <div style={{ flex: 3 }}>
            <Button type="primary" onClick={handleUpload} disabled={!file} loading={loading}>
              Upload to Server
            </Button>

            {response && (
              <ResponseBox>
                <Text strong>Server Response:</Text>
                <Paragraph>{response}</Paragraph>
              </ResponseBox>
            )}
          </div>
        </UploadSection>
      </StyledContent>

      <StyledFooter>© {new Date().getFullYear()} Buil App. All rights reserved.</StyledFooter>
    </StyledLayout>
  );
};

export default MainPage;
