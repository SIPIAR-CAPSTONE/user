import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import ProgressSteps, { Content } from "@joaosousa/react-native-progress-steps";
import { useEffect, lazy } from "react";

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
  const verificationCurrentStep = useBoundStore(
    (state) => state.verificationCurrentStep
  );

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
          <StepOneContent />
        </Content>
      ),
    },
    {
      id: 2,
      content: (
        <Content>
          <StepTwoContent />
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("reset");
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
        currentStep={verificationCurrentStep}
        orientation="horizontal"
        steps={steps}
        colors={customColors}
      />

      <StatusBar />
    </ScrollView>
  );
};

export default AccountVerificationScreen;
