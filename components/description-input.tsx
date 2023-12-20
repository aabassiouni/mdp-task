import { TextInput, Text, View } from "react-native";

function DescriptionInput({ setDescription }) {
  return (
    <View>
      <Text className="text-">Description</Text>
      <TextInput
        onChangeText={(text) => {
          setDescription(text);
        }}
        className="rounded-lg p-2 bg-white"
      />
    </View>
  );
}

export default DescriptionInput;
