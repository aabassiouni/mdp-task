import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";
import CategoryDropdown from "./category-dropdown";
import DatePicker from "./date-picker";
import DescriptionInput from "./description-input";
import AmountInput from "./amount-input";
import TypeSelect from "./type-select";

export default function TransactionModal({
  setTransactions,
  transactions,
}: {
  setTransactions: any;
  transactions: any;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Modal visible={modalVisible}>
        <View className="p-8 bg-slate-200 flex-1 ">
          <Text className=" text-3xl text- font-bold">Add Transaction</Text>
          <View className="py-4 space-y-2">
            <TypeSelect type={type} setType={setType} />
            <AmountInput setAmount={setAmount} />
            <CategoryDropdown setCategory={setCategory} />
            <DescriptionInput setDescription={setDescription} />
            <DatePicker date={date} setDate={setDate} />
          </View>
          <View>
            <Pressable
              disabled={description === "" || amount === 0}
              onPress={() => {
                setTransactions([
                  ...transactions,
                  { type, amount, category, date, description },
                ]);
                setModalVisible(!modalVisible);
              }}
              className={
                "bg-green-800 w-full inline-flex items-center p-4 rounded-lg" +
                (description === "" || amount === 0 ? " bg-green-800/50" : "")
              }
            >
              <Text className="text-white text-xl">Add Transaction</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            className="absolute top-8 right-8 bg-red-800 inline-flex items-center p-2 rounded-lg"
          >
            <Text className="text-white">Close</Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        className="bg-red-800 w-full inline-flex items-center p-4 rounded-lg"
      >
        <Text className="text-white text-xl">Add Transaction</Text>
      </Pressable>
    </>
  );
}
