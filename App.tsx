import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import TransactionModal from "./components/transaction-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";

type Transaction = {
  type: "income" | "expense";
  amount: number;
  category: string;
  date: Date;
  description: string;
};

export default function App() {
  const [transactions, setTransactions] = useState([] as Transaction[]);

  useEffect(() => {
    // fetch transactions
    const fetchTransactions = async () => {
      const transactions = await AsyncStorage.getItem("transactions");
      if (transactions) {
        setTransactions(JSON.parse(transactions));
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    // save transactions
    const saveTransactions = async () => {
      await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
    };
    saveTransactions();
  }, [transactions]);

  //calculate pie chart data
  let pieChartData = [] as { category: string; amount: number }[];

  transactions.forEach((transaction) => {
    let index = pieChartData.findIndex(
      (item) => item.category === transaction.category
    );
    // if category exists, add to amount
    if (index !== -1) {
      if (transaction.type === "income") {
        pieChartData[index].amount += transaction.amount;
      } else {
        pieChartData[index].amount -= transaction.amount;
      }
    } else {
      // if category does not exist, add it
      let amount =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;
      pieChartData.push({ category: transaction.category, amount: amount });
    }
  });

  return (
    <SafeAreaView className="p-4 flex-1 space-y-4 bg-slate-200 items-center justify-">
      <Text className="text-3xl self-start font-bold">Expense Tracker</Text>
      <View className="p-2">
        {transactions.length === 0 ? (
          <View className="h-[300] flex items-center justify-center">
            <View className="bg-white p-4 rounded-lg">
              <Text className="text-2xl font-bold">Add a Transaction</Text>
              <Text className="text-lg">Click the + button below</Text>
            </View>
          </View>
        ) : (
          <VictoryPie
            colorScale={"cool"}
            height={300}
            data={pieChartData}
            x="category"
            y="amount"
            labels={({ datum }) => `${datum.category}\n$${datum.amount}`}
          />
        )}
      </View>
      <TransactionModal
        setTransactions={setTransactions}
        transactions={transactions}
      />
      <View className="flex-1 w-full ">
        <Text className="text-2xl font-bold">Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={({ item }) => {
            return (
              <View className="border-2 flex bg-white rounded-lg mb-2 p-3 flex-row bg--700 border-neutral-400  w-full">
                <View className="flex-1 pl-">
                  <Text>{item.category}</Text>
                  <Text className="text-lg">{item.description}</Text>
                  <Text>{new Date(item.date).toDateString()}</Text>
                </View>
                <View className="p-3 flex items-center justify-center">
                  <Text className="text-2xl">
                    {item.type === "expense" ? "-" : "+"}
                    {`$${item.amount}`}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
