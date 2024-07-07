import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";
import { useEffect, lazy, useState } from "react";

import StatusBar from "../../components/common/StatusBar";
import useBoundStore from "../../zustand/useBoundStore";
import StepOneContent from "../../components/auth/signup/StepOneContent";
const StepTwoContent = lazy(() =>
  import("../../components/auth/signup/StepTwoContent")
);
const StepThreeContent = lazy(() =>
  import("../../components/auth/signup/StepThreeContent")
);

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();

  const [currentStep, setCurrentStep] = useState(0);
  const resetSignup = useBoundStore((state) => state.resetSignup);

  const goNextStep = () =>
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);

  /**
   * The content of each step of the signup process
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
          <StepThreeContent />
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

  return (
    <ScrollView
      style={{
        flex: 1,
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

export default SignupScreen;
