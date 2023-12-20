import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

function CategoryDropdown({ setCategory }) {
  return (
    <View>
      <Text className="text-">Category</Text>
      <SelectList
        search={false}
        defaultOption={{ key: "food", value: "Food" }}
        setSelected={(value) => {
          setCategory(value);
        }}
        data={[
          {
            key: "food",
            value: "Food",
          },
          {
            key: "salary",
            value: "Salary",
          },
          {
            key: "travel",
            value: "Travel",
          },
          {
            key: "other",
            value: "Other",
          },
        ]}
        boxStyles={{ backgroundColor: "white" }}
      />
    </View>
  );
}

export default CategoryDropdown;
