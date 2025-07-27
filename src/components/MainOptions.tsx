import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
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

const OptionBox = styled(Link)`
  text-decoration: none;
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ececec;
    transform: translateY(-2px);
  }
`;

const options = [
  {
    title: "Construction Quantity Extractor",
    path: "/construction-quantity-extractor",
  },
  // {
  //   title: "Material Cost Estimator",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "Blueprint Analyzer",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "Pipe Routing Visualizer",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "Electrical Load Calculator",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "HVAC Zone Mapper",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "Structural Integrity Checker",
  //   path: "/construction-quantity-extractor",
  // },
  // {
  //   title: "Plumbing Layout Tool",
  //   path: "/construction-quantity-extractor",
  // },
  // { title: "3D Plan Preview", path: "/construction-quantity-extractor" },
  // {
  //   title: "Environmental Compliance Checker",
  //   path: "/construction-quantity-extractor",
  // },
];

const MainOptions = () => {
  return (
    <Container>
      <Grid>
        {options.map((opt, i) => (
          <OptionBox to={opt.path} key={i}>
            {opt.title}
          </OptionBox>
        ))}
      </Grid>
    </Container>
  );
};

export default MainOptions;
