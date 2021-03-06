import React from "react";
import styled from "styled-components";

const CardEnterprise = (props) => {
  return (
  <Container>
    <Card>
    <Group>
      <Name>{props.name}</Name>
      <Destac>{props.email}</Destac>
      <Textarea>{props.state}</Textarea>
      <Textarea>{props.cnpj}</Textarea>
      <Textarea>{props.apan_associate}</Textarea>
      <Textarea>{props.business_segments}</Textarea>
      <Textarea>{props.business_fields}</Textarea>
      <Textarea>{props.diversity_functions}</Textarea>
      <Bio>{props.presentation}</Bio>
      <Destac>{props.links}</Destac>
    </Group>
    </Card>
  </Container>
  );
};

export default CardEnterprise;

export const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0 6px 20px 0 rgba(13, 51, 32, 0.1);
  border: 1px solid transparent;
  transition: border 300ms ease-in;
  min-width: 100%;
  min-height: 100%;
  margin-top: 2vh;

  &:hover {
    border: 1px solid #fc9b44;
  }
`;
export const Card = styled.div`
  padding: 20px;

`;
export const Textarea = styled.p`
  font-size: 16px;  
`;
export const Label = styled.label`
  font-size: 16px;
  margin-right: 1vw;
`;
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4vw 0;
`;
export const Name = styled.p`
  color: #FFDEAD;
  font-size: 28px;
  margin-top: 1vh;
`;
export const Destac = styled.p`
  color: #fc9b44;
  font-size: 16px;
  margin-top: 1vh;
`;
export const Bio = styled.p`
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
`;
