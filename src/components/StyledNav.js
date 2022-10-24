import styled from "styled-components";

export const NavBar = styled.nav`
	height: 100vh;
	width: ${({ window }) => (window === false ? "250px" : "60px")};
	background-color: white;
	box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.15);
	transition: all 0.5s ease;
`;

export const Burger = styled.div`
	display: flex;
	justify-content: flex-end;
	img: {
		padding: 25px 8px 0 0;
		cursor: pointer;
	}
`;

export const NavBarList = styled.ul`
	list-style: none; ;
`;

export const NavBarElement = styled.li`
	display: inline-block;
	padding: 0px 0px 0px 12px;
	position: relative;
	top: 2.5px;
	font-size: 16px;
	letter-spacing: 0px;
	line-height: 38px;
	color: black;
	font-family: "Lato";
	font-weight: 400;
	&::first-child {
		margin-top: 20px;
	}
	display: ${({ window }) => (window === false ? "inline-block" : "none")};
`;

export const NavBarBoxElement = styled.div`
	height: 43px;
	margin-top: 15px;
	&:hover {
		border-left: 7px solid #58b5fc;
		cursor: pointer;
	}
`;
