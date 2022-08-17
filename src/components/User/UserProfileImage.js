import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import styled from "styled-components";

import Modal from "../UI/Modal";

import styles from "./UserProfileImage.module.css";
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
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const UserProfileImage = (props) => {
  const dispatch = useDispatch();
  const [viewModal, setViewModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (values) => {
      setViewModal(false);
      dispatch(uploadProfilePhoto(values?.image));
    },
    validationSchema: formSchema,
  });

  const openModal = () => {
    setViewModal(true);
  };

  const uploadPhoto = () => {
    setViewModal(false);
  };
  return (
    <>
      {viewModal && (
        <Modal>
          <form onSubmit={formik.handleSubmit}>
            <h2>Upload A New Photo</h2>
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
            <button onClick={() => setViewModal(false)}>Close Modal</button>
            <button type="submit">Upload New Photo</button>
          </form>
        </Modal>
      )}
      <div className={styles["image-box"]}>
        <div className={styles.root}>
          <img className={styles.image} src={props.imageSrc} />
          <div className={styles.overlay} onClick={openModal}>
            <img className={styles["overlay-image"]} src={imageUploadIcon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileImage;
