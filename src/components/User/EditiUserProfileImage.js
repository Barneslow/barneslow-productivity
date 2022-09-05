import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import styles from "./EditUserProfileImage.module.css";
import imageUploadIcon from "../../images/uploadPhoto.svg";
import { useDispatch } from "react-redux";
import { uploadProfilePhoto } from "../../store/userSlice";

const formSchema = Yup.object({
  image: Yup.string().required("Photo is required"),
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: rgba(0, 0, 0, 0.5);
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-size: 1.2rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const EditUserProfileImage = (props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (values) => {
      setIsEditing(false);
      dispatch(uploadProfilePhoto(values?.image));
    },
    validationSchema: formSchema,
  });

  const openModal = () => {
    setIsEditing(true);
  };

  //   const content = isEditing ?

  return (
    <div>
      {!isEditing && (
        <>
          <div className={styles["image-box"]}>
            <div className={styles.root}>
              <img className={styles.image} src={props.imageSrc} />
              <div className={styles.overlay} onClick={openModal}>
                <img
                  className={styles["overlay-image"]}
                  src={imageUploadIcon}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <form
          onSubmit={formik.handleSubmit}
          className={styles["form-container"]}
        >
          <Container>
            <Dropzone
              onBlur={formik.handleBlur("image")}
              acceptedFiles="image/jpeg image/png"
              onDrop={(acceptedFiles) => {
                formik.setFieldValue("image", acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className={styles["upload-container"]}>
                  <div
                    {...getRootProps({
                      className: "dropzone",
                      onDrop: (event) => event.stopPropagation(),
                    })}
                  >
                    <input {...getInputProps()} />
                    <p>Click here to select image</p>
                  </div>
                </div>
              )}
            </Dropzone>
          </Container>
          <div className={styles["button-container"]}>
            <button
              className="negative ui button"
              onClick={() => setIsEditing(false)}
            >
              Close Modal
            </button>
            <button className="positive ui button" type="submit">
              Upload New Photo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserProfileImage;
