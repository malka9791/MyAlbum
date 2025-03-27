{/* <InputLabel id="role-label" sx={{ color: "rgb(249, 4, 91)" }}>
  Role
</InputLabel>
<Select
  fullWidth
  labelId="role-label"
  id="demo-simple-select-helper"
  {...register("role")}
  defaultValue=""
  sx={{
    color: "black",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(249, 4, 91)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(235, 255, 0)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(235, 255, 0) !important",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(249, 4, 91) !important",
    },
  }}
>
  <MenuItem value="USER">
    <PersonAdd sx={{ color: "rgb(249, 4, 91)" }} />
    User
  </MenuItem>
  <MenuItem value="ADMIN">
    <PersonAdd sx={{ color: "rgb(249, 4, 91)" }} />
    Admin
  </MenuItem>
  <MenuItem value="GUEST">
    <PersonAdd sx={{ color: "rgb(249, 4, 91)" }} />
    Guest
  </MenuItem>
</Select>

            {errors.role && (
              <FormHelperText sx={{ color: "rgb(249, 4, 91) !important" }}>
                {errors.role.message}
              </FormHelperText>
            )} */}