import React, { useRef, useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Webcam from "react-webcam";
import axios from "axios"
import MessageTooltip from "../../../MessageTooltip";

function TrackComplaintWebcam() {
  const [allowCamera, setAllowCamera] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("Undefined")

  // camera functions

  const webcam = useRef<Webcam>(null);
  const [picture, setPicture] = useState("");

  const videoConstraints = {
    width: 461,
    height: 250,
    facingMode: "user",
  };

  const openWebCam = () => {
    setAllowCamera(true);
  };

  const capture = () => {
    const pictureScreenshot = webcam?.current?.getScreenshot();
    {
      pictureScreenshot ? setPicture(pictureScreenshot) : null;
    }

    setLicenseNumber("Loading...");
  };

  const [openTooltip,setOpenTooltip] = useState(false)

  const [response,setResponse] = useState({})

  useEffect(() => {
    if(picture.length > 0){
      let axiosConfig = {
         headers : {
          'Authorization': process.env.PLATERECOGNIZER_TOKEN
        }    
      }
      const body = {
        "regions": ["mx"],
        "upload":  picture
      }

      axios.post('https://api.platerecognizer.com/v1/plate-reader/',body,axiosConfig)
      .then((res) => {
        setOpenTooltip(true)
        if(res.data.results[0]){
          setResponse({"Status":"success","msg": "license plate detected"})
        setLicenseNumber(res?.data?.results[0]?.plate)
        }else{
          setResponse({"Status":"error","msg": "license plate not detected"})
        setLicenseNumber("Not Found")
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })
    }
  }, [picture])  

  return (
    <>
      <Typography
        fontFamily={"Inter"}
        fontStyle={"SemiBold"}
        fontWeight={"600"}
        fontSize={"32px"}
        lineHeight={"39px"}
        color={"#FFFFFF"}
      >
        CCTV Cam Feature
      </Typography>

      <Typography
        fontFamily={"Inter"}
        fontStyle={"Regular"}
        fontSize={"20px"}
        lineHeight={"24px"}
        color={"#D9D9D9"}
        fontWeight={"400"}
        sx={{ marginTop: "8px" }}
      >
        To test our Camera Feature Which will be going to use in CCTV cameras
      </Typography>

      <Typography
        fontFamily={"Inter"}
        fontStyle={"SemiBold"}
        fontWeight={"600"}
        fontSize={"32px"}
        lineHeight={"39px"}
        color={"#008DFF"}
        sx={{ marginTop: "16px" }}
      >
        License Plate : {licenseNumber}
      </Typography>

      {!allowCamera ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "10px",
              background: "#D9D9D9",
              height: "250px",
              marginTop: "18px",
              width: "461px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CameraAltIcon />
          </Box>

          <Button
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "5px",
              background: "#008DFF",
              flexDirection: "column",
              height: "48px",
              marginTop: "18px",
              width: "461px",
            }}
            onClick={openWebCam}
          >
            <Typography
              fontFamily={"Inter"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight={"24px"}
              color={"#FFFFFF"}
            >
              Camera
            </Typography>
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Webcam
            audio={false}
            ref={webcam}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            width={461}
          />

          <Button
            sx={{
              border: "1px solid #008DFF",
              borderRadius: "5px",
              background: "#008DFF",
              flexDirection: "column",
              height: "48px",
              marginTop: "18px",
              width: "461px",
            }}
            onClick={capture}
          >
            <Typography
              fontFamily={"Inter"}
              fontStyle={"SemiBold"}
              fontWeight={"600"}
              fontSize={"20px"}
              lineHeight={"24px"}
              color={"#FFFFFF"}
            >
              Capture
            </Typography>
          </Button>
        </Box>
      )}

      <MessageTooltip openTooltip = {openTooltip} setOpenTooltip={setOpenTooltip} message={response}/>
    </>
  );
}

export default TrackComplaintWebcam;
