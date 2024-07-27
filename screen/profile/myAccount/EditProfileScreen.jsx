import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState, lazy, useRef, useMemo } from "react";
import StatusBar from "../../../components/common/StatusBar";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import EditUserProfileCard from "../../../components/profile/EditUserProfileCard";
import SectionHeader from "../../../components/profile/SectionHeader";
import {
  BirthdayFormField,
  SelectFormField,
  TextFormField,
} from "../../../components/profile/EditProfileFormField";
import { supabase } from "../../../utils/supabase/config";
import useBoundStore from "../../../zustand/useBoundStore";
import { useNavigation } from "@react-navigation/native";
import useUserMetadata from "../../../hooks/useUserMetadata";
import { decode } from "base64-arraybuffer";
import useImageReader from "../../../hooks/useImageReader";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);

const EditProfileScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [profilePicture, setProfilePicture] = useState(null);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const navigation = useNavigation();
  const { setState } = useUserMetadata();

  //! settter for global state profile path variable
  const setglobalStateProfilePath = useBoundStore(
    (state) => state.setProfilePicturePath
  );

  //!access base 64 formatted image
  const base64ImageFormat = useBoundStore((state) => state.base64ImageFormat);

  //! retrieve dafault profile picture
  useImageReader(setProfilePicture);

  //! format date to yy-mm-dd (remove trails ex. T:14:00:08)
  const date = new Date(userMetaData["birthday"]);
  const formattedDate = date.toISOString().split("T")[0];

  //! default value to input fields
  const [userInfo, setUserInfo] = useState({
    firstName: userMetaData["firstName"],
    middleName: userMetaData["middleName"],
    lastName: userMetaData["lastName"],
    suffix: userMetaData["suffix"],
    birthday: formattedDate,
    phone: userMetaData["phone"],
    barangay: userMetaData["barangay"],
    street: userMetaData["street"],
    houseNumber: userMetaData["houseNumber"],
  });
  const [errors, setErrors] = useState({});
  const sumbitConfirmationDialogRef = useRef(null);

  const handleFieldChange = (key, newValue) => {
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    const errors = {};

    if (!userInfo.firstName) errors.firstName = "First Name is required.";
    if (!userInfo.lastName) errors.lastName = "Last Name is required.";
    if (!userInfo.birthday) errors.birthday = "Birthday is required.";

    // Set the errors and update form validity if it is empty
    setErrors(errors);

    // return true if there is no error
    // false if error length is greater than zero
    return Object.keys(errors).length === 0;
  };

  /*
   *
   *  Handle submission to proceed next step
   *
   */
  const handleSubmit = async () => {
    //! update profile picture, if exist, replace
    const { error } = await supabase.storage
      .from("bystander")
      .upload(
        `profile_picture/${userMetaData["email"]}`,
        decode(base64ImageFormat),
        {
          contentType: "image/*",
          upsert: true,
        }
      );

    if (error) {
      //todo: more appropriate error handling for all
      console.log("error update profile", error.message);
    } else if (!error) {
      setglobalStateProfilePath(profilePicture);
    }

    //validateForm will return true if there is no error
    const isFormValid = validateForm();
    if (isFormValid) {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          first_name: userInfo["firstName"],
          middle_name: userInfo["middleName"],
          last_name: userInfo["lastName"],
          suffix: userInfo["suffix"],
          birth_date: userInfo["birthday"],
          phone_number: userInfo["phone"],
          barangay: userInfo["barangay"],
          street: userInfo["street"],
          house_number: userInfo["houseNumber"],
        },
      });
      if (error) {
        //todo: more appropriate error handling for all
        console.log("error update", error.message);
      } else if (!error) {
        //! update session global state variables
        setState(data);
        //! navigate to my account page if success
        navigation.navigate("MyAccount");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EditUserProfileCard
        name="John"
        imageSource={""}
        image={profilePicture}
        setImage={setProfilePicture}
      />

      <SectionHeader title="Personal Information" />
      <View style={styles.formFields}>
        <TextFormField
          label="First Name"
          value={userInfo.firstName}
          onChangeText={(item) => handleFieldChange("firstName", item)}
          error={errors.firstName}
        />
        <TextFormField
          label="Middle Name"
          value={userInfo.middleName}
          onChangeText={(item) => handleFieldChange("middleName", item)}
        />
        <TextFormField
          label="Last Name"
          value={userInfo.lastName}
          onChangeText={(item) => handleFieldChange("lastName", item)}
          error={errors.lastName}
        />
        <TextFormField
          label="Suffix"
          value={userInfo.suffix}
          onChangeText={(item) => handleFieldChange("suffix", item)}
        />
        <BirthdayFormField
          label="Birthday"
          givenDate={userInfo.birthday}
          setDate={handleFieldChange}
          error={errors.birthday}
        />
        <TextFormField
          label="Phone"
          value={userInfo.phone}
          onChangeText={(item) => handleFieldChange("phone", item)}
        />
      </View>

      <SectionHeader title="Address" />
      <View style={styles.formFields}>
        <SelectFormField
          label="Barangay"
          value={userInfo.barangay}
          items={cdoBarangayData}
          onChange={(item) => handleFieldChange("barangay", item.value)}
          error={errors.barangay}
        />
        <TextFormField
          label="Street"
          value={userInfo.street}
          onChangeText={(item) => handleFieldChange("street", item)}
        />
        <TextFormField
          label="House Number"
          value={userInfo.houseNumber}
          onChangeText={(item) => handleFieldChange("houseNumber", item)}
        />

        <PrimaryButton
          label="Save Changes"
          onPress={() => sumbitConfirmationDialogRef.current.showDialog()}
          style={styles.saveButton}
        />
        {/* When save changes submit, show confirmation */}
        <ConfirmationDialog
          ref={sumbitConfirmationDialogRef}
          title="Are you sure you want to save changes?"
          buttons={[
            {
              label: "Save Changes",
              onPress: handleSubmit,
              mode: "contained",
            },
            {
              label: "Cancel",
              onPress: () => sumbitConfirmationDialogRef.current.hideDialog(),
              mode: "text",
            },
          ]}
        />
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default EditProfileScreen;

const makeStyles = ({ padding, borderRadius }) =>
  StyleSheet.create({
    container: {
      paddingVertical: padding.body.vertical,
    },
    formFields: {
      paddingHorizontal: padding.body.horizontal,
      paddingBottom: padding.body.vertical,
    },
    saveButton: {
      borderRadius: borderRadius.base,
      marginTop: 44,
    },
  });
