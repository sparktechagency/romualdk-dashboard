import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetPrivacyPolicyQuery } from "../../redux/features/setting/settingApi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#027348",
    },
    background: {
      default: "#0F0F0F",
      paper: "#111111",
    },
    text: {
      primary: "#ffffff",
      secondary: "#A1A1A1",
    },
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          color: "#757575",
          fontSize: 16,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#989898",
        },
      },
    },
  },
});

const PublicPrivacy = () => {
  const [content, setContent] = useState("");
  const { data: policyData } = useGetPrivacyPolicyQuery(undefined);

  useEffect(() => {
    setContent(policyData?.content);
  }, [policyData]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          py: 10,
          px: 2,
          background:
            "linear-gradient(91.95deg, rgba(2, 115, 72, .8) -100.37%, rgba(3, 47, 30, .40) 101.16%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            bgcolor: "rgba(17,17,17,0.5)",
            border: "1px solid rgba(2,115,72,0.1)",
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            overflowY: "auto",
            mb: 6,
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={5}>
            <Link to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Logo"
                sx={{ width: 72, mb: 3, mx: "auto" }}
              />
            </Link>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "serif",
                color: "#fff",
              }}
            >
              Privacy Policy
            </Typography>
          </Box>

          {/* Content */}
          <Box
            sx={{
              border: "1px solid #989898",
              borderRadius: 3,
              p: 3,
              minHeight: { xs: 350, md: 500 },
              color: "rgba(255,255,255,0.8)",
              overflow: "auto",
              background: "transparent",
            }}
            dangerouslySetInnerHTML={{
              __html: content || "No content yet.",
            }}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PublicPrivacy;
