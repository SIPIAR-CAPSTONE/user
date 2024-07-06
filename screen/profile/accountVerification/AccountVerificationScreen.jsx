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

  /*
   * Screen content of each steps
   * only one screen or content will be displayed at a time based on the currentStep
   *
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
    /*
     * it is the circle with step number inside
     * its located at the top side
     */
    marker: {
      text: {
        normal: theme.colors.typography.tertiary,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      /*
       * it is the line that connect the circles or the marker
       */
      line: {
        normal: theme.colors.typography.tertiary,
        active: theme.colors.primary,
        completed: theme.colors.primary,
      },
    },
  };

  /*
   * All feilds or all  previous values of the global state of verification form will
   * be reset when first enter to the account verification screen
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetVerification();
    });
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
