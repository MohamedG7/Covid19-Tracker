import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const Status = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 512px) {
    flex-direction: column;
  }

`;
export const WMap = styled.div`
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
  .leaflet-container {
    height: 100%;
    border-radius: 12px;
  }
`;
export const Left = styled.div`
  flex: 0.9;
`;
export const Right = styled.div``;
export const Cases = styled.h2``;
export const TableTab = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  color: #6a5d5d;
  height: 400px;

  tr {
    display: flex;
    justify-content: space-between;
  }

  td {
    padding: 0.5rem;
  }

  tr:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;