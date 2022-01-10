import React, { useState } from "react";
import { Box, Text, FormControl, Radio, Button } from "native-base";
import ScreenWrapper from "../components/ScreenWrapper";

interface SProps {
  state: string;
}

const SingleplayerOptionsScreen = ({ navigation: { navigate } }: any) => {
  const onSubmit = () => {
    navigate("Singleplayer", { state: "some" });
  };

  return (
    <ScreenWrapper>
      <Text>Singleplayer Options Screen</Text>
      <FormControl>
        {/* <Radio.Group
          name="myRadioGroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <Radio value="one" my="1">
            One
          </Radio>
          <Radio value="two" my="1">
            Two
          </Radio>
        </Radio.Group> */}
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          submit
        </Button>
      </FormControl>
      option com default option com default button start game
    </ScreenWrapper>
  );
};

export default SingleplayerOptionsScreen;
