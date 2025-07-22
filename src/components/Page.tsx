import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  return (
    <Wrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  );
};

export default Page;
