import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import useForm from "../useForm";
import { EDIT_STORE } from "../graphql/Mutations";

function EditStore({ store }) {
  const [toggleEditProfile, setToggleEditProfile] = useState(false);

  const { handleChange, handleSubmit, input } = useForm(updateProfile, {
    storeCoverImg: store.coverImg,
    storeImg: store.storeImg,
    storeName: store.storeName,
    town: store.town,
    location: store.location,
    phoneNo: store.phoneNo,
    twitterUrl: store.twitter,
    instagramUrl: store.instagram,
    facebookUrl: store.facebook,
    whatsappNo: store.whatapp,
  });
  const [editStore] = useMutation(EDIT_STORE, {
    onCompleted(data) {
      setToggleEditProfile(false);
    },
    onError(err) {
      console.log(err);
    },
    variables: input,
  });
  function updateProfile() {
    editStore();
  }

  return (
    <>
      <button className="edit-store" onClick={() => setToggleEditProfile(true)}>
        Edit Store Profile
      </button>
      {toggleEditProfile && (
        <div className="edit-container">
          <div className="edit-store-form">
            <button
              className="close"
              onClick={() => setToggleEditProfile(false)}
            >
              &times;
            </button>

            <div className="flex-row justify-space-btwn">
              <h3 className="category-name">Edit Store Profile</h3>
              <button onClick={handleSubmit} className="store-edit-done">
                Done
              </button>
            </div>

            <div className="edit-store__coverImg"></div>
            <div className="edit-store__images">
              <div className="edit-store__image"></div>
              <div className="edit-store__image"></div>
              <div className="edit-store__image"></div>
            </div>
            <div className="edit-store__store-name">
              <label>Store Name</label>
              <input
                type="text"
                name="storeName"
                id=""
                onChange={handleChange}
                value={input.storeName}
              />
            </div>
            <div className="login__input">
              <select value={input.town} onChange={handleChange} name="town">
                {/* <option>Select Your town</option> */}
                {["Nairobi", "Machakos", "Makueni", "Mombasa"].map((town) => (
                  <option value={town}>{town}</option>
                ))}
              </select>
            </div>
            <div className="edit-store__store-location">
              <textarea
                name="location"
                id=""
                cols="30"
                rows="3"
                onChange={handleChange}
                value={input.location}
              ></textarea>
            </div>
            <div className="phone-number">
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNo"
                id=""
                onChange={handleChange}
                value={input.phoneNo}
              />
            </div>
            <div className="twitter">
              <label htmlFor="">Twitter</label>
              <input
                type="url"
                name="twitterUrl"
                id=""
                onChange={handleChange}
                value={input.twitterUrl}
              />
            </div>
            <div className="FaceBook">
              <label htmlFor="">Facebook</label>
              <input
                type="url"
                name="facebookUrl"
                id=""
                onChange={handleChange}
                value={input.facebookUrl}
              />
            </div>
            <div className="Instagram">
              <label htmlFor="">Instagram</label>
              <input
                type="url"
                name="instagramUrl"
                id=""
                onChange={handleChange}
                value={input.instagramUrl}
              />
            </div>
            <div className="WhatApp">
              <label htmlFor="">WhatsApp Number</label>
              <input
                type="number"
                name="whatsappNo"
                id=""
                onChange={handleChange}
                value={input.whatsappNo}
              />
            </div>
          </div>
          <div
            className="overlay"
            onClick={() => setToggleEditProfile(false)}
          ></div>
        </div>
      )}
    </>
  );
}

export default EditStore;
