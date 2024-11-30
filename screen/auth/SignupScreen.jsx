import { View } from "react-native";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";
import { useEffect, lazy, useState } from "react";

import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import useBoundStore from "../../zustand/useBoundStore";
import StepOneContent from "../../components/auth/signup/StepOneContent";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";
import AppBarTitle from "../../components/ui/AppBarTitle";
import useConfirmBack from "../../hooks/useConfirmBack";
const StepTwoContent = lazy(() =>
  import("../../components/auth/signup/StepTwoContent")
);
const StepThreeContent = lazy(() =>
  import("../../components/auth/signup/StepThreeContent")
);

const SignupScreen = ({ navigation }) => {
  const { visibleAlert, showAlert, hideAlert, confirmBack } = useConfirmBack();
  const { styles, theme } = useStyles(stylesheet);

  const [currentStep, setCurrentStep] = useState(0);
  const resetSignup = useBoundStore((state) => state.resetSignup);

  const goNextStep = () =>
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);

  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
    } else {
      showAlert();
    }
  };

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
          <StepThreeContent />
        </Content>
      ),
    },
  ];

  // Step progress color customization
  const customColors = {
    marker: {
      text: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      line: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.primary,
      },
    },
  };

  /**
   * This effect is triggered whenever the signup screen is focused.
   * It resets the signup form by calling the `resetSignup` function.
   * This ensures that all fields or previous values of the global state of the signup form
   * are cleared when the user navigates back to the asignup screen.
   *
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetSignup();
    });
    return unsubscribe;
  }, [navigation]);

  const CustomAppBar = () => (
    <AppBar style={styles.appBar}>
      <CircularIcon name="arrow-back" onPress={goBackStep} />

      <AppBarTitle size="sm">Signup</AppBarTitle>

      {/* invisible element, just to make the title center */}
      <View style={{ width: 30 }} />
    </AppBar>
  );

  return (
    <Layout
      removeDefaultPaddingHorizontal
      addNoInternetBar
      AppbarComponent={CustomAppBar}
      scrollable
    >
      <ProgressSteps
        currentStep={currentStep}
        orientation="horizontal"
        steps={steps}
        colors={customColors}
      />

      <ConfirmationDialog
        title="Are you sure you want to exit?"
        isVisible={visibleAlert}
        onPressConfirmation={confirmBack}
        onPressCancel={hideAlert}
      />
    </Layout>
  );
};

export default SignupScreen;

const stylesheet = createStyleSheet(() => ({
  appBar: {
    height: 110,
  },
}));
