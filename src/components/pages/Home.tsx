import { Stack } from "@mui/material";

import { COLOR } from "../../utils/themes/colors";
import MemberSelector from "../molecules/CreateTrip/MemberSelector";
import { useForm, FormProvider } from "react-hook-form";
import ProfileAndTitleSection from "../molecules/CreateTrip/ProfileAndTitleSection";
import FooterButtons from "../molecules/CreateTrip/FooterButtons";

export interface ICreateTripForm {
  title: string;
  members: string[];
}

const Home = () => {
  const formMethods = useForm<ICreateTripForm>({
    defaultValues: {
      title: "",
      members: [],
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Stack sx={styles.containerStyles}>
        <ProfileAndTitleSection />
        <MemberSelector />
        <FooterButtons />
      </Stack>
    </FormProvider>
  );
};

const styles = {
  containerStyles: {
    flex: 1,
    bgcolor: COLOR.WHITE_COLOR,
    marginTop: "2rem",
    padding: "1rem",
  },
};

export default Home;
