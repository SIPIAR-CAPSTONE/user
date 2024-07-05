import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useState, lazy } from "react";

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
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);

const EditProfileScreen = () => {
  const theme = useTheme();
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    suffix: "",
    birthday: "2025-06-28T07:39:00.000Z",
    phone: "091234567890",
    barangay: "Indahag",
    street: "zone 4. block 16",
    houseNumber: "45",
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (key, newValue) => {
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

  // handling confirmation dialog
  const [dialogVisible, setDialogVisible] = useState(false);
  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  /*
   *
   * Form Validation
   *
   */
  const validateForm = () => {
    let errors = {};

    /* These fields are required and should never be empty */
    // Validate first name field if it is empty
    if (!userInfo.firstName) {
      errors.firstName = "First Name is required.";
    }

    // Validate last name field if it is empty
    if (!userInfo.lastName) {
      errors.lastName = "Last Name is required.";
    }

    // Validate birthday if it is empty
    if (!userInfo.birthday) {
      errors.birthday = "Birthday is required.";
    }

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
  const handleSubmit = () => {
    //validateForm will return true if there is no error
    const isFormValid = validateForm();

    if (isFormValid) {
      //TODO: diri
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: theme.padding.body.vertical }}
    >
      <EditUserProfileCard
        name="John"
        image={profilePicture}
        setImage={setProfilePicture}
      />

      <SectionHeader title="Personal Information" />
      <View
        style={{
          paddingHorizontal: theme.padding.body.horizontal,
          paddingBottom: theme.padding.body.vertical,
        }}
      >
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
          onChangeText={(item) => handleFieldChange("lastName", item)}
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
      <View
        style={{
          paddingHorizontal: theme.padding.body.horizontal,
          paddingBottom: theme.padding.body.vertical,
        }}
      >
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

        {/* When save changes submit, show confirmation */}
        <ConfirmationDialog
          title="Are you sure you want to save changes?"
          confirmButtonLabel="Save Changes"
          visible={dialogVisible}
          showDialog={showDialog}
          hideDialog={hideDialog}
          onConfirmed={handleSubmit}
          renderButton={() => (
            <PrimaryButton
              label="Save Changes"
              onPress={showDialog}
              style={{ borderRadius: theme.borderRadius.base, marginTop: 44 }}
            />
          )}
        />
      </View>

      <StatusBar />
    </ScrollView>
  );
};

export default EditProfileScreen;
