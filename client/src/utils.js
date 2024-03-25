export const uploadPic = (pic, setLoading, setState) => {
  setLoading(true);
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
        setState(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } else {
    console.log("select an image");
    setLoading(false);
    return;
  }
};
