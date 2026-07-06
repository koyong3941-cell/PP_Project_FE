import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f7f9fc;
`;

export const Sidebar = styled.div`
  width: 250px;
  background: white;
  border-right: 1px solid #eee;
`;

export const Logo = styled.div`
  padding: 30px;
  font-size: 24px;
  font-weight: bold;
  color: blue;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.div`
  padding: 18px 25px;
  display: flex;
  gap: 12px;
  cursor: pointer;

  background: ${(props) => (props.active ? "#E8F5E9" : "white")};

  color: ${(props) => (props.active ? "#4CAF50" : "#333")};
`;

export const Main = styled.div`
  flex: 1;
  padding: 40px;
  background: #fdecec;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const LogoutBtn = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
`;

export const Toolbar = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 15px;
`;

export const Select = styled.select`
  font-weight: 10px;
  width: 140px;
  height: 45px;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 45px;
  padding-left: 15px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddButton = styled.button`
  background: black;
  color: white;
  border: none;
  padding: 0 25px;
  border-radius: 8px;
`;

export const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 0 25px;
  border-radius: 8px;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 30px;
  background: white;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;

  th,
  td {
    padding: 18px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
`;

export const PageBtn = styled.button`
  border: none;
  background: ${({ active }) => (active ? "#FCE7F3" : "transparent")};
  color: ${({ active }) => (active ? "#DB2777" : "#555")};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #fdf2f8;
  }
`;

export const LowBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 30px 0;

  .pageWrap {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  button {
    min-width: 34px;
    height: 34px;
    padding: 0 12px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }

  button:hover:not(:disabled) {
    background: #f4f4f4;
  }

  button.active {
    background: #333;
    color: #fff;
    border-color: #333;
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  span {
    padding: 0 6px;
    color: #888;
  }
`;
