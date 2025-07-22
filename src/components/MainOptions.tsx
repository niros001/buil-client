import styled from "styled-components";
import ConstructionQuantityExtractor from "./ConstructionQuantityExtractor";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  padding: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptionBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ececec;
    transform: translateY(-2px);
  }
`;

const options = [
  {
    title: "Construction Quantity Extractor",
    component: <ConstructionQuantityExtractor />,
  },
  { title: "Material Cost Estimator" },
  { title: "Blueprint Analyzer" },
  { title: "Pipe Routing Visualizer" },
  { title: "Electrical Load Calculator" },
  { title: "HVAC Zone Mapper" },
  { title: "Structural Integrity Checker" },
  { title: "Plumbing Layout Tool" },
  { title: "3D Plan Preview" },
  { title: "Environmental Compliance Checker" },
];

const MainOptions = () => {
  return (
    <Container>
      <Grid>
        {options.map((opt, index) => (
          <OptionBox key={index}>{opt.title}</OptionBox>
        ))}
      </Grid>
    </Container>
  );
};

export default MainOptions;
