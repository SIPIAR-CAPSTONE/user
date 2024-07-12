import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";
import { useEffect, lazy, useState } from "react";

import useBoundStore from "../../../zustand/useBoundStore";
import StatusBar from "../../../components/common/StatusBar";
import StepOneContent from "../../../components/profile/accountVerification/StepOneContent";
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
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const resetVerification = useBoundStore((state) => state.resetVerification);

  const goNextStep = () =>
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);

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
        normal: theme.colors.typography.tertiary,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      /**
       * it is the line that connect the circles or the marker
       */
      line: {
        normal: theme.colors.typography.tertiary,
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
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: theme.padding.body.vertical,
        paddingHorizontal: theme.padding.body.horizontal,
      }}
    >
      <ProgressSteps
        currentStep={currentStep}
        orientation="horizontal"
        steps={steps}
        colors={customColors}
      />

      <StatusBar />
    </ScrollView>
  );
};

export default AccountVerificationScreen;
