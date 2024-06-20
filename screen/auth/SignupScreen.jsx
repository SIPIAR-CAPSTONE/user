import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";

import StepOneContent from "../../components/auth/login/StepOneContent";
import StepTwoContent from "../../components/auth/login/StepTwoContent";
import StepThreeContent from "../../components/auth/login/StepThreeContent";

const SignupScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const theme = useTheme();

  const goNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const backPrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Screen content of each steps
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
          <StepTwoContent goNextStep={goNextStep} backPrevStep={backPrevStep} />
        </Content>
      ),
    },
    {
      id: 3,
      content: (
        <Content>
          <StepThreeContent backPrevStep={backPrevStep} />
        </Content>
      ),
    },
  ];

  // Step progress color customization
  const customColors = {
    marker: {
      text: {
        normal: theme.colors.typography.tertiary,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      line: {
        normal: theme.colors.typography.tertiary,
        active: theme.colors.primary,
        completed: theme.colors.primary,
      },
    },
  };

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
    </ScrollView>
  );
};

export default SignupScreen;
