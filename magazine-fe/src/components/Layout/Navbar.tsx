import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAsync } from "react-use";
import magazineService, { authCookieName } from "../Api";
import Cookies from "js-cookie";

const pages = [
  { name: "Magazines", url: "/magazines", protected: true },
  { name: "Subscriptions", url: "/subscriptions", protected: true },
  { name: "Login", url: "/login", protected: false },
  { name: "Create User", url: "/create-user", protected: false },
];

function ResponsiveAppBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isProtectedRoute = Boolean(
    pages.find((page) => page.url === pathname)?.protected
  );

  const state = useAsync(async () => {
    if (isProtectedRoute) {
      const userResponse = await magazineService.get("/user");
      return userResponse.data;
    }
  }, []);

  const userName = state.value?.username;

  const handleLogout = () => {
    Cookies.remove(authCookieName);
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Vogue
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                disabled={pathname === page.url}
                key={page.name}
                sx={{ my: 2, mr: 2, display: "block" }}
              >
                <Link
                  style={{
                    textDecoration:
                      pathname === page.url ? "none" : "underline",
                    color: "white",
                    height: "100%",
                  }}
                  href={page.url}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          {userName && (
            <>
              <Typography>Hello, {state.value?.username}</Typography>
              <Typography onClick={handleLogout} ml={3} color="blue">
                Logout
              </Typography>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
