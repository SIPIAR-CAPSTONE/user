import { View, ScrollView } from "react-native";
import { useState, lazy } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple, Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import Button from "../../../components/ui/Button";
import cdoBarangayData from "../../../utils/cdoBarangayData";
import EditUserProfileCard from "../../../components/profile/EditUserProfileCard";
import SectionHeader from "../../../components/profile/SectionHeader";
import { supabase } from "../../../utils/supabase/config";
import useBoundStore from "../../../zustand/useBoundStore";
import useUserMetadata from "../../../hooks/useUserMetadata";
import { decode } from "base64-arraybuffer";
import TextInput from "../../../components/ui/TextInput";
import BirthdayPicker from "../../../components/ui/BirthdayPicker";
import SelectItem from "../../../components/ui/SelectItem";
import AppBar from "../../../components/ui/AppBar";
import useImageReader from "../../../hooks/useImageReader";
import CircularIcon from "../../../components/ui/CircularIcon";
import { StyleSheet } from "react-native";
import Layout from "../../../components/common/Layout";
import { isFormValid } from "../../../utils/formValidation";
import moment from "moment";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);

const fields = [
  { name: "firstName", rules: [{ type: "required" }] },
  { name: "lastName", rules: [{ type: "required" }] },
  { name: "birthday", rules: [{ type: "required" }] },
];

const EditProfileScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const [profilePicture, setProfilePicture] = useState(null);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const navigation = useNavigation();
  const { setState } = useUserMetadata();

  //* settter for global state profile path variable
  const setglobalStateProfilePath = useBoundStore(
    (state) => state.setProfilePicturePath
  );

  //* access base 64 formatted image
  const base64ImageFormat = useBoundStore((state) => state.base64ImageFormat);

  //* retrieve dafault profile picture
  useImageReader(setProfilePicture);

  const formattedDate = moment(userMetaData["birthday"]).format("YYYY-MM-DD");

  //* default value to input fields
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
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleFieldChange = (key, newValue) => {
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

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
      console.error("error update profile", error.message);
    } else if (!error) {
      setglobalStateProfilePath(profilePicture);
    }

    if (isFormValid(fields, userInfo, setErrors)) {
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
        console.error("error update", error.message);
      } else if (!error) {
        //* update session global state variables
        setState(data);
        //* navigate to my account page if success
        navigation.navigate("MyAccount");
      }
    }
  };

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetAlert>
      <AppBar>
        <CircularIcon
          name="arrow-back"
          pressable
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.appBarTitle}>Edit Profile</Text>
        <TouchableRipple
          borderless
          style={styles.changePassButton}
          onPress={() => navigation.navigate("EditPassword")}
        >
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={24}
            color={theme.colors.text}
          />
        </TouchableRipple>
      </AppBar>

      <ScrollView>
        <EditUserProfileCard
          name="John"
          imageSource={""}
          image={profilePicture}
          setImage={setProfilePicture}
        />

        <SectionHeader title="Personal Information" />
        <View style={styles.formFields}>
          <TextInput
            variant="outlined"
            label="First Name"
            value={userInfo.firstName}
            onChangeText={(item) => handleFieldChange("firstName", item)}
            error={errors.firstName}
          />
          <TextInput
            variant="outlined"
            label="Middle Name"
            value={userInfo.middleName}
            onChangeText={(item) => handleFieldChange("middleName", item)}
          />
          <TextInput
            variant="outlined"
            label="Last Name"
            value={userInfo.lastName}
            onChangeText={(item) => handleFieldChange("lastName", item)}
            error={errors.lastName}
          />
          <TextInput
            variant="outlined"
            label="Suffix"
            value={userInfo.suffix}
            onChangeText={(item) => handleFieldChange("suffix", item)}
          />
          <BirthdayPicker
            variant="outlined"
            label="Birthday"
            givenDate={userInfo.birthday}
            setDate={handleFieldChange}
            error={errors.birthday}
          />
          <TextInput
            variant="outlined"
            label="Phone"
            value={userInfo.phone}
            onChangeText={(item) => handleFieldChange("phone", item)}
          />
        </View>

        <SectionHeader title="Address" />
        <View style={styles.formFields}>
          <SelectItem
            variant="outlined"
            label="Barangay"
            value={userInfo.barangay}
            data={cdoBarangayData}
            onChange={(value) => handleFieldChange("barangay", value)}
            error={errors.barangay}
          />
          <TextInput
            variant="outlined"
            label="Street"
            value={userInfo.street}
            onChangeText={(item) => handleFieldChange("street", item)}
          />
          <TextInput
            variant="outlined"
            label="House Number"
            value={userInfo.houseNumber}
            onChangeText={(item) => handleFieldChange("houseNumber", item)}
          />

          <Button
            label="Save Changes"
            onPress={showConfirmationDialog}
            marginVertical={30}
          />

          {/* When save changes submit, show confirmation */}
          <ConfirmationDialog
            title="Are you sure you want to save changes?"
            isVisible={isConfirmationDialogVisible}
            onPressConfirmation={handleSubmit}
            onPressCancel={hideConfirmationDialog}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default EditProfileScreen;

const stylesheet = createStyleSheet((theme) =>
  StyleSheet.create({
    appBarTitle: {
      fontSize: 23,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    changePassButton: {
      backgroundColor: theme.colors.background,
      padding: 6,
      borderRadius: 99,
      width: 37,
    },
    formFields: {
      paddingHorizontal: theme.spacing.base,
      paddingBottom: theme.spacing.md,
      rowGap: theme.spacing.base,
    },
  })
);
