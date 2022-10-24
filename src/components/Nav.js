import React from "react";
import PermissionScope from "../lib/guards/PermissionScope";
import RouteGuard from "../lib/guards/RouteGuard";

const Nav = () => {
	return (
		<RouteGuard permission={PermissionScope.READ_USERS}>
			<h1>asdasd</h1>
		</RouteGuard>
	);
};
export default Nav;
