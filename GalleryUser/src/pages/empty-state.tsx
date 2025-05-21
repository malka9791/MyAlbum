import type { ReactNode } from "react"
import { Box, Typography, Paper } from "@mui/material"

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        py: 6,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "grey.50",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "grey.100",
          p: 2,
          borderRadius: "50%",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon || (
          <Typography variant="h3" sx={{ color: "grey.400" }}>
            📁
          </Typography>
        )}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "md", mb: 3 }}>
        {description}
      </Typography>
      {action}
    </Paper>
  )
}
