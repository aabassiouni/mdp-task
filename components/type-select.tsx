import { Pressable, Text, View } from "react-native";

function TypeSelect({ type, setType }) {
  return (
    <View>
      <Text className="text-">Type</Text>
      <View className="flex w-full h-12 bg--900 flex-row ">
        <Pressable
          android_disableSound={true}
          onPress={() => {
            setType("income");
          }}
          className={
            "bg-slate-500 :bg-pink-400 inline-flex flex-1 items-center justify-center p-2 rounded-l-lg" +
            (type === "income" ? " bg-green-500" : "")
          }
        >
          <Text className="text-white">Income</Text>
        </Pressable>
        <Pressable
          android_disableSound={true}
          onPress={() => {
            setType("expense");
          }}
          className={
            " bg-slate-500 inline-flex flex-1 items-center justify-center p-2 rounded-r-lg" +
            (type === "expense" ? " bg-red-600/70" : "")
          }
        >
          <Text className="text-white">Expense</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default TypeSelect;
