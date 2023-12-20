import { TextInput, Text, View } from "react-native";

function AmountInput({ setAmount }) {
  return (
    <View>
      <Text className="text-">Amount</Text>
      <TextInput
        onChangeText={(text) => {
          setAmount(Number.parseInt(text));
        }}
        keyboardType="number-pad"
        className="rounded-lg p-2 bg-white"
      />
    </View>
  );
}

export default AmountInput;
