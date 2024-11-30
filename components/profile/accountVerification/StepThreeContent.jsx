import { Divider } from "react-native-paper";

import FormHeader from "../../common/FormHeader";
import ListItem from "../../ui/ListItem";
import NextActionIcon from "../../common/NextActionIcon";
import { Fragment, useState, lazy } from "react";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import useBoundStore from "../../../zustand/useBoundStore";
const SelectIdModal = lazy(() => import("./SelectIdModal"));
import SecondaryHeader from "./SecondaryHeader";
import Form from "../../common/Form";
import { ID_ITEMS_DATA } from "./IDData";

const StepThreeContent = ({ goNextStep }) => {
  const { styles, theme } = useStyles(stylesheet);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const setVerificationForm = useBoundStore(
    (state) => state.setVerificationForm
  );

  const IdItems = ID_ITEMS_DATA.map((item) => (
    <Fragment key={item.id}>
      <ListItem
        size="small"
        title={item.title}
        roundness={0}
        contentContainerStyle={styles.listItem}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => {
          setSelectedId(item);
          setModalVisible(true);
        }}
      />
      <Divider />
    </Fragment>
  ));

  return (
    <Form contentContainerStyle={styles.form}>
      <FormHeader
        title="Tell us about yourself"
        desc="Please complete the information below"
      />
      <Divider style={[styles.divider, { marginTop: 30 }]} />
      <SecondaryHeader
        title="Accepted IDs"
        desc=" Get verified faster, all on the app."
      />
      <Divider
        style={[
          styles.divider,
          { height: 5, backgroundColor: theme.colors.elevation.level1 },
        ]}
      />
      {IdItems}

      {modalVisible && (
        <SelectIdModal
          onClose={() => setModalVisible(false)}
          onConfirmed={() => {
            setModalVisible(false);
            goNextStep();
            setVerificationForm("selectedIdType", selectedId["type"]);
          }}
          idTitle={selectedId.title}
          idImageSource={selectedId.imageSource}
        />
      )}
    </Form>
  );
};

export default StepThreeContent;

const stylesheet = createStyleSheet((theme) => ({
  form: {
    rowGap: 0,
  },
  listItem: {
    backgroundColor: theme.colors.background,
    paddingEnd: 1,
  },
  divider: {
    marginVertical: 8,
  },
}));
