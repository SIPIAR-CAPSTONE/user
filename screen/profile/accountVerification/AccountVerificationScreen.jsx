import { ScrollView, View } from "react-native";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";
import { useEffect, lazy, useState } from "react";

import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import CircularIcon from "../../../components/ui/CircularIcon";
import useBoundStore from "../../../zustand/useBoundStore";
import AppBar from "../../../components/ui/AppBar";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import StepOneContent from "../../../components/profile/accountVerification/StepOneContent";
import Layout from "../../../components/common/Layout";
const StepTwoContent = lazy(() =>
  import("../../../components/profile/accountVerification/StepTwoContent")
);
const StepThreeContent = lazy(() =>
  import("../../../components/profile/accountVerification/StepThreeContent")
);
const StepFourContent = lazy(() =>
  import("../../../components/profile/accountVerification/StepFourContent")
);

const AccountVerificationScreen = ({ navigation }) => {
  const { styles, theme } = useStyles(stylesheet);
  const [currentStep, setCurrentStep] = useState(0);
  const resetVerification = useBoundStore((state) => state.resetVerification);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  //!temporary solution for populating verification form with userData
  const initializeVerificationForm = useBoundStore(
    (state) => state.initializeVerificationForm
  );
  const userData = useBoundStore((state) => state.userMetaData);
  useEffect(() => {
    if (userData) {
      initializeVerificationForm();
    }
  }, [userData]);

  const goNextStep = () =>
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);

  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
    } else {
      showConfirmationDialog();
    }
  };

  /**
   * The content of each step of the verification process
   * Only one step will be displayed at a time based on the currentStep
   */
  const steps = [
    {
      id: 1,
      content: (
        <Content>
          <StepOneContent goNextStep={goNextStep} />
        </Content>
      ),
    },
    {
      id: 2,
      content: (
        <Content>
          <StepTwoContent goNextStep={goNextStep} />
        </Content>
      ),
    },
    {
      id: 3,
      content: (
        <Content>
          <StepThreeContent goNextStep={goNextStep} />
        </Content>
      ),
    },
    {
      id: 4,
      content: (
        <Content>
          <StepFourContent />
        </Content>
      ),
    },
  ];

  // Step progress color customization
  const customColors = {
    /**
     * it is the circle with step number inside
     * its located at the top side
     */
    marker: {
      text: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      /**
       * it is the line that connect the circles or the marker
       */
      line: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.primary,
      },
    },
  };

  /**
   * This effect is triggered whenever the account verification screen is focused.
   * It resets the verification form by calling the `resetVerification` function.
   * This ensures that all fields or previous values of the global state of the verification form
   * are cleared when the user navigates back to the account verification screen.
   *
   */
  useEffect(() => {
    const resetVerificationOnFocus = () => {
      resetVerification();
    };

    const unsubscribe = navigation.addListener(
      "focus",
      resetVerificationOnFocus
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetAlert>
      <AppBar>
        <CircularIcon name="arrow-back" onPress={goBackStep} />
      </AppBar>

      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={styles.content}>
          <ProgressSteps
            currentStep={currentStep}
            orientation="horizontal"
            steps={steps}
            colors={customColors}
          />
        </View>

        <ConfirmationDialog
          title="Are you sure you want to exit?"
          isVisible={isConfirmationDialogVisible}
          onPressConfirmation={() => navigation.goBack()}
          onPressCancel={hideConfirmationDialog}
        />
      </ScrollView>
    </Layout>
  );
};

export default AccountVerificationScreen;

const stylesheet = createStyleSheet((theme) => ({
  appBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  content: {
    marginTop: 10,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
}));
