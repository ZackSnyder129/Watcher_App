import  React,{useState} from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import axios from "axios"
import { savelicense_data } from "../../../pages/api/LicensePlateForm";

function LicensePopover({
  anchorEl,
  setAnchorEl,
  id,
}: {
  anchorEl: any;
  setAnchorEl: any;
  id: any;
}) {

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const color = "#FFFFFF";
  
  const [licenseForm,setLicenseForm] = useState({
      licenseNo : "",
      carModel : "",
      carColor : "",
      lastLocation : "",
      dateandtime : "12/22/2022 06:31 AM"
  })

  const handleInputs = (e: {
    [x: string]: any; target: { name: any; value: any; }; 
}) => {
    if (e.target) {
      setLicenseForm({...licenseForm, [e.target.name]:e.target.value})
    } else {
      setLicenseForm({...licenseForm, dateandtime: e.$d})
    }
  }

  const fetchData = () => {
    
  }


  const formSubmitHandler =  async () => {
    fetchData()
    console.log(licenseForm)

    savelicense_data()
  }



  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorPosition={{
          top: 0,
          left: 66,
        }}
      >
        <Box sx={{ background: "#202126" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              columnGap: "13px",
              px: 3,
              paddingTop: "19px",
              color:'white'
            }}
          >
            <KeyboardBackspaceIcon
              sx={{svg: { color },cursor: "pointer" }}
              onClick={handleClose}
            />
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Regular"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Back
            </Typography>
          </Box>

          <Box
            sx={{
              background: "#34353A",
              width: "100%",
              height: "80px",
              display: "flex",
              alignItems: "center",
              px: 3,
              marginTop: "11px",
            }}
          >
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"SemiBold"}
              fontSize={"32px"}
              lineHeight={"48px"}
              color={"#FFFFFF"}
            >
              Track Vehicle
            </Typography>
          </Box>

          {/* License Plate NUmber */}

          <Box sx={{ marginTop: "45px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              License Plate Number
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              multiline
              inputProps={{ style: { color: "#FFFFFF" } }}
              name={"licenseNo"}
              value={licenseForm.licenseNo}
              onChange={handleInputs}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "8px",
              }}
              placeholder="CG6AL3748"
            />
          </Box>

          {/* Model */}

          <Box sx={{ marginTop: "20px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Model
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              multiline
              inputProps={{ style: { color: "#FFFFFF" } }}
              name={"carModel"}
              value={licenseForm.carModel}
              onChange={handleInputs}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "8px",
              }}
              placeholder="Mahindra XUV 700"
            />
          </Box>

          {/* Color */}

          <Box sx={{ marginTop: "20px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Color
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              multiline
              inputProps={{ style: { color: "#FFFFFF" } }}
              name={"carColor"}
              value={licenseForm.carColor}
              onChange={handleInputs}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "8px",
              }}
              placeholder="Red"
            />
          </Box>

              {/* last location */}

          <Box sx={{ marginTop: "20px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Last Location
            </Typography>

            <TextField
              id="margin-none"
              fullWidth
              multiline
              inputProps={{ style: { color: "#FFFFFF" } }}
              name={"lastLocation"}
              value={licenseForm.lastLocation}
              onChange={handleInputs}
              sx={{
                background: "#34353A",
                border: "0.2px solid #34353A",
                borderRadius: "8px",
                marginTop: "8px",
              }}
              placeholder="Sector 19, Indravati Bhawan, Naya Raipur"
            />
          </Box>

          {/* time of crime */}

          <Box sx={{ marginTop: "20px", px: 3 }}>
            <Typography
              fontFamily={"Poppins"}
              fontStyle={"Medium"}
              fontSize={"24px"}
              lineHeight={"36px"}
              color={"#FFFFFF"}
            >
              Date of Theft
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="dateandtime"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      background: "#34353A",
                      border: "0.2px solid #34353A",
                      borderRadius: "8px",
                      marginTop: "8px",
                      svg: { color },
                      input: { color },
                      icon: { color },
                    }}
                  />
                )}
                value={licenseForm.dateandtime}
                onChange={handleInputs}
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "33px",
              px: 3,
              pb: 3,
            }}
          >
            <Button
              sx={{
                border: "1px solid #008DFF",
                borderRadius: "10px",
                background: "#008DFF",
                width: "462px",
                height: "64px",
              }}
              
              onClick={formSubmitHandler}
            >
              <Typography
                fontFamily={"Poppins"}
                fontStyle={"SemiBold"}
                fontWeight={"600"}
                fontSize={"32px"}
                lineHeight={"48px"}
                color={"#FFFFFF"}
              >
                Track
              </Typography>
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}

export default LicensePopover;
