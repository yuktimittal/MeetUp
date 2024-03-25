import { Avatar, Box, IconButton, Tab, Tabs, Typography } from "@mui/material";

import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "services/UserServices";

import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import UpdateProfilePictureModal from "./UpdateProfilePictureModal";
import AboutSection from "./AboutSection";
import DetailedProfile from "./DetailedProfile";
import NotFound from "./../../assets/images/404-error.png";
import MyEventCard from "./MyEventCard";

const Profile = () => {
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const [editingAllowed, setEditingAllowed] = useState(false);
  const [aboutContent, setAboutContent] = useState();
  const [profilePic, setProfilePic] = useState();
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getUserById(id, setProfileUser);
    setAboutContent(profileUser?.about);
    if (user && user?.id === id) {
      setEditingAllowed(true);
    } else setEditingAllowed(false);
  }, [id]);

  const updateProfilePicture = (pic) => {
    if (pic === undefined) {
      console.log("Please select an image");
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "meet-up");
      data.append("cloud_name", "dn02dvrtg");

      fetch("https://api.cloudinary.com/v1_1/dn02dvrtg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePic(data.url.toString());
          setOpenUpdateProfileModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("select an image");
      return;
    }
  };
  function CustomTabPanel({ index, selectedTab, content }) {
    return (
      <div hidden={selectedTab !== index}>
        {selectedTab === index && <Box sx={{ p: 3 }}>{content}</Box>}
      </div>
    );
  }

  return (
    <div className="profile-body">
      <UpdateProfilePictureModal
        id={id}
        openUpdateProfileModal={openUpdateProfileModal}
        setOpenUpdateProfileModal={setOpenUpdateProfileModal}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        setProfileUser={setProfileUser}
      />
      <div className="profile-bg-image">
        <Box className="user-profile-photo">
          <Avatar
            sx={{ width: 112, height: 112 }}
            src={profileUser?.profilePicture}
          ></Avatar>
          {editingAllowed && (
            <>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={(e) => updateProfilePicture(e.target.files[0])}
              />
              <label htmlFor="icon-button-file" style={{ width: 0 }}>
                <IconButton
                  component="span"
                  sx={{
                    right: "2rem",
                    top: "4rem",
                    "&:hover ": { backgroundColor: "transparent" },
                  }}
                >
                  <AddAPhotoOutlinedIcon
                    type
                    sx={{
                      fontSize: "1.8rem",
                      color: "primary",
                    }}
                  />
                </IconButton>
              </label>
            </>
          )}

          <div style={{ marginTop: "1rem" }}>
            <p className="profile-name">{profileUser?.name}</p>
            <p className="profile-name">{profileUser?.email}</p>
          </div>
        </Box>
      </div>
      <Box>
        <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab
              label={editingAllowed ? "Edit Profile" : "View Profile"}
              value={1}
            />
            {editingAllowed && <Tab label="Registered Events" value={2} />}
          </Tabs>
        </Box>

        <CustomTabPanel
          selectedTab={selectedTab}
          index={1}
          content={
            <>
              <AboutSection
                id={id}
                profileUser={profileUser}
                setProfileUser={setProfileUser}
                aboutContent={aboutContent}
                setAboutContent={setAboutContent}
                editingAllowed={editingAllowed}
              />

              <DetailedProfile
                id={id}
                editingAllowed={editingAllowed}
                profileUser={profileUser}
                setProfileUser={setProfileUser}
              />
            </>
          }
        />
        <CustomTabPanel
          selectedTab={selectedTab}
          index={2}
          content={
            profileUser?.registrations?.length > 0 ? (
              <Box>
                {profileUser?.registrations?.map((registration) => (
                  <div key={registration?.event?._id}>
                    <MyEventCard
                      eventId={registration?.event?._id}
                      eventDate={registration?.event?.eventDate}
                      eventName={registration?.event?.name}
                      eventPicture={registration?.event?.picture}
                      eventCity={registration?.event?.city}
                    />
                  </div>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <img style={{ width: 200, height: 200 }} src={NotFound} />
                <Typography>You haven't registered for any event</Typography>
              </Box>
            )
          }
        />
      </Box>
    </div>
  );
};
export default Profile;
