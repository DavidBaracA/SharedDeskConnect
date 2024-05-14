import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import SecurityIcon from "@mui/icons-material/Security";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const items = [
  {
    icon: <LocationCityIcon />,
    title: "Prime locations",
    description:
      "Discover coworking spaces in desirable areas, strategically located for convenience and accessibility.",
  },
  {
    icon: <PriceChangeIcon />,
    title: "Flexible pricing",
    description:
      "Choose from a range of pricing options tailored to your budget and usage requirements.",
  },
  {
    icon: <SecurityIcon />,
    title: "Secure Data",
    description:
      "Rest assured with secure data processing and protection against fraudulent activities.",
  },
  {
    icon: <CalendarMonthIcon />,
    title: "Flexible booking",
    description:
      "Book coworking spaces at your convenience, with flexible scheduling options that suit your workflow.",
  },
  {
    icon: <PeopleIcon />,
    title: "Collaborative environment",
    description:
      "Join a community of like-minded individuals, fostering collaboration and networking opportunities.",
  },
  {
    icon: <WorkHistoryIcon />,
    title: "Productive workspaces",
    description:
      "Optimize your workspace for maximum productivity, tailoring it to your preferences and work habits to enhance efficiency and focus.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Embark on a journey of exploration as you enter our platform for
            space rentals. Experience the convenience of a streamlined interface
            and the assurance of meticulous attention to detail, ensuring your
            search for the perfect space is both effortless and rewarding.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "#041f60",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
